import { NextRequest, NextResponse } from "next/server"

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
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

function fmt(val: string | null | undefined, fallback = "—") {
  return val?.trim() || fallback
}

function adminQuoteHtml(opts: {
  name: string
  email: string | null
  phone: string | null
  company: string | null
  businessLocation: string | null
  message: string | null
  storefrontUrl: string | null
  signAreaMarked: boolean
  source: string | null
  submittedAt: string
}) {
  const { name, email, phone, company, businessLocation, message, storefrontUrl, signAreaMarked, source, submittedAt } = opts
  return `
<div style="font-family:sans-serif;max-width:620px;margin:0 auto;color:#111">
  <h2 style="margin-bottom:4px">New Quote Request</h2>
  <p style="color:#666;margin-top:0;font-size:13px">${submittedAt}</p>

  <h3 style="margin-top:24px;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#888">Client Info</h3>
  <table style="border-collapse:collapse;width:100%">
    <tr><td style="padding:6px 0;color:#666;width:140px;font-size:14px">Name</td><td style="padding:6px 0;font-weight:600;font-size:14px">${fmt(name)}</td></tr>
    <tr><td style="padding:6px 0;color:#666;font-size:14px">Email</td><td style="padding:6px 0;font-weight:600;font-size:14px">${email ? `<a href="mailto:${email}" style="color:#111">${email}</a>` : "—"}</td></tr>
    <tr><td style="padding:6px 0;color:#666;font-size:14px">Phone</td><td style="padding:6px 0;font-weight:600;font-size:14px">${phone ? `<a href="tel:${phone}" style="color:#111">${phone}</a>` : "—"}</td></tr>
    <tr><td style="padding:6px 0;color:#666;font-size:14px">Business</td><td style="padding:6px 0;font-weight:600;font-size:14px">${fmt(company)}</td></tr>
    <tr><td style="padding:6px 0;color:#666;font-size:14px">Location</td><td style="padding:6px 0;font-weight:600;font-size:14px">${fmt(businessLocation)}</td></tr>
  </table>

  <h3 style="margin-top:24px;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#888">Details</h3>
  <p style="margin:0;font-size:14px;line-height:1.6;background:#f5f5f5;padding:12px 16px;border-radius:6px">${message ? message.replace(/\n/g, "<br>") : "No details provided"}</p>

  ${storefrontUrl ? `
  <h3 style="margin-top:24px;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#888">Storefront Photo</h3>
  <a href="${storefrontUrl}"><img src="${storefrontUrl}" alt="Storefront" style="width:100%;border-radius:8px;display:block" /></a>
  <p style="margin-top:6px;font-size:12px;color:#888">Sign area marked by client: <strong>${signAreaMarked ? "Yes" : "No"}</strong></p>
  ` : ""}

  <p style="margin-top:32px;font-size:12px;color:#bbb">Lead source: ${fmt(source, "direct")}</p>
</div>`
}

const KM_LOGO = "https://signscompanynewyork.com/favicon.png"

function signature() {
  return `
  <div style="margin-top:32px;padding-top:24px;border-top:1px solid #eee">
    <p style="margin:0;font-size:14px;font-weight:600">Boris</p>
    <p style="margin:4px 0 0;font-size:13px;color:#666">Kaykov Media</p>
    <p style="margin:2px 0 0;font-size:13px;color:#666"><a href="tel:+17184784200" style="color:#666">(718) 478-4200</a></p>
    <p style="margin:2px 0 0;font-size:13px;color:#666"><a href="https://signscompanynewyork.com" style="color:#666">signscompanynewyork.com</a></p>
  </div>`
}

function clientQuoteHtml(opts: {
  name: string
  company: string | null
  businessLocation: string | null
  message: string | null
}) {
  const { name, company, businessLocation, message } = opts
  return `
<div style="font-family:sans-serif;max-width:620px;margin:0 auto;color:#111">
  <p style="font-size:16px;margin-bottom:4px;margin-top:24px">Hi ${fmt(name)},</p>
  <p style="font-size:15px;color:#333;margin-top:0">Thank you for reaching out to Kaykov Media. We received your quote request and will contact you shortly.</p>

  <h3 style="margin-top:24px;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#888">Your Request</h3>
  <table style="border-collapse:collapse;width:100%">
    ${company ? `<tr><td style="padding:6px 0;color:#666;width:140px;font-size:14px">Business</td><td style="padding:6px 0;font-weight:600;font-size:14px">${fmt(company)}</td></tr>` : ""}
    ${businessLocation ? `<tr><td style="padding:6px 0;color:#666;font-size:14px">Location</td><td style="padding:6px 0;font-weight:600;font-size:14px">${fmt(businessLocation)}</td></tr>` : ""}
    ${message ? `<tr><td style="padding:6px 0;color:#666;font-size:14px;vertical-align:top">Details</td><td style="padding:6px 0;font-size:14px">${message.replace(/\n/g, "<br>")}</td></tr>` : ""}
  </table>

  <p style="margin-top:24px;font-size:14px;color:#333">Best regards,</p>
  ${signature()}
</div>`
}

