import { NextRequest, NextResponse } from "next/server"

export const maxDuration = 15

// Detects a door in the storefront image and returns its bounding box.
// Used to estimate sign size proportionally.
export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json() as { imageUrl?: string }
    if (!imageUrl) return NextResponse.json({ detected: false, confidence: 0 })

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) return NextResponse.json({ detected: false, confidence: 0 })

    // Convert data URL to base64
    const base64 = imageUrl.startsWith("data:")
      ? imageUrl.split(",")[1]
      : null

    if (!base64) return NextResponse.json({ detected: false, confidence: 0 })

    const { GoogleGenAI } = await import("@google/genai")
    const ai = new GoogleGenAI({ apiKey })

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{
        role: "user",
        parts: [
          {
            inlineData: { mimeType: "image/jpeg", data: base64 },
          },
          {
            text: `Analyze this storefront image and detect the main entrance door.
Return a JSON object with these fields only:
- detected: boolean (true if a door is clearly visible)
- confidence: number 0-1 (how confident you are)
- box: object with x, y, width, height as fractions of image dimensions (0-1), or null if not detected

Return only raw JSON, no markdown.`,
          },
        ],
      }],
      config: { responseMimeType: "application/json", temperature: 0 },
    })

    const raw = response.text ?? "{}"
    const parsed = JSON.parse(raw)
    return NextResponse.json({
      detected: parsed.detected ?? false,
      confidence: parsed.confidence ?? 0,
      box: parsed.box ?? null,
    })
  } catch {
    // Non-critical feature — always return gracefully
    return NextResponse.json({ detected: false, confidence: 0 })
  }
}
