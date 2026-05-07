import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useFlowStore } from "@/lib/flow-store"
import { cn } from "@/lib/utils"
import { placementToInches } from "@/lib/placement-to-inches"
import type { Placement } from "@/types/flow"
import { Eraser, Paintbrush } from "lucide-react"

function placementFromBrushLayer(brushLayer: HTMLCanvasElement): Placement | null {
  const ctx = brushLayer.getContext("2d")
  if (!ctx) return null
  const W = brushLayer.width; const H = brushLayer.height
  if (W < 2 || H < 2) return null
  const { data } = ctx.getImageData(0, 0, W, H)
  let minX = W, minY = H, maxX = 0, maxY = 0, any = false
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4
      const lum = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
      if (lum > 36) { any = true; if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y }
    }
  }
  if (!any) return null
  const pad = Math.max(2, Math.round(Math.min(W, H) * 0.004))
  minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad)
  maxX = Math.min(W - 1, maxX + pad); maxY = Math.min(H - 1, maxY + pad)
  const bw = maxX - minX + 1; const bh = maxY - minY + 1
  return { centerX: (minX + maxX + 1) / (2 * W), centerY: (minY + maxY + 1) / (2 * H), width: bw / W, height: bh / H, rotation: 0, facadeConfidence: 0.9 }
}

function refreshTint(viewCanvas: HTMLCanvasElement, brushLayer: HTMLCanvasElement) {
  const W = brushLayer.width; const H = brushLayer.height
  const mctx = brushLayer.getContext("2d"); const vctx = viewCanvas.getContext("2d")
  if (!mctx || !vctx || W < 1 || H < 1) return
  const { data: src } = mctx.getImageData(0, 0, W, H)
  const out = vctx.createImageData(W, H); const dst = out.data
  for (let i = 0; i < src.length; i += 4) {
    const lum = src[i] * 0.299 + src[i + 1] * 0.587 + src[i + 2] * 0.114
    if (lum > 40) { dst[i] = 255; dst[i + 1] = 215; dst[i + 2] = 64; dst[i + 3] = 132 }
    else { dst[i + 3] = 0 }
  }
  vctx.clearRect(0, 0, W, H); vctx.putImageData(out, 0, 0)
}

