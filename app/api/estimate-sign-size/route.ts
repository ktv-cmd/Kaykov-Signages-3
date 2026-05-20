import { NextRequest, NextResponse } from "next/server"

export const maxDuration = 20

interface SignBox {
  centerX: number
  centerY: number
  width:   number
  height:  number
}

interface EstimateResult {
  widthIn:    number
  heightIn:   number
  method:     "gemini-vision"
  label:      string
  confidence: number
}

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, signBox } = await req.json() as {
      imageUrl?: string
      signBox?:  SignBox
    }

    if (!imageUrl) return NextResponse.json({ error: "imageUrl required" }, { status: 400 })

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey)  return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 })

    const base64 = imageUrl.startsWith("data:") ? imageUrl.split(",")[1] : null
    if (!base64)  return NextResponse.json({ error: "imageUrl must be a data URL" }, { status: 400 })

    // Build a description of the sign region so Gemini can focus on the right area
    const regionDesc = signBox
      ? `The sign occupies roughly the region centered at (${(signBox.centerX * 100).toFixed(0)}%, ${(signBox.centerY * 100).toFixed(0)}%) of the image, spanning about ${(signBox.width * 100).toFixed(0)}% of the width and ${(signBox.height * 100).toFixed(0)}% of the height.`
      : "Focus on the main sign or sign panel on the building facade."

    const { GoogleGenAI } = await import("@google/genai")
    const ai = new GoogleGenAI({ apiKey })

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{
        role: "user",
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64 } },
          {
            text: `You are estimating the real-world dimensions of a storefront sign from a photo.

${regionDesc}

Work through these steps:
1. Identify the entrance door — a standard US commercial door is 36 inches wide and 80 inches tall. Note how large it appears in the image.
2. Use the door size to estimate a pixels-per-inch scale for the image.
3. Look at the sign area described above and estimate its pixel extent.
4. Convert to real-world inches using the scale from step 2.
5. Cross-check: does the sign width make sense for a typical storefront (usually 10–25 feet wide)?
6. Also consider any other references visible: people (~66" tall), windows (~36–48" wide), cars (~72" wide), or building proportions.

Return ONLY a raw JSON object with these fields:
{
  "widthInches": <number>,
  "heightInches": <number>,
  "confidence": <0.0–1.0>,
  "reasoning": "<one sentence>"
}`,
          },
        ],
      }],
      config: { responseMimeType: "application/json", temperature: 0 },
    })

    const raw = response.text ?? "{}"
    const parsed = JSON.parse(raw)

    const widthIn  = Math.round(parsed.widthInches  ?? 0)
    const heightIn = Math.round(parsed.heightInches ?? 0)

    if (widthIn <= 0 || heightIn <= 0) {
      return NextResponse.json({ error: "Gemini could not estimate dimensions" }, { status: 422 })
    }

    const result: EstimateResult = {
      widthIn,
      heightIn,
      method: "gemini-vision",
      label: formatLabel(widthIn, heightIn),
      confidence: parsed.confidence ?? 0.7,
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: "Estimation failed" }, { status: 500 })
  }
}

function formatLabel(widthIn: number, heightIn: number): string {
  const wFt = Math.floor(widthIn / 12);  const wRem = widthIn % 12
  const hFt = Math.floor(heightIn / 12); const hRem = heightIn % 12
  const w = wFt > 0 ? (wRem > 0 ? `${wFt}ft ${wRem}in` : `${wFt}ft`) : `${widthIn}in`
  const h = hFt > 0 ? (hRem > 0 ? `${hFt}ft ${hRem}in` : `${hFt}ft`) : `${heightIn}in`
  return `${w} × ${h}`
}
