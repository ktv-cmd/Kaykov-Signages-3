import { NextRequest, NextResponse } from "next/server"

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  // Dynamic import to avoid bundling if not configured
  const { createClient } = require("@supabase/supabase-js")
  return createClient(url, key)
}

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  const { Resend } = require("resend")
  return new Resend(key)
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

// ─── POST /api/leads ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const name    = (formData.get("name")    as string | null)?.trim()
    const email   = (formData.get("email")   as string | null)?.trim()
    const phone   = (formData.get("phone")   as string | null)?.trim() || null
    const company = (formData.get("company") as string | null)?.trim() || null
    const storefrontFile = formData.get("storefront") as File | null
    const logoFile       = formData.get("logo")       as File | null

    if (!name || !email)
      return NextResponse.json({ error: "Name and email are required" }, { status: 400, headers: CORS_HEADERS })

    const supabase = getSupabase()
    let leadId: string | null = null

    if (supabase) {
      const { data, error } = await supabase
        .from("leads")
        .insert({ name, email, phone, company })
        .select("id")
        .single()

      if (error) console.error("[leads] Supabase insert error:", error)
      else leadId = data.id

      if (leadId && storefrontFile) {
        const buf = Buffer.from(await storefrontFile.arrayBuffer())
        const ext = storefrontFile.type.includes("png") ? "png" : "jpg"
        const { data: uploadData } = await supabase.storage
          .from("leads").upload(`${leadId}/storefront.${ext}`, buf, { contentType: storefrontFile.type, upsert: true })
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage.from("leads").getPublicUrl(`${leadId}/storefront.${ext}`)
          await supabase.from("leads").update({ storefront_url: publicUrl }).eq("id", leadId)
        }
      }

      if (leadId && logoFile) {
        const buf = Buffer.from(await logoFile.arrayBuffer())
        const ext = logoFile.type.includes("png") ? "png" : "jpg"
        const { data: uploadData } = await supabase.storage
          .from("leads").upload(`${leadId}/logo.${ext}`, buf, { contentType: logoFile.type, upsert: true })
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage.from("leads").getPublicUrl(`${leadId}/logo.${ext}`)
          await supabase.from("leads").update({ logo_url: publicUrl }).eq("id", leadId)
        }
      }
    }

    return NextResponse.json({ ok: true, id: leadId }, { headers: CORS_HEADERS })
  } catch (err) {
    console.error("[leads] POST error:", err)
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500, headers: CORS_HEADERS })
  }
}

// ─── PATCH /api/leads ─────────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json() as {
      id: string
      generatedImageUrl?: string
      sign_width_in?: number | null
      sign_height_in?: number | null
      size_method?: string | null
      door_detected?: boolean | null
      door_confidence?: number | null
      source?: string
      flow_type?: string
    }

    const { id, generatedImageUrl } = body
    if (!id)
      return NextResponse.json({ error: "Lead ID required" }, { status: 400, headers: CORS_HEADERS })

    const supabase = getSupabase()
    const resend   = getResend()
    let generatedStoredUrl: string | null = null

    if (supabase && generatedImageUrl) {
      let imageBuffer: Buffer | null = null
      if (generatedImageUrl.startsWith("data:")) {
        const base64 = generatedImageUrl.split(",")[1]
        if (base64) imageBuffer = Buffer.from(base64, "base64")
      } else {
        const res = await fetch(generatedImageUrl)
        if (res.ok) imageBuffer = Buffer.from(await res.arrayBuffer())
      }

      if (imageBuffer) {
        const { data: uploadData } = await supabase.storage
          .from("leads").upload(`${id}/generated.jpg`, imageBuffer, { contentType: "image/jpeg", upsert: true })
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage.from("leads").getPublicUrl(`${id}/generated.jpg`)
          generatedStoredUrl = publicUrl
        }
      }

      await supabase.from("leads").update({
        generated_url: generatedStoredUrl ?? generatedImageUrl,
        sign_width_in: body.sign_width_in ?? null,
        sign_height_in: body.sign_height_in ?? null,
        size_method: body.size_method ?? null,
        door_detected: body.door_detected ?? null,
        door_confidence: body.door_confidence ?? null,
        source: body.source ?? "direct",
      }).eq("id", id)
    }

    const notifyEmail = process.env.LEAD_NOTIFICATION_EMAIL
    if (resend && notifyEmail && generatedStoredUrl) {
      await resend.emails.send({
        from: "Sign AI <onboarding@resend.dev>",
        to: notifyEmail,
        subject: `New Sign AI Lead`,
        html: `<p>New lead generated a sign mockup.</p>${generatedStoredUrl ? `<img src="${generatedStoredUrl}" style="width:100%" />` : ""}`,
      }).catch(console.error)
    }

    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS })
  } catch (err) {
    console.error("[leads] PATCH error:", err)
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500, headers: CORS_HEADERS })
  }
}