export function StepPlacement() {
  const { storefrontPreviewUrl, placementBrushFile, doorDetection, setPlacement, setPlacementBrushFile, setSignSize, goNext } = useFlowStore()
  const stageRef = useRef<HTMLDivElement>(null)
  const imgRef   = useRef<HTMLImageElement>(null)
  const viewRef  = useRef<HTMLCanvasElement>(null)
  const brushLayerRef = useRef<HTMLCanvasElement | null>(null)

  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null)
  const [brushScreenPx, setBrushScreenPx] = useState(22)
  const [tool, setTool] = useState<"paint" | "erase">("paint")
  const [hasPaint, setHasPaint] = useState(false)
  const [brushCursor, setBrushCursor] = useState<{ left: number; top: number } | null>(null)
  const [brushSizeAdjusting, setBrushSizeAdjusting] = useState(false)
  const [brushRingCenter, setBrushRingCenter] = useState<{ left: number; top: number } | null>(null)
  const drawing = useRef(false)
  const lastRef = useRef<{ x: number; y: number } | null>(null)
  const prevPreviewUrl = useRef<string | undefined>(undefined)

  const ensureBrushLayer = useCallback((w: number, h: number) => {
    let c = brushLayerRef.current
    if (!c) { c = document.createElement("canvas"); brushLayerRef.current = c }
    if (c.width !== w || c.height !== h) {
      c.width = w; c.height = h
      const m = c.getContext("2d")
      if (m) { m.fillStyle = "#000000"; m.fillRect(0, 0, w, h) }
    }
    return c
  }, [])

  const clearBrushLayer = useCallback(() => {
    if (!natural) return
    const c = ensureBrushLayer(natural.w, natural.h)
    const m = c.getContext("2d")
    if (m) { m.fillStyle = "#000000"; m.fillRect(0, 0, c.width, c.height) }
    const v = viewRef.current
    if (v) refreshTint(v, c)
    setHasPaint(false)
  }, [ensureBrushLayer, natural])

  useEffect(() => {
    const img = imgRef.current
    if (!img?.complete || !storefrontPreviewUrl) return
    if (img.naturalWidth > 0 && img.naturalHeight > 0) setNatural({ w: img.naturalWidth, h: img.naturalHeight })
  }, [storefrontPreviewUrl])

  useEffect(() => {
    const img = imgRef.current; const view = viewRef.current
    if (!img || !view || !natural) return
    view.width = natural.w; view.height = natural.h
    const sync = () => {
      const iw = img.clientWidth; const ih = img.clientHeight
      if (iw < 1 || ih < 1) return
      view.style.width = `${iw}px`; view.style.height = `${ih}px`
    }
    sync()
    const ro = new ResizeObserver(() => requestAnimationFrame(sync))
    ro.observe(img); window.addEventListener("resize", sync)
    return () => { ro.disconnect(); window.removeEventListener("resize", sync) }
  }, [natural])

  useLayoutEffect(() => {
    if (!brushSizeAdjusting) { setBrushRingCenter(null); return }
    const update = () => {
      const st = stageRef.current; const im = imgRef.current
      if (!st || !im) return
      const sr = st.getBoundingClientRect(); const ir = im.getBoundingClientRect()
      if (ir.width < 1 || ir.height < 1) return
      setBrushRingCenter({ left: ir.left - sr.left + ir.width / 2, top: ir.top - sr.top + ir.height / 2 })
    }
    update()
    const ro = new ResizeObserver(() => requestAnimationFrame(update))
    ro.observe(stageRef.current!); ro.observe(imgRef.current!)
    window.addEventListener("resize", update)
    return () => { ro.disconnect(); window.removeEventListener("resize", update) }
  }, [brushSizeAdjusting, natural, storefrontPreviewUrl])

  useEffect(() => {
    if (!natural || !storefrontPreviewUrl) return
    if (prevPreviewUrl.current === storefrontPreviewUrl) return
    prevPreviewUrl.current = storefrontPreviewUrl
    ensureBrushLayer(natural.w, natural.h)
    const m = brushLayerRef.current?.getContext("2d")
    if (m && brushLayerRef.current) { m.fillStyle = "#000000"; m.fillRect(0, 0, natural.w, natural.h) }
    const v = viewRef.current
    if (v && brushLayerRef.current) refreshTint(v, brushLayerRef.current)
    setHasPaint(false); setPlacementBrushFile(undefined)
  }, [natural, ensureBrushLayer, setPlacementBrushFile, storefrontPreviewUrl])

  useEffect(() => {
    if (!placementBrushFile || !natural) return
    const brush = ensureBrushLayer(natural.w, natural.h)
    const ctx = brush.getContext("2d")
    if (!ctx) return
    const url = URL.createObjectURL(placementBrushFile)
    const im = new window.Image()
    im.onload = () => {
      ctx.fillStyle = "#000000"; ctx.fillRect(0, 0, brush.width, brush.height)
      ctx.drawImage(im, 0, 0, brush.width, brush.height); URL.revokeObjectURL(url)
      const v = viewRef.current; if (v) refreshTint(v, brush)
      setHasPaint(true)
    }
    im.onerror = () => URL.revokeObjectURL(url); im.src = url
  }, [placementBrushFile, natural, ensureBrushLayer])

  useEffect(() => {
    const el = viewRef.current; if (!el) return
    const block = (ev: TouchEvent) => { if (drawing.current) ev.preventDefault() }
    el.addEventListener("touchmove", block, { passive: false })
    return () => el.removeEventListener("touchmove", block)
  }, [natural])

  const pointerToBrushLayer = useCallback((clientX: number, clientY: number) => {
    const view = viewRef.current; const brushLayer = brushLayerRef.current
    if (!view || !natural || !brushLayer) return null
    const rect = view.getBoundingClientRect()
    if (rect.width < 2 || rect.height < 2) return null
    const W = brushLayer.width; const H = brushLayer.height
    const x = Math.max(0, Math.min(W - 1e-6, ((clientX - rect.left) / rect.width) * W))
    const y = Math.max(0, Math.min(H - 1e-6, ((clientY - rect.top)  / rect.height) * H))
    const scale = W / rect.width
    const r = Math.max(2, Math.min(Math.min(W, H) * 0.2, brushScreenPx * scale))
    return { x, y, r }
  }, [natural, brushScreenPx])

  const updateBrushCursor = (e: Pick<React.PointerEvent<HTMLCanvasElement>, "clientX" | "clientY" | "pointerType">) => {
    if (e.pointerType === "touch") { setBrushCursor(null); return }
    const stage = stageRef.current; if (!stage) return
    const r = stage.getBoundingClientRect()
    setBrushCursor({ left: e.clientX - r.left, top: e.clientY - r.top })
  }

  const paintStroke = (x: number, y: number, r: number, move: boolean) => {
    const brushLayer = brushLayerRef.current; if (!brushLayer) return
    const m = brushLayer.getContext("2d"); if (!m) return
    const W = brushLayer.width; const H = brushLayer.height
    const maxJump = Math.hypot(W, H) * 0.42
    if (move && lastRef.current) {
      if (Math.hypot(x - lastRef.current.x, y - lastRef.current.y) > maxJump) lastRef.current = null
    }
    m.globalCompositeOperation = "source-over"
    m.strokeStyle = m.fillStyle = tool === "erase" ? "#000000" : "#ffffff"
    m.lineWidth = r * 2; m.lineCap = "round"; m.lineJoin = "round"
    if (!move || !lastRef.current) { m.beginPath(); m.arc(x, y, r, 0, Math.PI * 2); m.fill() }
    else { m.beginPath(); m.moveTo(lastRef.current.x, lastRef.current.y); m.lineTo(x, y); m.stroke() }
    const v = viewRef.current; if (v) refreshTint(v, brushLayer)
    setHasPaint(true); lastRef.current = { x, y }
  }

  const endStroke = (target: HTMLCanvasElement, pointerId: number) => {
    drawing.current = false; lastRef.current = null
    try { target.releasePointerCapture(pointerId) } catch {}
  }

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return
    e.preventDefault(); setBrushSizeAdjusting(false); updateBrushCursor(e)
    if (natural) ensureBrushLayer(natural.w, natural.h)
    const p = pointerToBrushLayer(e.clientX, e.clientY); if (!p) return
    drawing.current = true; lastRef.current = null
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch {}
    paintStroke(p.x, p.y, p.r, false)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    updateBrushCursor(e); if (!drawing.current) return; e.preventDefault()
    const p = pointerToBrushLayer(e.clientX, e.clientY); if (!p) return
    paintStroke(p.x, p.y, p.r, true)
  }

  const handleConfirm = async () => {
    const brushLayer = brushLayerRef.current
    if (!brushLayer || !natural || !hasPaint) return
    const derived = placementFromBrushLayer(brushLayer)
    if (!derived) return
    const blob: Blob | null = await new Promise((res) => brushLayer.toBlob((b) => res(b), "image/png"))
    if (!blob) return
    const file = new File([blob], "placement-brush.png", { type: "image/png" })
    const size = placementToInches(derived, natural.w, natural.h, doorDetection?.detected ? doorDetection.box ?? null : null)
    setSignSize(size); setPlacement(derived); setPlacementBrushFile(file); goNext()
  }

  const brushRingPos = brushSizeAdjusting && brushRingCenter ? brushRingCenter : brushCursor

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mark where the sign goes</h2>
        <p className="text-gray-500 mt-1 text-sm">Paint over the storefront area for your sign. Adjust brush size, use the eraser to fix edges, then continue.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-gray-200 p-0.5 bg-white">
          {(["paint", "erase"] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTool(t)}
              className={cn("flex items-center gap-1.5 px-3 py-2.5 sm:py-2 rounded-md text-sm font-medium transition-colors min-w-[80px] justify-center", tool === t ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50")}
            >
              {t === "paint" ? <Paintbrush size={16} /> : <Eraser size={16} />}
              {t === "paint" ? "Brush" : "Eraser"}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <span className="whitespace-nowrap">Brush size</span>
          <input type="range" min={6} max={72} value={brushScreenPx}
            onChange={(e) => setBrushScreenPx(Number(e.target.value))}
            onPointerDown={() => setBrushSizeAdjusting(true)}
            onPointerUp={() => setBrushSizeAdjusting(false)}
            onTouchStart={() => setBrushSizeAdjusting(true)}
            onTouchEnd={() => setBrushSizeAdjusting(false)}
            onBlur={() => setBrushSizeAdjusting(false)}
            className="w-32 sm:w-36 accent-black touch-none"
          />
        </label>
        <button type="button" onClick={clearBrushLayer} className="text-sm text-gray-500 underline hover:text-gray-800 py-2.5 sm:py-0">Clear all</button>
      </div>

      <div ref={stageRef} className="relative w-full rounded-xl overflow-hidden bg-gray-900 select-none touch-none">
        {storefrontPreviewUrl && (
          <img ref={imgRef} src={storefrontPreviewUrl} alt="Storefront"
            className="relative z-0 block w-full h-auto pointer-events-none" draggable={false}
            onLoad={(e) => { const el = e.currentTarget; if (el.naturalWidth > 0 && el.naturalHeight > 0) setNatural({ w: el.naturalWidth, h: el.naturalHeight }) }}
          />
        )}
        <div className="absolute inset-0 z-[1] bg-black/30 pointer-events-none" aria-hidden />
        <canvas ref={viewRef}
          className="absolute top-0 left-0 z-[2] touch-none cursor-none pointer-events-auto overscroll-none"
          style={{ touchAction: "none" }}
          onPointerDown={onPointerDown}
          onPointerEnter={(e) => updateBrushCursor(e)}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setBrushCursor(null)}
          onPointerUp={(e) => endStroke(e.currentTarget, e.pointerId)}
          onPointerCancel={(e) => endStroke(e.currentTarget, e.pointerId)}
          onLostPointerCapture={() => { drawing.current = false; lastRef.current = null }}
        />
        {brushRingPos && (
          <div aria-hidden
            className={cn("pointer-events-none absolute z-50 rounded-full box-border transition-[width,height] duration-75",
              tool === "erase" ? "border-2 border-dashed border-white" : "border-2 border-white"
            )}
            style={{
              left: brushRingPos.left - brushScreenPx,
              top: brushRingPos.top - brushScreenPx,
              width: brushScreenPx * 2,
              height: brushScreenPx * 2,
              mixBlendMode: "difference",
            }}
          />
        )}
        <div className="absolute bottom-2 left-2 z-[3] bg-black/60 text-white text-[10px] px-2 py-1 rounded pointer-events-none max-w-[90%]">
          Yellow tint shows the sign area sent to the AI.
        </div>
      </div>

      <button type="button" disabled={!hasPaint} onClick={handleConfirm}
        className={cn("w-full py-3.5 rounded-xl text-sm font-semibold transition-colors", hasPaint ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-gray-100 text-gray-400 cursor-not-allowed")}
      >
        Confirm placement →
      </button>
      {!hasPaint && <p className="text-xs text-gray-400 text-center -mt-3">Paint at least one stroke on the building where the sign should appear.</p>}
    </div>
  )
}
