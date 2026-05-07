import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

// ─── POST /api/leads ──────────────────────────────────────────────────────────
// Creates a lead record and uploads storefront/logo to Supabase Storage.
// Returns the full lead record so the client can use all fields downstream.

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name         = (formData.get("name")         as string | null)?.trim()
    const email        = (formData.get("email")        as string | null)?.trim()
    const phone        = (formData.get("phone")        as string | null)?.trim() || null
    const company      = (formData.get("company")      as string | null)?.trim() || null
    const source       = (formData.get("source")       as string | null)?.trim() || "direct"
    const flowType     = (formData.get("flow_type")    as string | null)?.trim() || "sign-ai"
    const signZone     = (formData.get("sign_zone")    as string | null)?.trim() || null
    const sfWidthFt    = formData.get("storefront_width_ft")
    const storefrontWidthFt = sfWidthFt ? parseFloat(sfWidthFt as string) : null

    const storefrontFile = formData.get("storefront") as File | null
    const logoFile       = formData.get("logo")       as File | null

    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { error: "Name and either email or phone are required" },
        { status: 400, headers: CORS_HEADERS },
      )
    }

    const supabase = getSupabase()

    let storefrontUrl: string | null = null
    let logoUrl: string | null = null
    let leadId: string | null = null

    if (supabase) {
      const { data, error } = await supabase
        .from("leads")
        .insert({
          name,
          email,
          phone,
          company,
          source,
          flow_type: flowType,
          sign_zone: signZone,
          storefront_width_ft: storefrontWidthFt,
        })
        .select("id")
        .single()

      if (error) {
        console.error("[leads] Supabase insert error:", error)
      } else {
        leadId = data.id
      }

      if (leadId && storefrontFile) {
        const buf = Buffer.from(await storefrontFile.arrayBuffer())
        const ext = storefrontFile.type.includes("png") ? "png" : "jpg"
        const { data: uploadData } = await supabase.storage
          .from("leads")
          .upload(`${leadId}/storefront.${ext}`, buf, {
            contentType: storefrontFile.type,
            upsert: true,
          })
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from("leads")
            .getPublicUrl(`${leadId}/storefront.${ext}`)
          storefrontUrl = publicUrl
          await supabase.from("leads").update({ storefront_url: storefrontUrl }).eq("id", leadId)
        }
      }

      if (leadId && logoFile) {
        const buf = Buffer.from(await logoFile.arrayBuffer())
        const ext = logoFile.type.includes("png") ? "png" : "jpg"
        const { data: uploadData } = await supabase.storage
          .from("leads")
          .upload(`${leadId}/logo.${ext}`, buf, {
            contentType: logoFile.type,
            upsert: true,
          })
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from("leads")
            .getPublicUrl(`${leadId}/logo.${ext}`)
          logoUrl = publicUrl
          await supabase.from("leads").update({ logo_url: logoUrl }).eq("id", leadId)
        }
      }
    }

    return NextResponse.json(
      {
        ok: true,
        id: leadId,
        name,
        email,
        phone,
        company,
        source,
        flow_type: flowType,
        sign_zone: signZone,
        storefront_width_ft: storefrontWidthFt,
        storefront_url: storefrontUrl,
        logo_url: logoUrl,
      },
      { status: 200, headers: CORS_HEADERS },
    )
  } catch (err) {
    console.error("[leads] POST error:", err)
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500, headers: CORS_HEADERS },
    )
  }
}

