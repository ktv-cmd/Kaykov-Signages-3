import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Called weekly by Vercel Cron (see vercel.json) to keep the Supabase
// connection pool warm and prevent the project from going idle.
export async function GET(req: NextRequest) {
  // Verify the request comes from Vercel Cron (not a random visitor)
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return NextResponse.json({ error: "Supabase env vars missing" }, { status: 500 })
  }

  const supabase = createClient(url, key)

  // Lightweight query — just counts rows, no data returned
  const { count, error } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })

  if (error) {
    console.error("[keepalive] Supabase error:", error.message)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  console.log(`[keepalive] Supabase ping OK — leads count: ${count}`)
  return NextResponse.json({ ok: true, leads: count, ts: new Date().toISOString() })
}