function adminDesignHtml(opts: {
  name: string
  email: string | null
  phone: string | null
  company: string | null
  generatedUrl: string | null
  storefrontUrl: string | null
  logoUrl: string | null
  signWidthIn: number | null
  signHeightIn: number | null
  submittedAt: string
}) {
  const { name, email, phone, company, generatedUrl, storefrontUrl, logoUrl, signWidthIn, signHeightIn, submittedAt } = opts
  const hasSize = signWidthIn != null && signHeightIn != null

  return `
<div style="font-family:sans-serif;max-width:620px;margin:0 auto;color:#111">
  <h2 style="margin-bottom:4px">New Design Signage Lead</h2>
  <p style="color:#666;margin-top:0;font-size:13px">${submittedAt}</p>

  <h3 style="margin-top:24px;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#888">Client Info</h3>
  <table style="border-collapse:collapse;width:100%">
    <tr><td style="padding:6px 0;color:#666;width:140px;font-size:14px">Name</td><td style="padding:6px 0;font-weight:600;font-size:14px">${fmt(name)}</td></tr>
    <tr><td style="padding:6px 0;color:#666;font-size:14px">Email</td><td style="padding:6px 0;font-weight:600;font-size:14px">${email ? `<a href="mailto:${email}" style="color:#111">${email}</a>` : "—"}</td></tr>
    <tr><td style="padding:6px 0;color:#666;font-size:14px">Phone</td><td style="padding:6px 0;font-weight:600;font-size:14px">${phone ? `<a href="tel:${phone}" style="color:#111">${phone}</a>` : "—"}</td></tr>
    <tr><td style="padding:6px 0;color:#666;font-size:14px">Company</td><td style="padding:6px 0;font-weight:600;font-size:14px">${fmt(company)}</td></tr>
  </table>

  ${hasSize ? `
  <h3 style="margin-top:24px;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#888">Sign Size</h3>
  <p style="margin:0;font-size:15px;font-weight:600">${signWidthIn}" × ${signHeightIn}"</p>
  ` : ""}

  ${generatedUrl ? `
  <h3 style="margin-top:24px;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#888">Generated Mockup</h3>
  <a href="${generatedUrl}"><img src="${generatedUrl}" alt="Generated sign mockup" style="width:100%;border-radius:8px;display:block" /></a>
  <a href="${generatedUrl}" style="display:inline-block;margin-top:6px;color:#555;font-size:13px">View full image →</a>
  ` : ""}

  ${storefrontUrl ? `
  <h3 style="margin-top:24px;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#888">Storefront Photo</h3>
  <a href="${storefrontUrl}"><img src="${storefrontUrl}" alt="Storefront" style="width:100%;border-radius:8px;display:block" /></a>
  ` : ""}

  ${logoUrl ? `
  <h3 style="margin-top:24px;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#888">Client Logo</h3>
  <a href="${logoUrl}"><img src="${logoUrl}" alt="Client logo" style="max-width:300px;border-radius:8px;display:block" /></a>
  ` : ""}
</div>`
}

function clientDesignHtml(opts: {
  name: string
  generatedUrl: string | null
  storefrontUrl: string | null
  logoUrl: string | null
  signWidthIn: number | null
  signHeightIn: number | null
}) {
  const { name, generatedUrl, storefrontUrl, logoUrl, signWidthIn, signHeightIn } = opts
  const hasSize = signWidthIn != null && signHeightIn != null
  return `
<div style="font-family:sans-serif;max-width:620px;margin:0 auto;color:#111">
  ${generatedUrl ? `
  <div style="margin-top:0">
    <img src="${generatedUrl}" alt="Your sign design" style="width:100%;border-radius:8px;display:block" />
  </div>` : ""}

  <p style="font-size:16px;margin-bottom:4px;margin-top:24px">Hi ${fmt(name)},</p>
  <p style="font-size:15px;color:#333;margin-top:0">Thank you for using Kaykov Media. Your sign design is ready and we will contact you shortly with a full quote.</p>

  ${hasSize ? `<p style="margin-top:12px;font-size:15px;font-weight:600">Estimated size: ${signWidthIn}" × ${signHeightIn}"</p>` : ""}

  ${storefrontUrl ? `
  <h3 style="margin-top:24px;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#888">Your Storefront</h3>
  <img src="${storefrontUrl}" alt="Storefront" style="width:100%;border-radius:8px;display:block" />
  ` : ""}

  ${logoUrl ? `
  <h3 style="margin-top:24px;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#888">Your Logo</h3>
  <img src="${logoUrl}" alt="Logo" style="max-width:300px;border-radius:8px;display:block" />
  ` : ""}

  <p style="margin-top:24px;font-size:14px;color:#333">Best regards,</p>
  ${signature()}
</div>`
}

