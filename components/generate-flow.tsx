"use client"

import { useEffect } from "react"
import { useFlowStore } from "@/lib/flow-store"
import { StepIndicator } from "./step-indicator"
import { StepUpload } from "./steps/step-upload"
import { StepVariations } from "./steps/step-variations"
import { StepGenerate } from "./steps/step-generate"
import { StepSelect } from "./steps/step-select"
import { StepAdjust } from "./steps/step-adjust"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

const STEP_LABELS = {
  upload: "Upload",
  variations: "Variations",
  generate: "Generate",
  select: "Download",
  download: "Download",
  adjust: "Download",
}

interface GenerateFlowProps {
  embedded?: boolean
}

export function GenerateFlow({ embedded = false }: GenerateFlowProps = {}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentStep, variationCount, goBack, setSource } = useFlowStore()

  // Read UTM source from URL on mount and persist to store
  useEffect(() => {
    const utm = searchParams.get("utm_source") ?? searchParams.get("source") ?? "direct"
    setSource(utm)
  }, [searchParams, setSource])

  // Build visible steps (merged select + download into one step)
  const allSteps = ["upload", "variations", "generate", "download"] as const
  const visibleSteps = allSteps

  if (embedded) {
    return (
      <div className="rounded-2xl bg-white shadow-2xl border border-white/20 overflow-hidden">
        <div className="px-4 sm:px-6 pt-6 pb-2 border-b border-gray-100">
          <StepIndicator
            steps={visibleSteps.map((s) => ({ id: s, label: STEP_LABELS[s] }))}
            currentStep={currentStep}
          />
        </div>
        <div className="px-4 sm:px-6 py-6 sm:py-8">
          {currentStep === "upload" && <StepUpload />}
          {currentStep === "variations" && <StepVariations />}
          {currentStep === "generate" && <StepGenerate />}
          {currentStep === "download" && <StepSelect />}
          {currentStep === "select" && <StepSelect />}
          {currentStep === "adjust" && <StepAdjust />}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (currentStep === "upload") {
                router.push("/")
                return
              }
              goBack()
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <Image
              src="/Logo Kaykov Media_C.PNG"
              alt="Kaykov Media"
              width={80}
              height={28}
              className="object-contain brightness-0"
            />
            <span className="font-semibold text-sm text-gray-900">Sign Generator</span>
          </div>
          <div className="w-16" />
        </div>
        <div className="max-w-5xl mx-auto px-6 pb-4">
          <StepIndicator
            steps={visibleSteps.map((s) => ({ id: s, label: STEP_LABELS[s] }))}
            currentStep={currentStep}
          />
        </div>
      </header>

      {/* Step content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {currentStep === "upload" && <StepUpload />}
        {currentStep === "variations" && <StepVariations />}
        {currentStep === "generate" && <StepGenerate />}
        {currentStep === "download" && <StepSelect />}
        {currentStep === "select" && <StepSelect />}
        {currentStep === "adjust" && <StepAdjust />}
      </main>
    </div>
  )
}
