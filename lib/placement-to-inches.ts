import type { Placement } from "@/types"

export interface DoorBox {
  x: number      // pixels from left
  y: number      // pixels from top
  width: number  // pixels
  height: number // pixels
}

export interface SizeResult {
  widthIn: number
  heightIn: number
  method: "door-reference" | "user-input" | "ai-estimate"
  label: string  // human-readable e.g. "~4ft × 18in"
}

const DOOR_WIDTH_IN  = 36   // standard US door
const DOOR_HEIGHT_IN = 80

/**
 * Convert a normalized Placement bounding box into real-world inches.
 *
 * Mode A — door reference: uses a detected door bounding box (pixels) to
 *   derive a pixels-per-inch scale, then applies it to the sign area.
 *
 * Mode B — user input: uses a known storefront width in feet as the scale.
 *
 * Mode C — AI estimate: assumes a default storefront width of 20ft when no
 *   reference is available. Labeled "approximate".
 */
export function placementToInches(
  placement: Placement,
  imageNaturalW: number,
  imageNaturalH: number,
  doorBox?: DoorBox | null,
  storefrontWidthFt?: number | null,
): SizeResult {
  const signPixelW = placement.width  * imageNaturalW
  const signPixelH = placement.height * imageNaturalH

  // Mode A — door reference
  if (doorBox && doorBox.width > 0 && doorBox.height > 0) {
    const ppiX = doorBox.width  / DOOR_WIDTH_IN
    const ppiY = doorBox.height / DOOR_HEIGHT_IN
    const widthIn  = Math.round(signPixelW / ppiX)
    const heightIn = Math.round(signPixelH / ppiY)
    return {
      widthIn,
      heightIn,
      method: "door-reference",
      label: formatLabel(widthIn, heightIn),
    }
  }

  // Mode B — user-provided storefront width
  if (storefrontWidthFt && storefrontWidthFt > 0) {
    const storefrontWidthIn = storefrontWidthFt * 12
    const ppiX = imageNaturalW / storefrontWidthIn
    // Assume square pixels — use same ppi for height
    const widthIn  = Math.round(signPixelW / ppiX)
    const heightIn = Math.round(signPixelH / ppiX)
    return {
      widthIn,
      heightIn,
      method: "user-input",
      label: formatLabel(widthIn, heightIn),
    }
  }

  // Mode C — AI estimate (assumed 20ft storefront)
  const assumedWidthIn = 20 * 12
  const ppiX = imageNaturalW / assumedWidthIn
  const widthIn  = Math.round(signPixelW / ppiX)
  const heightIn = Math.round(signPixelH / ppiX)
  return {
    widthIn,
    heightIn,
    method: "ai-estimate",
    label: `~${formatLabel(widthIn, heightIn)}`,
  }
}

function formatLabel(widthIn: number, heightIn: number): string {
  const wFt   = Math.floor(widthIn / 12)
  const wRem  = widthIn % 12
  const hFt   = Math.floor(heightIn / 12)
  const hRem  = heightIn % 12

  const w = wFt > 0 ? (wRem > 0 ? `${wFt}ft ${wRem}in` : `${wFt}ft`) : `${widthIn}in`
  const h = hFt > 0 ? (hRem > 0 ? `${hFt}ft ${hRem}in` : `${hFt}ft`) : `${heightIn}in`
  return `${w} × ${h}`
}