// ─── PATCH /api/leads ─────────────────────────────────────────────────────────
// Called after generation completes.
// Attaches generated image, sign size data, and sends email notification.
// Returns the full updated lead record.

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json() as {
      id: string
      name: string
      email: string
      phone?: string
      company?: string
      source?: string
      flow_type?: string
      generatedImageUrl?: string
      sign_width_in?: number
      sign_height_in?: number
      sign_area_sizes?: object[]
      size_method?: string
      door_detected?: boolean
      door_confidence?: number
    }

    const {
      id, name, email, phone, company,
      source, flow_type,
      generatedImageUrl,
      sign_width_in, sign_height_in, sign_area_sizes, size_method,
      door_detected, door_confidence,
    } = body

    if (!id) {
      return NextResponse.json(
        { error: "Lead ID required" },
        { status: 400, headers: CORS_HEADERS },
      )
    }

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
          .from("leads")
          .upload(`${id}/generated.jpg`, imageBuffer, {
            contentType: "image/jpeg",
            upsert: true,
          })
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from("leads")
            .getPublicUrl(`${id}/generated.jpg`)
          generatedStoredUrl = publicUrl
        }
      }

      await supabase
        .from("leads")
        .update({
          generated_url:    generatedStoredUrl ?? generatedImageUrl,
          sign_width_in:    sign_width_in    ?? null,
          sign_height_in:   sign_height_in   ?? null,
          sign_area_sizes:  sign_area_sizes  ?? null,
          size_method:      size_method      ?? null,
          door_detected:    door_detected    ?? null,
          door_confidence:  door_confidence  ?? null,
        })
        .eq("id", id)
    }

    // ── Email notification ────────────────────────────────────────────────────
    const notifyEmail = process.env.LEAD_NOTIFICATION_EMAIL
    if (resend && notifyEmail) {
      const subject = `New Sign AI Lead — ${company || name}`
      const submittedAt = new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })

      const sizeRow = sign_width_in && sign_height_in
        ? `<tr>
            <td style="padding:8px 0;color:#666;width:100px">Est. Size</td>
            <td style="padding:8px 0;font-weight:600">
              ${sign_width_in}&quot; × ${sign_height_in}&quot;
              <span style="color:#999;font-size:12px;font-weight:400">(${size_method ?? "estimate"})</span>
            </td>
          </tr>`
        : ""

      const html = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="margin-bottom:4px">New Kaykov Signage Lead</h2>
          <p style="color:#666;margin-top:0">${submittedAt} · ${flow_type ?? "sign-ai"}</p>
          <table style="border-collapse:collapse;width:100%;margin-top:16px">
            <tr><td style="padding:8px 0;color:#666;width:100px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0;font-weight:600">${email}</td></tr>
            ${phone   ? `<tr><td style="padding:8px 0;color:#666">Phone</td><td style="padding:8px 0;font-weight:600">${phone}</td></tr>` : ""}
            ${company ? `<tr><td style="padding:8px 0;color:#666">Company</td><td style="padding:8px 0;font-weight:600">${company}</td></tr>` : ""}
            ${source  ? `<tr><td style="padding:8px 0;color:#666">Source</td><td style="padding:8px 0;font-weight:600">${source}</td></tr>` : ""}
            ${sizeRow}
          </table>
          ${generatedStoredUrl ? `
          <div style="margin-top:24px">
            <p style="color:#666;margin-bottom:8px">Generated Sign Mockup</p>
            <img src="${generatedStoredUrl}" alt="Generated sign" style="width:100%;border-radius:8px" />
            <a href="${generatedStoredUrl}" style="display:inline-block;margin-top:8px;color:#000;font-size:13px">View full image →</a>
          </div>` : ""}
        </div>
      `

      await resend.emails.send({
        from: "Kaykov Signage <onboarding@resend.dev>",
        to: notifyEmail,
        subject,
        html,
      })
    }

    return NextResponse.json(
      {
        ok: true,
        id,
        name,
        email,
        phone,
        company,
        source,
        flow_type,
        generated_url: generatedStoredUrl,
        sign_width_in,
        sign_height_in,
        sign_area_sizes,
        size_method,
        door_detected,
        door_confidence,
      },
      { status: 200, headers: CORS_HEADERS },
    )
  } catch (err) {
    console.error("[leads] PATCH error:", err)
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500, headers: CORS_HEADERS },
    )
  }
}
