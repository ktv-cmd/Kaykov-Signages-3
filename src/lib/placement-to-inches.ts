import type { Placement, SignSizeResult } from "@/types/flow"

export interface DoorBox {
  x: number
  y: number
  width: number
  height: number
}

const DOOR_WIDTH_IN  = 36
const DOOR_HEIGHT_IN = 80

export function placementToInches(
  placement: Placement,
  imageNaturalW: number,
  imageNaturalH: number,
  doorBox?: DoorBox | null,
  storefrontWidthFt?: number | null,
): SignSizeResult {
  const signPixelW = placement.width  * imageNaturalW
  const signPixelH = placement.height * imageNaturalH

  if (doorBox && doorBox.width > 0 && doorBox.height > 0) {
    const ppiX = doorBox.width  / DOOR_WIDTH_IN
    const ppiY = doorBox.height / DOOR_HEIGHT_IN
    const widthIn  = Math.round(signPixelW / ppiX)
    const heightIn = Math.round(signPixelH / ppiY)
    return { widthIn, heightIn, method: "door-reference", label: formatLabel(widthIn, heightIn) }
  }

  if (storefrontWidthFt && storefrontWidthFt > 0) {
    const storefrontWidthIn = storefrontWidthFt * 12
    const ppiX = imageNaturalW / storefrontWidthIn
    const widthIn  = Math.round(signPixelW / ppiX)
    const heightIn = Math.round(signPixelH / ppiX)
    return { widthIn, heightIn, method: "user-input", label: formatLabel(widthIn, heightIn) }
  }

  const assumedWidthIn = 20 * 12
  const ppiX = imageNaturalW / assumedWidthIn
  const widthIn  = Math.round(signPixelW / ppiX)
  const heightIn = Math.round(signPixelH / ppiX)
  return { widthIn, heightIn, method: "ai-estimate", label: `~${formatLabel(widthIn, heightIn)}` }
}

function formatLabel(widthIn: number, heightIn: number): string {
  const wFt  = Math.floor(widthIn / 12);  const wRem = widthIn % 12
  const hFt  = Math.floor(heightIn / 12); const hRem = heightIn % 12
  const w = wFt > 0 ? (wRem > 0 ? `${wFt}ft ${wRem}in` : `${wFt}ft`) : `${widthIn}in`
  const h = hFt > 0 ? (hRem > 0 ? `${hFt}ft ${hRem}in` : `${hFt}ft`) : `${heightIn}in`
  return `${w} × ${h}`
}
