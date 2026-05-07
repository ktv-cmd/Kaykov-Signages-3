import { create } from "zustand"
import type {
  FlowState, FlowStep, ReferenceStyle, Placement, VariationCount,
  GenerationResult, AdjustmentSettings, TextStyling,
  DoorDetectionResult, SignSizeResult, GenerationProvider,
} from "@/types/flow"

interface FlowStore extends FlowState {
  goToStep: (step: FlowStep) => void
  goNext: () => void
  goBack: () => void

  setStorefront: (file: File, previewUrl: string) => void
  setBrandAsset: (file: File, previewUrl: string) => void
  setBrandText: (text: string) => void
  setTextStyling: (styling: TextStyling) => void
  clearBrandAsset: () => void
  setSelectedReferences: (refs: ReferenceStyle[]) => void
  selectReference: (ref: ReferenceStyle) => void

  setPlacement: (placement: Placement) => void
  setPlacementBrushFile: (file: File | undefined) => void

  setVariationCount: (count: VariationCount) => void
  setSelectedProvider: (provider: GenerationProvider) => void

  setLeadId: (id: string) => void
  setGenerationResult: (result: GenerationResult) => void
  setSelectedCandidate: (id: string) => void
  setAdjustments: (settings: Partial<AdjustmentSettings>) => void
  setDoorDetection: (result: DoorDetectionResult) => void
  setSignSize: (size: SignSizeResult) => void
  setSource: (source: string) => void

  reset: () => void
}

const STEP_ORDER: FlowStep[] = ["upload", "placement", "variations", "generate", "download"]

const DEFAULT_ADJUSTMENTS: AdjustmentSettings = {
  faceColor: "#C0C0C0",
  detailColor: "#1A1A1A",
  lightColor: "#FFFFFF",
  lightIntensity: 70,
  lightingMode: "front",
  timeOfDay: "day",
}

const DEFAULT_PLACEMENT: Placement = {
  centerX: 0.5,
  centerY: 0.22,
  width: 0.68,
  height: 0.14,
  rotation: 0,
  facadeConfidence: 0.85,
}

const initialState: FlowState = {
  currentStep: "upload",
  selectedReferences: [],
  variationCount: 1,
  placement: DEFAULT_PLACEMENT,
}

export const useFlowStore = create<FlowStore>((set, get) => ({
  ...initialState,

  goToStep: (step) => set({ currentStep: step }),

  goNext: () => {
    const { currentStep } = get()
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    let nextStep = STEP_ORDER[currentIndex + 1]
    if (currentStep === "placement") nextStep = "variations"
    if (nextStep === "select") nextStep = "download"
    if (nextStep) set({ currentStep: nextStep })
  },

  goBack: () => {
    const { currentStep } = get()
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    let previousStep = STEP_ORDER[currentIndex - 1]
    if (currentStep === "generate") previousStep = "variations"
    if (previousStep === "select") previousStep = "generate"
    if (previousStep) set({ currentStep: previousStep })
  },

  setStorefront: (file, previewUrl) => set({ storefrontFile: file, storefrontPreviewUrl: previewUrl }),
  setBrandAsset: (file, previewUrl) => set({ brandAssetFile: file, brandAssetPreviewUrl: previewUrl }),
  setBrandText: (text) => {
    const state = get()
    set({ brandText: text, textStyling: state.textStyling || { fontStyle: "modern-sans", color: "#C0C0C0" } })
  },
  setTextStyling: (textStyling) => set({ textStyling }),
  clearBrandAsset: () => set({ brandAssetFile: undefined, brandAssetPreviewUrl: undefined }),
  setSelectedReferences: (refs) => set({ selectedReferences: refs }),
  selectReference: (ref) => set({ selectedReferences: [ref] }),
  setPlacement: (placement) => set({ placement }),
  setPlacementBrushFile: (placementBrushFile) => set({ placementBrushFile }),
  setVariationCount: (variationCount) => set({ variationCount }),
  setSelectedProvider: (selectedProvider) => set({ selectedProvider }),
  setLeadId: (leadId) => set({ leadId }),

  setGenerationResult: (result) => {
    const { variationCount } = get()
    const autoSelected = variationCount === 1 ? result.candidates[0]?.id : undefined
    set({
      generationResult: result,
      selectedCandidateId: autoSelected,
      adjustments: {
        ...DEFAULT_ADJUSTMENTS,
        lightingMode: result.compatibility.allowedLightModes[0] ?? "front",
      },
    })
  },

  setSelectedCandidate: (id) => set({ selectedCandidateId: id }),
  setAdjustments: (settings) =>
    set((state) => ({ adjustments: { ...(state.adjustments ?? DEFAULT_ADJUSTMENTS), ...settings } })),
  setDoorDetection: (doorDetection) => set({ doorDetection }),
  setSignSize: (signSize) => set({ signSize }),
  setSource: (source) => set({ source }),
  reset: () => set(initialState),
}))
