import { useFlowStore } from "@/lib/flow-store"
import { cn } from "@/lib/utils"
import { Download, CheckCircle2, ArrowRight, X, ZoomIn, Loader2, Send } from "lucide-react"
import { useEffect, useState } from "react"

const API_BASE = ""

export function StepSelect() {
  const {
    generationResult,
    selectedCandidateId, setSelectedCandidate,
    leadId, signSize, doorDetection, source,
  } = useFlowStore()

  const [downloaded, setDownloaded] = useState<Set<string>>(new Set())
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle")

  if (!generationResult) return null
  const { candidates } = generationResult

  // Auto-select when there's only one design
  useEffect(() => {
    if (candidates.length === 1 && !selectedCandidateId) {
      setSelectedCandidate(candidates[0].id)
    }
  }, [])

  const downloadImage = async (candidate: typeof candidates[0]) => {
    if (!candidate.imageUrl) return
    try {
      const response = await fetch(candidate.imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `sign-mockup-${candidate.id}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      setDownloaded((prev) => new Set([...prev, candidate.id]))
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  const downloadAll = async () => {
    for (const candidate of candidates) {
      if (!candidate.imageUrl) continue
      await downloadImage(candidate)
      if (candidates.length > 1) await new Promise((res) => setTimeout(res, 500))
    }
  }

  const handleSend = async () => {
    const selected = candidates.find((c) => c.id === selectedCandidateId)
    if (!selected?.imageUrl || !leadId) return
    setSubmitState("sending")
    try {
      await fetch(`${API_BASE}/api/leads`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: leadId,
          generatedImageUrl: selected.imageUrl,
          sign_width_in:    signSize?.widthIn    ?? null,
          sign_height_in:   signSize?.heightIn   ?? null,
          size_method:      signSize?.method     ?? null,
          door_detected:    doorDetection?.detected  ?? null,
          door_confidence:  doorDetection?.confidence ?? null,
          source:           source ?? "direct",
          flow_type:        "sign-ai",
        }),
      })
      setSubmitState("sent")
    } catch {
      setSubmitState("error")
    }
  }

  const lightboxCandidate = candidates.find((c) => c.imageUrl === lightbox)
  const isSingleDesign = candidates.length === 1

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Your Generated Designs</h2>
        <p className="text-gray-500 mt-1">
          {isSingleDesign
            ? "Your design is ready — send it to receive your quote."
            : `${candidates.length} designs ready — pick your favourite to send.`}
        </p>
      </div>

      {/* Thumbnails */}
      <div className={cn("grid gap-4",
        candidates.length === 1 ? "grid-cols-1 max-w-sm" :
        candidates.length === 2 ? "grid-cols-2" :
        "grid-cols-3"
      )}>
        {candidates.map((candidate, i) => {
          const isSelected = candidate.id === selectedCandidateId
          return (
            <div key={candidate.id} className="space-y-2">
              <div
                className={cn(
                  "group relative w-full rounded-xl overflow-hidden border-2 shadow-sm transition-all cursor-pointer",
                  isSelected
                    ? "border-blue-500 shadow-blue-100 shadow-md ring-2 ring-blue-300"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md opacity-80 hover:opacity-100"
                )}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                {candidate.imageUrl ? (
                  <img src={candidate.imageUrl} alt={`Design ${i + 1}`} className="w-full h-auto block" />
                ) : (
                  <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Design {i + 1}</span>
                  </div>
                )}

                {/* Selected checkmark */}
                {isSelected && (
                  <div className="absolute top-2 left-2 bg-blue-500 rounded-full p-0.5 shadow">
                    <CheckCircle2 size={15} className="text-white" />
                  </div>
                )}

                {/* Downloaded checkmark */}
                {downloaded.has(candidate.id) && !isSelected && (
                  <div className="absolute top-2 right-2 bg-green-500 rounded-full p-0.5 shadow">
                    <CheckCircle2 size={13} className="text-white" />
                  </div>
                )}

                {/* Zoom + Download overlay buttons */}
                <div className="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setLightbox(candidate.imageUrl ?? null) }}
                    className="bg-white/90 backdrop-blur-sm text-gray-700 p-1.5 rounded-lg shadow hover:bg-white transition-colors"
                    title="View full size"
                  >
                    <ZoomIn size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); downloadImage(candidate) }}
                    className="bg-white/90 backdrop-blur-sm text-gray-700 p-1.5 rounded-lg shadow hover:bg-white transition-colors"
                    title="Download"
                  >
                    <Download size={13} />
                  </button>
                </div>
              </div>
              <p className={cn(
                "text-xs text-center font-medium transition-colors",
                isSelected ? "text-blue-600" : "text-gray-400"
              )}>
                {isSelected ? "Selected" : `Design ${i + 1}`}
              </p>
            </div>
          )
        })}
      </div>

      {/* Selection hint for multi-design */}
      {!isSingleDesign && !selectedCandidateId && (
        <p className="text-center text-sm text-gray-400">Click a design to select it</p>
      )}

      {/* Send CTA */}
      {submitState !== "sent" && (
        <button
          type="button"
          disabled={!selectedCandidateId || submitState === "sending"}
          onClick={handleSend}
          className={cn(
            "w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors",
            !selectedCandidateId || submitState === "sending"
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {submitState === "sending" ? (
            <><Loader2 size={16} className="animate-spin" />Sending your design…</>
          ) : (
            <><Send size={16} />{isSingleDesign ? "Send Design" : "Send Selected Design"}</>
          )}
        </button>
      )}

      {submitState === "error" && (
        <p className="text-center text-sm text-red-500">
          Something went wrong.{" "}
          <button type="button" onClick={handleSend} className="underline">Try again</button>
        </p>
      )}

      {/* Download all */}
      <button
        type="button"
        onClick={downloadAll}
        className="w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
      >
        <Download size={16} />
        Download {candidates.length === 1 ? "Design" : `All ${candidates.length} Designs`}
      </button>

      {downloaded.size > 0 && (
        <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle2 size={15} className="text-green-600 shrink-0" />
          <p className="text-sm text-green-700">
            {downloaded.size === candidates.length
              ? "All designs saved to your device."
              : `${downloaded.size} of ${candidates.length} designs saved.`}
          </p>
        </div>
      )}

      {/* "You're all set!" — shown only after sending */}
      {submitState === "sent" && (
        <div className="rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-6 flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-900">You're all set!</p>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Your selected design has been sent. Our agent will review it and contact you within{" "}
                <span className="font-semibold text-gray-700">3 hours</span> with a full quote.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">Design · Fabrication · Installation · Permitting</p>
            <a
              href="/"
              className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Return to Main Page <ArrowRight size={15} />
            </a>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox} alt="Design preview" className="w-full h-auto rounded-2xl shadow-2xl" />
            <div className="absolute top-3 right-3 flex gap-2">
              {lightboxCandidate && (
                <button
                  type="button"
                  onClick={() => { downloadImage(lightboxCandidate); setLightbox(null) }}
                  className="flex items-center gap-1.5 bg-white text-gray-900 text-xs font-semibold px-3 py-2 rounded-lg shadow hover:bg-gray-100 transition-colors"
                >
                  <Download size={13} /> Save
                </button>
              )}
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="bg-white text-gray-900 p-2 rounded-lg shadow hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
