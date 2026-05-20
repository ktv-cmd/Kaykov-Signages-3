export type GenerationProvider =
  | "gemini-2.5"
  | "fal-grok"
  | "fal-flux-kontext"
  | "gemini"
  | "fal"
  | "replicate"
  | "huggingface"

export type VariationCount = 1 | 3 | 6

export interface ReferenceStyle {
  id: string
  name: string
  description: string
  imageUrl: string
  lightingType: "front" | "back" | "both"
  materialFeel: "brushed-metal" | "acrylic" | "neon" | "dimensional" | "flat"
  depthStyle: "flat" | "shallow" | "deep"
  mountingStyle: "flush" | "stand-off" | "raceway"
  hasBackingPlate: boolean
  compatibleLightModes: ("front" | "back" | "both")[]
}

export interface Placement {
  centerX: number
  centerY: number
  width: number
  height: number
  rotation: number
  facadeConfidence: number
}

export interface VariantSpec {
  depthProfile: "flat" | "shallow" | "medium" | "deep"
  edgeProfile: "sharp" | "beveled" | "rounded"
  mountingStyle: "flush" | "stand-off" | "raceway"
  hasBackingPlate: boolean
  materialFeel: string
  lightingMode: "front" | "back" | "both"
  prompt: string
}

export interface Candidate {
  id: string
  variantIndex: number
  imageUrl: string
  spec: VariantSpec
  generatedAt: string
}

export interface AdjustmentSettings {
  faceColor: string
  detailColor: string
  lightColor: string
  lightIntensity: number
  lightingMode: "front" | "back" | "both"
  timeOfDay: "day" | "night"
}

export interface GenerationResult {
  jobId: string
  candidates: Candidate[]
  compatibility: {
    allowedLightModes: ("front" | "back" | "both")[]
  }
}

export type FlowStep = "upload" | "placement" | "variations" | "generate" | "select" | "download" | "adjust"

export type FontStyle = "modern-sans" | "classic-serif" | "bold-condensed"

export interface TextStyling {
  fontStyle: FontStyle
  color: string
}

export interface DoorDetectionResult {
  detected: boolean
  confidence: number
  box?: { x: number; y: number; width: number; height: number }
}

export interface SignSizeResult {
  widthIn: number
  heightIn: number
  method: "door-reference" | "user-input" | "ai-estimate" | "gemini-vision"
  label: string
  confidence?: number
}

export interface FlowState {
  currentStep: FlowStep
  storefrontFile?: File
  storefrontPreviewUrl?: string
  brandAssetFile?: File
  brandAssetPreviewUrl?: string
  brandText?: string
  textStyling?: TextStyling
  selectedReferences: ReferenceStyle[]
  placement?: Placement
  placementBrushFile?: File
  variationCount?: VariationCount
  selectedProvider?: GenerationProvider
  leadId?: string
  generationResult?: GenerationResult
  selectedCandidateId?: string
  adjustments?: AdjustmentSettings
  doorDetection?: DoorDetectionResult
  signSize?: SignSizeResult
  source?: string
}