// ─── POST /api/leads ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const name             = (formData.get("name")              as string | null)?.trim()
    const email            = (formData.get("email")             as string | null)?.trim() || null
    const phone            = (formData.get("phone")             as string | null)?.trim() || null
    const company          = (formData.get("company")           as string | null)?.trim() || null
    const businessLocation = (formData.get("business_location") as string | null)?.trim() || null
    const message          = (formData.get("message")           as string | null)?.trim() || null
    const source           = (formData.get("source")            as string | null)?.trim() || null
    const signAreaRaw      = (formData.get("sign_area")         as string | null) || null
    const storefrontFile   = formData.get("storefront") as File | null

    if (!name || (!email && !phone))
      return NextResponse.json({ error: "Name and email or phone are required" }, { status: 400, headers: CORS_HEADERS })

    const supabase = getSupabase()
    const resend   = getResend()
    let leadId: string | null = null
    let storefrontUrl: string | null = null

    if (supabase) {
      const { data, error } = await supabase
        .from("leads")
        .insert({ name, email, phone, company, source: source ?? "quote-form" })
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
          storefrontUrl = publicUrl
          await supabase.from("leads").update({ storefront_url: storefrontUrl }).eq("id", leadId)
        }
      }
    }

    const notifyEmail = process.env.LEAD_NOTIFICATION_EMAIL
    const submittedAt = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
    const signAreaMarked = !!signAreaRaw

    if (resend && notifyEmail) {
      const adminResult = await resend.emails.send({
        from: "Kaykov Media <info@kaykovmedia.com>",
        to: ["ktv@kaykovmedia.com", "boris@kaykovmedia.com"],
        subject: `New Quote Request — ${company || name}`,
        html: adminQuoteHtml({ name: name!, email, phone, company, businessLocation, message, storefrontUrl, signAreaMarked, source, submittedAt }),
      }).catch(console.error)

      if (adminResult && supabase && leadId) {
        await supabase.from("leads").update({ admin_email_sent_at: new Date().toISOString() }).eq("id", leadId)
      }
    }

    if (resend && email) {
      const clientResult = await resend.emails.send({
        from: "Kaykov Media <info@kaykovmedia.com>",
        to: email,
        subject: "We received your quote request!",
        html: clientQuoteHtml({ name: name!, company, businessLocation, message }),
      }).catch(console.error)

      if (clientResult && supabase && leadId) {
        await supabase.from("leads").update({ client_email_sent_at: new Date().toISOString() }).eq("id", leadId)
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
        generated_url:  generatedStoredUrl ?? generatedImageUrl,
        sign_width_in:  body.sign_width_in  ?? null,
        sign_height_in: body.sign_height_in ?? null,
        size_method:    body.size_method    ?? null,
        door_detected:  body.door_detected  ?? null,
        door_confidence: body.door_confidence ?? null,
        source:         body.source ?? "direct",
      }).eq("id", id)
    }

    // Fetch all lead data from DB as single source of truth for emails
    let lead: { name: string; email: string | null; phone: string | null; company: string | null; storefront_url: string | null; logo_url: string | null; generated_url: string | null; sign_width_in: number | null; sign_height_in: number | null } | null = null
    if (supabase) {
      const { data } = await supabase.from("leads").select("name,email,phone,company,storefront_url,logo_url,generated_url,sign_width_in,sign_height_in").eq("id", id).single()
      if (data) lead = data
    }

    const notifyEmail = process.env.LEAD_NOTIFICATION_EMAIL
    const submittedAt = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })

    if (resend && notifyEmail && lead) {
      const adminResult = await resend.emails.send({
        from: "Kaykov Media <info@kaykovmedia.com>",
        to: ["ktv@kaykovmedia.com", "boris@kaykovmedia.com"],
        subject: `New Design Signage Lead — ${lead.company || lead.name}`,
        html: adminDesignHtml({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          company: lead.company,
          generatedUrl: lead.generated_url,
          storefrontUrl: lead.storefront_url,
          logoUrl: lead.logo_url,
          signWidthIn: lead.sign_width_in,
          signHeightIn: lead.sign_height_in,
          submittedAt,
        }),
      }).catch(console.error)

      if (adminResult && supabase) {
        await supabase.from("leads").update({ admin_email_sent_at: new Date().toISOString() }).eq("id", id)
      }
    }

    if (resend && lead?.email) {
      const clientResult = await resend.emails.send({
        from: "Kaykov Media <info@kaykovmedia.com>",
        to: lead.email,
        subject: "Your sign design is ready!",
        html: clientDesignHtml({
          name: lead.name,
          generatedUrl: lead.generated_url,
          storefrontUrl: lead.storefront_url,
          logoUrl: lead.logo_url,
          signWidthIn: lead.sign_width_in,
          signHeightIn: lead.sign_height_in,
        }),
      }).catch(console.error)

      if (clientResult && supabase) {
        await supabase.from("leads").update({ client_email_sent_at: new Date().toISOString() }).eq("id", id)
      }
    }

    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS })
  } catch (err) {
    console.error("[leads] PATCH error:", err)
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500, headers: CORS_HEADERS })
  }
}
