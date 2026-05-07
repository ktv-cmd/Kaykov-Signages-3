import React, { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useFlowStore } from "@/lib/flow-store"
import { REFERENCE_STYLES } from "@/lib/references"
import { cn, createObjectUrl } from "@/lib/utils"
import { Upload, X, CheckCircle2, Image as ImageIcon, Type } from "lucide-react"
import type { ReferenceStyle, FontStyle } from "@/types/flow"

const API_BASE = import.meta.env.VITE_SIGNAI_API_URL ?? "http://localhost:3000"

function TextStylingSelector() {
  const { textStyling, setTextStyling } = useFlowStore()
  const fontOptions: { id: FontStyle; name: string }[] = [
    { id: "modern-sans", name: "Modern Sans" },
    { id: "classic-serif", name: "Classic Serif" },
    { id: "bold-condensed", name: "Bold Condensed" },
  ]
  const currentFont = textStyling?.fontStyle || "modern-sans"
  const currentColor = textStyling?.color || "#C0C0C0"

  useEffect(() => {
    if (!textStyling) setTextStyling({ fontStyle: "modern-sans", color: "#C0C0C0" })
  }, [textStyling, setTextStyling])

  return (
    <div className="space-y-4 pt-4 border-t border-gray-200">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700"><Type size={16} />Font Style</label>
        <div className="grid grid-cols-3 gap-2">
          {fontOptions.map((font) => (
            <button key={font.id} type="button"
              onClick={() => setTextStyling({ fontStyle: font.id, color: currentColor })}
              className={cn("flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all min-h-[80px]",
                currentFont === font.id ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300")}
            >
              <span className={cn("text-2xl font-bold",
                font.id === "modern-sans" && "font-sans",
                font.id === "classic-serif" && "font-serif",
                font.id === "bold-condensed" && "font-sans tracking-tighter"
              )}>Aa</span>
              <span className="text-xs text-gray-600">{font.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Letter Color</label>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <input type="color" value={currentColor}
            onChange={(e) => setTextStyling({ fontStyle: currentFont, color: e.target.value })}
            className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-300 flex-shrink-0"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">Selected Color</p>
            <p className="text-xs text-gray-500 font-mono mt-0.5">{currentColor.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StepUpload() {
  const {
    storefrontPreviewUrl, brandAssetPreviewUrl, brandText, textStyling,
    selectedReferences, setStorefront, setBrandAsset, setBrandText,
    setTextStyling, clearBrandAsset, setSelectedReferences, selectReference, setDoorDetection, goNext,
  } = useFlowStore()

  const extractDominantColor = useCallback((imageUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = document.createElement("img")
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) { resolve("#C0C0C0"); return }
        canvas.width = 100; canvas.height = 100
        ctx.drawImage(img, 0, 0, 100, 100)
        try {
          const { data } = ctx.getImageData(0, 0, 100, 100)
          const colorMap: Record<string, number> = {}
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3]
            if (a < 128 || (r > 240 && g > 240 && b > 240)) continue
            const key = `${Math.floor(r / 32) * 32},${Math.floor(g / 32) * 32},${Math.floor(b / 32) * 32}`
            colorMap[key] = (colorMap[key] || 0) + 1
          }
          let maxCount = 0, dominantColor = "192,192,192"
          for (const [color, count] of Object.entries(colorMap)) {
            if (count > maxCount) { maxCount = count; dominantColor = color }
          }
          const [rr, gg, bb] = dominantColor.split(",").map(Number)
          resolve("#" + [rr, gg, bb].map((x) => x.toString(16).padStart(2, "0")).join(""))
        } catch { resolve("#C0C0C0") }
      }
      img.onerror = () => resolve("#C0C0C0")
      img.src = imageUrl
    })
  }, [])

  const detectDoorSilently = useCallback(async (previewUrl: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/detect-door`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: previewUrl }),
      })
      if (!res.ok) return
      setDoorDetection(await res.json())
    } catch {}
  }, [setDoorDetection])

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items
      if (!items?.length) return
      const imageItem = Array.from(items).find((item) => item.type.startsWith("image/"))
      if (!imageItem) return
      const pasted = imageItem.getAsFile()
      if (!pasted) return
      const extension = pasted.type.split("/")[1] || "png"
      const file = new File([pasted], `pasted-${Date.now()}.${extension}`, { type: pasted.type, lastModified: Date.now() })
      event.preventDefault()
      if (!storefrontPreviewUrl) {
        const url = createObjectUrl(file); setStorefront(file, url); detectDoorSilently(url); return
      }
      const previewUrl = createObjectUrl(file); setBrandAsset(file, previewUrl)
      if (brandText?.trim()) {
        extractDominantColor(previewUrl).then((color) => setTextStyling({ fontStyle: textStyling?.fontStyle || "modern-sans", color }))
      }
    }
    window.addEventListener("paste", onPaste)
    return () => window.removeEventListener("paste", onPaste)
  }, [brandText, setBrandAsset, setStorefront, storefrontPreviewUrl, extractDominantColor, setTextStyling, textStyling?.fontStyle, detectDoorSilently])

  const onDropStorefront = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]; if (!file) return
    const url = createObjectUrl(file); setStorefront(file, url); detectDoorSilently(url)
  }, [setStorefront, detectDoorSilently])

  const onDropBrand = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]; if (!file) return
    const previewUrl = createObjectUrl(file); setBrandAsset(file, previewUrl)
    if (brandText?.trim()) {
      const dominantColor = await extractDominantColor(previewUrl)
      setTextStyling({ fontStyle: textStyling?.fontStyle || "modern-sans", color: dominantColor })
    }
  }, [setBrandAsset, brandText, extractDominantColor, setTextStyling, textStyling?.fontStyle])

  const storefrontDropzone = useDropzone({ onDrop: onDropStorefront, accept: { "image/*": [] }, maxFiles: 1 })
  const brandDropzone = useDropzone({ onDrop: onDropBrand, accept: { "image/*": [] }, maxFiles: 1 })

  const hasLogo = Boolean(brandAssetPreviewUrl)
  const hasText = Boolean(brandText?.trim())
  const hasValidBrandInput = hasLogo || hasText
  const canProceed = storefrontPreviewUrl && hasValidBrandInput && selectedReferences.length === 1

  useEffect(() => {
    if (hasLogo && hasText && brandAssetPreviewUrl) {
      extractDominantColor(brandAssetPreviewUrl).then((color) => setTextStyling({ fontStyle: textStyling?.fontStyle || "modern-sans", color }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLogo, hasText, brandAssetPreviewUrl])

  useEffect(() => {
    const validIds = new Set(REFERENCE_STYLES.map((r) => r.id))
    let next = selectedReferences.filter((r) => validIds.has(r.id))
    if (next.length > 1) next = [next[0]!]
    const same = next.length === selectedReferences.length && next.every((r, i) => r.id === selectedReferences[i]?.id)
    if (!same) setSelectedReferences(next)
  }, [selectedReferences, setSelectedReferences])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Upload your storefront</h2>
        <p className="text-gray-500 mt-1">Upload a photo and your brand, then choose a sign style.</p>
      </div>

      {/* Storefront */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Storefront photo <span className="text-red-500">*</span></label>
        <div {...storefrontDropzone.getRootProps()}
          className={cn("relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-colors",
            storefrontDropzone.isDragActive ? "border-black bg-gray-50"
            : storefrontPreviewUrl ? "border-gray-200 bg-gray-50"
            : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50")}
        >
          <input {...storefrontDropzone.getInputProps()} />
          {storefrontPreviewUrl ? (
            <div className="relative">
              <img src={storefrontPreviewUrl} alt="Storefront" className="w-full h-auto" />
              <button type="button" onClick={(e) => { e.stopPropagation(); useFlowStore.setState({ storefrontFile: undefined, storefrontPreviewUrl: undefined }) }}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100">
                <X size={16} className="text-gray-600" />
              </button>
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">Click or drag to replace</div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-14">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center"><Upload size={20} className="text-gray-400" /></div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">Drop your storefront photo here</p>
                <p className="text-xs text-gray-400 mt-1">or click to browse · JPG, PNG · paste with Cmd/Ctrl+V</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Brand */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Your brand <span className="text-red-500">*</span></label>
          <p className="text-xs text-gray-400 mt-0.5">Add your logo, business name, or both</p>
        </div>
        <div {...brandDropzone.getRootProps()}
          className={cn("border-2 border-dashed rounded-xl cursor-pointer transition-colors",
            brandDropzone.isDragActive ? "border-black bg-gray-50"
            : brandAssetPreviewUrl ? "border-green-500 bg-green-50"
            : "border-gray-300 bg-white hover:border-gray-400")}
        >
          <input {...brandDropzone.getInputProps()} />
          {brandAssetPreviewUrl ? (
            <div className="relative flex items-center gap-3 p-3">
              <img src={brandAssetPreviewUrl} alt="Logo" className="h-12 w-auto object-contain rounded" />
              <div className="flex-1"><span className="text-sm font-medium text-green-700">Logo uploaded</span><p className="text-xs text-green-600">Click to replace</p></div>
              <button type="button" onClick={(e) => { e.stopPropagation(); clearBrandAsset() }} className="p-1.5 hover:bg-green-100 rounded"><X size={14} className="text-green-600" /></button>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0"><ImageIcon size={18} className="text-gray-400" /></div>
              <div className="flex-1"><p className="text-sm font-medium text-gray-700">Upload your logo</p><p className="text-xs text-gray-400">PNG with transparent background works best</p></div>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Optional</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3"><div className="flex-1 h-px bg-gray-200" /><span className="text-xs text-gray-400 font-medium">AND / OR</span><div className="flex-1 h-px bg-gray-200" /></div>

        <div className={cn("border-2 rounded-xl transition-colors", brandText?.trim() ? "border-green-500 bg-green-50" : "border-gray-200")}>
          <input type="text" value={brandText ?? ""} onChange={(e) => setBrandText(e.target.value)}
            placeholder="Enter your business name"
            className={cn("w-full px-4 py-3 text-sm bg-transparent rounded-xl focus:outline-none", brandText?.trim() ? "placeholder:text-green-400" : "placeholder:text-gray-400")}
          />
        </div>
        {!brandText?.trim() && <p className="text-xs text-gray-400 pl-1">Optional if you have a logo</p>}
        {brandText?.trim() && <TextStylingSelector />}

        {!hasLogo && !hasText && (
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-amber-600 text-sm">Please add a logo or business name (or both)</span>
          </div>
        )}
        {(hasLogo || hasText) && (
          <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <CheckCircle2 size={16} className="text-green-600" />
            <span className="text-sm text-gray-600">
              {hasLogo && hasText ? "Logo + Name mode — Your sign will feature both"
                : hasLogo ? "Logo only mode — Sign will display your logo"
                : "Text only mode — Sign will display your business name"}
            </span>
          </div>
        )}
      </div>

      {/* Reference styles */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Choose sign style <span className="text-red-500">*</span></label>
          <p className="text-xs text-gray-400 mt-0.5">Pick one style.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {REFERENCE_STYLES.map((ref) => (
            <ReferenceCard key={ref.id} reference={ref} selected={selectedReferences[0]?.id === ref.id} onSelect={() => selectReference(ref)} />
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button type="button" disabled={!canProceed} onClick={goNext}
          className={cn("w-full py-3.5 rounded-xl text-sm font-semibold transition-colors",
            canProceed ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-gray-100 text-gray-400 cursor-not-allowed")}
        >
          Continue to Placement
        </button>
        {!canProceed && <p className="text-xs text-gray-400 text-center mt-2">Complete all required fields to continue</p>}
      </div>
    </div>
  )
}

function ReferenceCard({ reference, selected, onSelect }: { reference: ReferenceStyle; selected: boolean; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} aria-pressed={selected}
      className={cn("relative text-left rounded-xl border-2 overflow-hidden transition-all", selected ? "border-black shadow-sm" : "border-gray-200 hover:border-gray-300")}
    >
      <div className="h-32 bg-gray-100 overflow-hidden">
        {reference.imageUrl
          ? <img src={reference.imageUrl} alt={reference.name} className="w-full h-full object-contain bg-gray-900" />
          : <div className="w-full h-full flex items-center justify-center"><span className="text-gray-400 text-xs">{reference.name}</span></div>}
      </div>
      <div className="p-2.5">
        <p className="text-xs font-semibold text-gray-900">{reference.name}</p>
        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{reference.description}</p>
        <div className="flex gap-1 mt-1.5 flex-wrap">
          <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">{reference.lightingType}</span>
          <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">{reference.materialFeel}</span>
        </div>
      </div>
      {selected && <div className="absolute top-2 right-2"><CheckCircle2 size={18} className="text-black fill-white" /></div>}
    </button>
  )
}
