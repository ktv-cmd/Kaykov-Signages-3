import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useFlowStore } from "@/lib/flow-store"
import { StepIndicator } from "./StepIndicator"
import { StepUpload } from "./steps/StepUpload"
import { StepPlacement } from "./steps/StepPlacement"
import { StepVariations } from "./steps/StepVariations"
import { StepGenerate } from "./steps/StepGenerate"
import { StepSelect } from "./steps/StepSelect"
import { StepAdjust } from "./steps/StepAdjust"
import { Sparkles, Upload, Paintbrush2, Wand2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const STEP_LABELS = {
  upload: "Upload",
  placement: "Placement",
  variations: "Variations",
  generate: "Generate",
  select: "Download",
  download: "Download",
  adjust: "Download",
}

const VISIBLE_STEPS = ["upload", "placement", "variations", "generate", "download"] as const

interface Props {
  embedded?: boolean
}

export function GenerateFlow({ embedded = false }: Props) {
  const [searchParams] = useSearchParams()
  const { currentStep, setSource, goBack } = useFlowStore()

  useEffect(() => {
    const utm = searchParams.get("utm_source") ?? searchParams.get("source") ?? "direct"
    setSource(utm)
  }, [searchParams, setSource])

  const steps = VISIBLE_STEPS.map((s) => ({ id: s as typeof VISIBLE_STEPS[number], label: STEP_LABELS[s] }))

  const stepContent = (
    <>
      {currentStep === "upload"     && <StepUpload />}
      {currentStep === "placement"  && <StepPlacement />}
      {currentStep === "variations" && <StepVariations />}
      {currentStep === "generate"   && <StepGenerate />}
      {currentStep === "download"   && <StepSelect />}
      {currentStep === "select"     && <StepSelect />}
      {currentStep === "adjust"     && <StepAdjust />}
    </>
  )

  if (embedded) {
    return (
      <div className="rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 pt-6 pb-4 border-b border-gray-100">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>
        <div className="px-4 sm:px-6 py-6 sm:py-8">
          {stepContent}
        </div>
      </div>
    )
  }

  const isIntro = currentStep === "upload"

  // Standalone page layout (used at /ai route)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => currentStep === "upload" ? (window.location.href = "/") : goBack()}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors shrink-0"
          >
            <span className="text-lg leading-none">←</span>
            <span className="hidden sm:inline">
              {currentStep === "upload" ? "Back to Kaykov Signage" : "Back"}
            </span>
          </button>
          <div className="flex items-center gap-2.5">
            <img src="/favicon.png" alt="Kaykov Media" className="h-8 w-8 shrink-0" />
            <span className="font-bold text-sm text-gray-900 whitespace-nowrap">AI Sign Generator</span>
          </div>
          <Button variant="cta" size="sm" asChild className="shrink-0 hidden sm:inline-flex">
            <a href="/#contact">Get a Quote</a>
          </Button>
          <div className="w-8 sm:hidden" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-3">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>
      </header>

      {/* Hero explanation — only visible on the first step */}
      {isIntro && (
        <div className="bg-black text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              {/* Copy */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
                  <Sparkles size={13} className="text-accent" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-white/70">Free · No account needed</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                  See Your Sign on Your{" "}
                  <span className="text-accent">Storefront</span>{" "}
                  Before We Build It
                </h1>
                <p className="text-white/65 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Upload a photo of your business, mark where the sign goes, and get a
                  photorealistic AI mockup in seconds — completely free.
                </p>
              </div>

              {/* Steps */}
              <div className="flex-shrink-0 w-full max-w-xs">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3 text-center lg:text-left">How it works</p>
                <div className="space-y-2">
                  {[
                    { icon: Upload,       text: "Upload your storefront photo" },
                    { icon: Paintbrush2,  text: "Paint the sign placement area" },
                    { icon: Wand2,        text: "Pick a style & generate" },
                    { icon: Download,     text: "Download your free mockup" },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/6 border border-white/10 rounded-xl px-4 py-3">
                      <div className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                        <Icon size={13} className="text-accent" />
                      </div>
                      <span className="text-xs text-white/30 font-bold w-4 shrink-0">{i + 1}</span>
                      <span className="text-sm text-white/75">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {stepContent}
      </main>

      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} Kaykov Media · All rights reserved</span>
          <a href="/" className="hover:text-gray-700 transition-colors">kaykovmedia.com</a>
        </div>
      </footer>
    </div>
  )
}
