import { useCallback, useEffect, useRef, useState } from "react"
import { Paintbrush, RotateCcw } from "lucide-react"

export interface PaintedArea {
  centerX: number
  centerY: number
  width: number
  height: number
}

interface Props {
  imageUrl: string
  onChange: (area: PaintedArea | null) => void
}

const BRUSH_RADIUS = 22   // same feel as sign-combined
const LUM_THRESHOLD = 36  // matches sign-combined's threshold

// Reads the brush layer, returns bounding box in normalized coords
function getBoundingBox(brushLayer: HTMLCanvasElement): PaintedArea | null {
  const ctx = brushLayer.getContext("2d")
  if (!ctx) return null
  const W = brushLayer.width
  const H = brushLayer.height
  const { data } = ctx.getImageData(0, 0, W, H)
  let minX = W, minY = H, maxX = 0, maxY = 0, any = false
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4
      const lum = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
      if (lum > LUM_THRESHOLD) {
        any = true
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  if (!any) return null
  const bw = maxX - minX + 1
  const bh = maxY - minY + 1
  return {
    centerX: (minX + maxX + 1) / (2 * W),
    centerY: (minY + maxY + 1) / (2 * H),
    width:   bw / W,
    height:  bh / H,
  }
}

// Renders the brush layer as a gold tint at fixed alpha — matches sign-combined exactly
function refreshTint(viewCanvas: HTMLCanvasElement, brushLayer: HTMLCanvasElement) {
  const W = brushLayer.width
  const H = brushLayer.height
  const bctx = brushLayer.getContext("2d")
  const vctx = viewCanvas.getContext("2d")
  if (!bctx || !vctx || W < 1 || H < 1) return

  const { data: src } = bctx.getImageData(0, 0, W, H)
  const out = vctx.createImageData(W, H)
  const dst = out.data
  for (let i = 0; i < src.length; i += 4) {
    const lum = src[i] * 0.299 + src[i + 1] * 0.587 + src[i + 2] * 0.114
    if (lum > 40) {
      dst[i]     = 255   // R
      dst[i + 1] = 215   // G
      dst[i + 2] = 64    // B
      dst[i + 3] = 132   // A — fixed, never builds up
    } else {
      dst[i + 3] = 0
    }
  }
  vctx.clearRect(0, 0, W, H)
  vctx.putImageData(out, 0, 0)
}

export function SignAreaBrush({ imageUrl, onChange }: Props) {
  const imgRef        = useRef<HTMLImageElement>(null)
  const viewRef       = useRef<HTMLCanvasElement>(null)   // what the user sees (tint)
  const brushLayerRef = useRef<HTMLCanvasElement | null>(null) // hidden brush strokes
  const drawing       = useRef(false)
  const [hasPaint, setHasPaint]   = useState(false)
  const [natural, setNatural]     = useState<{ w: number; h: number } | null>(null)

  const ensureBrushLayer = useCallback((w: number, h: number) => {
    let c = brushLayerRef.current
    if (!c) {
      c = document.createElement("canvas")
      brushLayerRef.current = c
    }
    if (c.width !== w || c.height !== h) {
      c.width = w
      c.height = h
      const ctx = c.getContext("2d")
      if (ctx) { ctx.fillStyle = "#000"; ctx.fillRect(0, 0, w, h) }
    }
    return c
  }, [])

  const syncSize = useCallback(() => {
    const img = imgRef.current
    const view = viewRef.current
    if (!img || !view || !img.naturalWidth) return
    const { naturalWidth: w, naturalHeight: h } = img
    view.width  = w
    view.height = h
    ensureBrushLayer(w, h)
    setNatural({ w, h })
  }, [ensureBrushLayer])

  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    if (img.complete && img.naturalWidth > 0) syncSize()
    img.addEventListener("load", syncSize)
    window.addEventListener("resize", syncSize)
    return () => {
      img.removeEventListener("load", syncSize)
      window.removeEventListener("resize", syncSize)
    }
  }, [syncSize, imageUrl])

  const paintAt = useCallback((clientX: number, clientY: number) => {
    const view = viewRef.current
    const brushLayer = brushLayerRef.current
    if (!view || !brushLayer || !natural) return

    const rect = view.getBoundingClientRect()
    const scaleX = natural.w / rect.width
    const scaleY = natural.h / rect.height
    const x = (clientX - rect.left) * scaleX
    const y = (clientY - rect.top)  * scaleY
    const r = BRUSH_RADIUS * Math.max(scaleX, scaleY)

    const bctx = brushLayer.getContext("2d")
    if (!bctx) return
    bctx.fillStyle = "#ffffff"
    bctx.beginPath()
    bctx.arc(x, y, r, 0, Math.PI * 2)
    bctx.fill()

    refreshTint(view, brushLayer)
    setHasPaint(true)
    onChange(getBoundingBox(brushLayer))
  }, [natural, onChange])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    paintAt(e.clientX, e.clientY)
  }, [paintAt])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    paintAt(e.clientX, e.clientY)
  }, [paintAt])

  const onPointerUp = useCallback(() => { drawing.current = false }, [])

  const clear = useCallback(() => {
    const view = viewRef.current
    const brushLayer = brushLayerRef.current
    if (!view || !brushLayer || !natural) return
    const bctx = brushLayer.getContext("2d")
    if (bctx) { bctx.fillStyle = "#000"; bctx.fillRect(0, 0, brushLayer.width, brushLayer.height) }
    view.getContext("2d")?.clearRect(0, 0, view.width, view.height)
    setHasPaint(false)
    onChange(null)
  }, [natural, onChange])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
          <Paintbrush size={15} className="text-yellow-500" />
          Paint where you want the sign
          <span className="text-xs text-gray-400 font-normal">(optional)</span>
        </div>
        {hasPaint && (
          <button
            type="button"
            onClick={clear}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RotateCcw size={12} />
            Clear
          </button>
        )}
      </div>

      <div className="relative rounded-lg overflow-hidden select-none">
        <img
          ref={imgRef}
          src={imageUrl}
          alt="Storefront"
          className="w-full h-auto block"
          draggable={false}
        />
        <canvas
          ref={viewRef}
          className="absolute inset-0 cursor-crosshair touch-none"
          style={{ width: "100%", height: "100%" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        />
        {!hasPaint && (
          <div className="absolute inset-0 flex items-end justify-center pb-3 pointer-events-none">
            <span className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full">
              Draw over where you want your sign
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
