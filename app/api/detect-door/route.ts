import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

/**
 * POST /api/detect-door
 * Body: { imageUrl: string }  — a public URL or data: URI of the storefront photo
 * Returns: { detected: boolean, confidence: number, box?: { x, y, width, height } }
 *   box coordinates are in pixels relative to the image's natural dimensions.
 */
export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json() as { imageUrl?: string }

    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl required" }, { status: 400, headers: CORS_HEADERS })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { detected: false, confidence: 0, error: "GEMINI_API_KEY not set" },
        { status: 200, headers: CORS_HEADERS },
      )
    }

    // Fetch image and convert to base64
    let base64: string
    let mimeType: string

    if (imageUrl.startsWith("data:")) {
      const [meta, data] = imageUrl.split(",")
      mimeType = meta.split(":")[1].split(";")[0]
      base64 = data
    } else {
      const res = await fetch(imageUrl)
      if (!res.ok) throw new Error("Failed to fetch image")
      const buf = await res.arrayBuffer()
      base64 = Buffer.from(buf).toString("base64")
      mimeType = res.headers.get("content-type") ?? "image/jpeg"
    }

    const ai = new GoogleGenAI({ apiKey })

    const prompt = `You are analyzing a storefront photo to find the front door.

Look for a door — it may be glass, wood, metal, or any material. Standard US doors are 36 inches wide × 80 inches tall.

If you find a door, respond ONLY with a JSON object (no markdown, no explanation):
{"found": true, "confidence": 0.95, "x": 120, "y": 80, "width": 90, "height": 200}

Where x, y, width, height are pixel coordinates of the door bounding box relative to the full image dimensions.

If there is no visible door, respond ONLY with:
{"found": false, "confidence": 0}

Respond with ONLY the JSON object, nothing else.`

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType, data: base64 } },
            { text: prompt },
          ],
        },
      ],
    })

    const raw = response.text?.trim() ?? ""

    // Strip markdown fences if present
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim()

    let parsed: { found: boolean; confidence: number; x?: number; y?: number; width?: number; height?: number }
    try {
      parsed = JSON.parse(cleaned)
    } catch {
      return NextResponse.json({ detected: false, confidence: 0 }, { status: 200, headers: CORS_HEADERS })
    }

    if (!parsed.found) {
      return NextResponse.json({ detected: false, confidence: parsed.confidence ?? 0 }, { status: 200, headers: CORS_HEADERS })
    }

    return NextResponse.json(
      {
        detected: true,
        confidence: parsed.confidence ?? 0.8,
        box: {
          x: parsed.x ?? 0,
          y: parsed.y ?? 0,
          width: parsed.width ?? 0,
          height: parsed.height ?? 0,
        },
      },
      { status: 200, headers: CORS_HEADERS },
    )
  } catch (err) {
    console.error("[detect-door] error:", err)
    return NextResponse.json({ detected: false, confidence: 0 }, { status: 200, headers: CORS_HEADERS })
  }
}
