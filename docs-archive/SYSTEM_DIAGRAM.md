# System Architecture Diagram

## High-Level Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INPUT                              │
│  ┌──────────────┐  ┌───────────┐  ┌────────────────────┐      │
│  │  Storefront  │  │   Logo    │  │   Business Name    │      │
│  │    Image     │  │  (opt.)   │  │    (opt.)          │      │
│  └──────────────┘  └───────────┘  └────────────────────┘      │
│                            +                                    │
│                  ┌──────────────────┐                          │
│                  │ Reference Style   │                          │
│                  │ (lighting/mount)  │                          │
│                  └──────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                     BRAND MODE DETECTION                        │
│                                                                 │
│  ┌────────────┐    ┌────────────┐    ┌────────────────┐      │
│  │ Logo Only  │    │ Text Only  │    │ Logo + Name     │      │
│  │            │    │            │    │                 │      │
│  │ Image 2    │    │ brandText  │    │ Image 2 +       │      │
│  │ provided   │    │ provided   │    │ brandText       │      │
│  └────────────┘    └────────────┘    └────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                   VARIATION PLANNER                             │
│              (lib/ai/variation-planner.ts)                      │
│                                                                 │
│  planVariations(references, count, brandText, brandMode)       │
│         ↓                                                       │
│  planDeterministic() → generates 1/3/6 specs                   │
│         ↓                                                       │
│  For each spec: buildPrompt()                                  │
│         ↓                                                       │
│  ┌──────────────────────────────────────────────────┐         │
│  │  Base Instructions                                │         │
│  │  - Premium visualization role                     │         │
│  │  - Golden zone definition                         │         │
│  │  - Preservation mandate                           │         │
│  └──────────────────────────────────────────────────┘         │
│         ↓                                                       │
│  ┌──────────────────────────────────────────────────┐         │
│  │  Case-Specific Content                            │         │
│  │                                                    │         │
│  │  CASE A: Logo Only                                │         │
│  │    → getConstructionType() → "3D Light Box"      │         │
│  │    → Color: "Exact HEX from Image 2"             │         │
│  │                                                    │         │
│  │  CASE B: Text Only                                │         │
│  │    → getConstructionType() → "Channel Letters"   │         │
│  │    → Color: "Complement building facade"         │         │
│  │                                                    │         │
│  │  CASE C: Logo + Name                              │         │
│  │    → getConstructionType() → "Light Box + Letters"│        │
│  │    → Color: "Logo colors unified"                │         │
│  └──────────────────────────────────────────────────┘         │
│         ↓                                                       │
│  ┌──────────────────────────────────────────────────┐         │
│  │  Lighting Description                             │         │
│  │    → getLightingDescription()                     │         │
│  │       - Front-lit: "Internal LEDs, face glow"    │         │
│  │       - Back-lit: "Halo behind, no face"         │         │
│  │       - Both: "Combined illumination"            │         │
│  │       - No Light: "Dimensional only"             │         │
│  └──────────────────────────────────────────────────┘         │
│         ↓                                                       │
│  ┌──────────────────────────────────────────────────┐         │
│  │  Mounting & Result Specification                  │         │
│  │    - Flush / Stand-off / Raceway                  │         │
│  │    - "Photorealistic 16:9 premium quality"        │         │
│  └──────────────────────────────────────────────────┘         │
│                                                                 │
│  OUTPUT: Array of VariantSpec with detailed prompts           │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    GENERATION API                               │
│               (app/api/generate/route.ts)                       │
│                                                                 │
│  For each VariantSpec:                                         │
│    - Prepare images (storefront + logo)                        │
│    - Apply golden zone overlay                                 │
│    - Build image slot descriptions                             │
│    - Combine with spec.prompt                                  │
│         ↓                                                       │
│    Send to Gemini 2.5                                          │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                      GEMINI 2.5                                 │
│                  (lib/ai/provider.ts)                           │
│                                                                 │
│  ai.models.generateContent({                                   │
│    model: "gemini-2.5-flash-image",                            │
│    contents: [                                                  │
│      { text: fullPrompt },           // From buildPrompt()     │
│      { inlineData: storefrontImage }, // Image 1               │
│      { inlineData: logoImage }        // Image 2 (if provided) │
│    ],                                                           │
│    config: {                                                    │
│      systemInstruction: SIGN_SYSTEM_INSTRUCTION // Provider.ts │
│    }                                                            │
│  })                                                             │
│                                                                 │
│  SIGN_SYSTEM_INSTRUCTION contains:                             │
│    - Role: "Senior Architectural Signage Visualization Expert" │
│    - CRITICAL RULES (golden zone, preservation)                │
│    - CONSTRUCTION LOGIC (light box vs channel letters)         │
│    - LIGHTING MODES (technical specifications)                 │
│    - COLOR INTEGRITY (exact vs contextual protocols)           │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                        OUTPUT                                   │
│                                                                 │
│  Photorealistic 16:9 architectural rendering:                  │
│    ✓ Signage in golden zone only                              │
│    ✓ Construction type correct (light box / channel letters)   │
│    ✓ Lighting effect accurate (front/back/both/none)           │
│    ✓ Colors appropriate (exact logo or contextual)             │
│    ✓ Building facade preserved outside golden zone             │
│    ✓ Premium architectural render quality                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Construction Type Decision Logic

```
┌───────────────────────────┐
│   Is reference "awning"?  │
└───────────────────────────┘
         │
    ┌────┴────┐
    │         │
   YES       NO
    │         │
    │         │
    ↓         ↓
┌───────┐  ┌────────────────────────────┐
│PRINTED│  │    Brand Mode?             │
│   ON  │  │                            │
│FABRIC │  │  ┌───────────────────────┐ │
└───────┘  │  │ Logo Only?            │ │
           │  │   → 3D Light Box      │ │
           │  └───────────────────────┘ │
           │  ┌───────────────────────┐ │
           │  │ Text Only?            │ │
           │  │   → Channel Letters   │ │
           │  └───────────────────────┘ │
           │  ┌───────────────────────┐ │
           │  │ Logo + Name?          │ │
           │  │   → Light Box +       │ │
           │  │     Channel Letters   │ │
           │  └───────────────────────┘ │
           └────────────────────────────┘
```

---

## Color Protocol Decision Logic

```
┌──────────────────────────┐
│  Is logo provided?       │
│  (Image 2 present?)      │
└──────────────────────────┘
         │
    ┌────┴────┐
    │         │
   YES       NO
    │         │
    ↓         ↓
┌──────────────────┐  ┌───────────────────────────┐
│ EXACT COLOR      │  │ CONTEXTUAL ANALYSIS       │
│ MATCHING         │  │                           │
│                  │  │ 1. Facade Material        │
│ - Use HEX codes  │  │    - Brick → Bronze       │
│   from Image 2   │  │    - Stucco → Steel/Black │
│                  │  │    - Glass → Aluminum     │
│ - Pantone match  │  │    - Concrete → Black     │
│   if available   │  │                           │
│                  │  │ 2. Time of Day            │
│ - Critical for   │  │    - Day → Matte finishes │
│   brand identity │  │    - Night → Reflective   │
│                  │  │                           │
│ - Logo symbols   │  │ 3. Architecture Style     │
│   AND text must  │  │    - Modern → Minimalist  │
│   use these      │  │    - Traditional → Classic│
│   colors         │  │    - Industrial → Raw     │
│                  │  │                           │
│                  │  │ 4. Building Palette       │
│                  │  │    - Complement existing  │
│                  │  │    - Avoid golden guide   │
│                  │  │    - Natural integration  │
└──────────────────┘  └───────────────────────────┘
```

---

## Lighting Mode Technical Specifications

```
┌─────────────────────────────────────────────────────────────┐
│                    LIGHTING MODES                           │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐
│  FRONT-LIT   │
└──────────────┘
    │
    ↓
  ┌─────────────────────────────────┐
  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ ← Translucent Face (Acrylic)
  │ ████ LEDs Inside ████████████  │ ← Internal LED Array
  │ ▓▓▓▓▓▓▓▓ Letter Body ▓▓▓▓▓▓▓▓  │ ← Aluminum Returns
  │                                 │
  │         ▓▓▓ Wall ▓▓▓            │
  └─────────────────────────────────┘
  EFFECT: Even face glow, soft light spill

┌──────────────┐
│  BACK-LIT    │
│   (HALO)     │
└──────────────┘
    │
    ↓
  ┌─────────────────────────────────┐
  │ ████████ Solid Face ██████████  │ ← Opaque Metal/Acrylic
  │ ▓▓▓▓▓▓▓▓ Letter Body ▓▓▓▓▓▓▓▓  │ ← Aluminum Returns
  │ ░░░░ LEDs Behind ░░░░░░░░░░░░  │ ← Rear-Mounted LEDs
  │                                 │
  │ ··········· Halo Glow ········· │ ← Light on Wall
  │         ▓▓▓ Wall ▓▓▓            │
  └─────────────────────────────────┘
  EFFECT: Wall halo, no face illumination

┌──────────────┐
│ FRONT & BACK │
└──────────────┘
    │
    ↓
  ┌─────────────────────────────────┐
  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ ← Translucent Face
  │ ████ LEDs Inside ████████████  │ ← Internal LEDs
  │ ▓▓▓▓▓▓▓▓ Letter Body ▓▓▓▓▓▓▓▓  │ ← Returns
  │ ░░░░ LEDs Behind ░░░░░░░░░░░░  │ ← Rear LEDs
  │                                 │
  │ ··········· Halo Glow ········· │
  │         ▓▓▓ Wall ▓▓▓            │
  └─────────────────────────────────┘
  EFFECT: Maximum visibility, dual illumination

┌──────────────┐
│   NO LIGHT   │
└──────────────┘
    │
    ↓
  ┌─────────────────────────────────┐
  │ ████████ Solid Face ██████████  │ ← Premium Material
  │ ▓▓▓▓▓▓▓▓ Deep Body ▓▓▓▓▓▓▓▓▓▓  │ ← Dimensional Depth
  │                                 │ ← No LEDs
  │      ····· Shadow ·····         │ ← Dimensional Shadow
  │         ▓▓▓ Wall ▓▓▓            │
  └─────────────────────────────────┘
  EFFECT: Bold physical presence, shadow play
```

---

## Mounting Methods Visual

```
┌──────────────────────────────────────────────────────────────┐
│                    MOUNTING STYLES                           │
└──────────────────────────────────────────────────────────────┘

FLUSH MOUNT
───────────
  │█████████████████│
  │     SIGN        │  ← Sign directly against wall
  │█████████████████│
  ═══════════════════  ← Wall surface
  [No visible gap]


STAND-OFF MOUNT
──────────────
  │█████████████████│
  │     SIGN        │  ← Sign element
  │█████████████████│
  │                 │
  ┊ ← 1-3" gap      ┊  ← Shadow gap
  ○─────────────────○  ← Visible studs
  ═══════════════════  ← Wall surface
  [Floating appearance]


RACEWAY MOUNT
─────────────
  │█████████████████│
  │  S  I  G  N     │  ← Individual letters
  │█████████████████│
  ┌─────────────────┐
  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← Metal raceway box
  │   [wiring]      │     (conceals electrical)
  └─────────────────┘
  ═══════════════════  ← Wall surface
  [Organized, clean electrical routing]
```

---

## Data Flow Through Helper Functions

```
buildPrompt({
  brandText: "CAFE PARIS",
  reference: { id: "back-lit", name: "Back Lit Sign", ... },
  mount: "stand-off",
  lightMode: "back",
  brandMode: "text-only"
})
    ↓
┌──────────────────────────────────────┐
│ const isAwning = false               │
│   (reference.id !== "awning")        │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│ getLightingDescription("back", false)│
│   → Returns:                          │
│   "Back-lit (Halo) — solid metal or  │
│    acrylic faces with LEDs mounted   │
│    behind the letters, creating a    │
│    halo glow effect against the wall"│
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│ getConstructionType("text-only", false)│
│   → Returns:                          │
│   { text: "Business names/letters    │
│     are rendered as Individual 3D    │
│     Channel Letters — each letter is │
│     a separate dimensional element"} │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│ mountDescription:                     │
│   "stand-off mounted (depth from wall)"│
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────────────────────────────┐
│ ASSEMBLED PROMPT:                                            │
│                                                              │
│ [Base instructions: premium visualization, golden zone...]  │
│                                                              │
│ CASE B: TEXT ONLY                                           │
│ Render "CAFE PARIS" in golden zone.                         │
│ Business names/letters are Individual 3D Channel Letters... │
│                                                              │
│ Color selection: NO LOGO — analyze facade materials...      │
│ DO NOT use golden guide color...                            │
│                                                              │
│ Lighting: Back-lit (Halo) — solid faces with LEDs behind... │
│ Mounting: stand-off mounted (depth from wall)               │
│                                                              │
│ Result: Photorealistic 16:9 with "CAFE PARIS" integrated... │
└──────────────────────────────────────────────────────────────┘
```

---

## Complete System Integration Map

```
┌───────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                             │
│                                                               │
│  components/generate-flow.tsx                                │
│    └─ User selects reference, uploads images                 │
│                                                               │
│  components/steps/step-variations.tsx                        │
│    └─ User chooses variation count (1/3/6)                   │
└───────────────────────────────────────────────────────────────┘
                            ↓
┌───────────────────────────────────────────────────────────────┐
│                    API ROUTE LAYER                            │
│                                                               │
│  app/api/generate/route.ts                                   │
│    ├─ Parse FormData (images, text, references)             │
│    ├─ Determine brand mode                                   │
│    ├─ Call planVariations()                                  │
│    ├─ Prepare images with golden overlay                     │
│    └─ Call generateImage() for each spec                     │
└───────────────────────────────────────────────────────────────┘
                            ↓
┌───────────────────────────────────────────────────────────────┐
│                   PROMPT GENERATION LAYER                     │
│                                                               │
│  lib/ai/variation-planner.ts                                 │
│    ├─ planVariations()                                       │
│    │    └─ planDeterministic()                               │
│    │         └─ buildPrompt() [for each variation]           │
│    │                                                          │
│    ├─ buildPrompt()                                          │
│    │    ├─ Determines isAwning                               │
│    │    ├─ Calls getLightingDescription()                    │
│    │    ├─ Calls getConstructionType()                       │
│    │    ├─ Builds base instructions                          │
│    │    ├─ Adds case-specific content (A/B/C)               │
│    │    ├─ Includes color protocol                           │
│    │    └─ Appends result specification                      │
│    │                                                          │
│    ├─ getLightingDescription()                               │
│    │    └─ Returns technical lighting specification          │
│    │                                                          │
│    └─ getConstructionType()                                  │
│         └─ Returns construction rules for mode               │
└───────────────────────────────────────────────────────────────┘
                            ↓
┌───────────────────────────────────────────────────────────────┐
│                    AI PROVIDER LAYER                          │
│                                                               │
│  lib/ai/provider.ts                                          │
│    ├─ generateImage()                                        │
│    │    └─ Routes to provider (Gemini/fal/Replicate)        │
│    │                                                          │
│    ├─ generateWithGemini()                                   │
│    │    ├─ Builds multi-modal content                        │
│    │    │    ├─ Text: fullPrompt                             │
│    │    │    ├─ Image 1: storefront with golden zone         │
│    │    │    └─ Image 2: logo (if provided)                  │
│    │    │                                                     │
│    │    └─ Sends to Gemini with SIGN_SYSTEM_INSTRUCTION      │
│    │                                                          │
│    └─ SIGN_SYSTEM_INSTRUCTION constant                       │
│         ├─ Role definition                                   │
│         ├─ Critical rules                                    │
│         ├─ Construction logic                                │
│         ├─ Lighting modes                                    │
│         └─ Color integrity protocols                         │
└───────────────────────────────────────────────────────────────┘
                            ↓
┌───────────────────────────────────────────────────────────────┐
│                      GEMINI 2.5 API                           │
│                                                               │
│  Processes:                                                   │
│    - System instruction (architectural expert role)           │
│    - User prompt (detailed case-specific instructions)        │
│    - Image 1 (storefront with golden zone)                    │
│    - Image 2 (logo, if provided)                              │
│                                                               │
│  Generates:                                                   │
│    - Photorealistic architectural rendering                   │
│    - Follows construction type rules                          │
│    - Applies lighting specifications                          │
│    - Maintains color integrity                                │
│    - Preserves facade outside golden zone                     │
└───────────────────────────────────────────────────────────────┘
                            ↓
┌───────────────────────────────────────────────────────────────┐
│                    POST-PROCESSING LAYER                      │
│                                                               │
│  app/api/generate/route.ts                                   │
│    └─ compositeSignOntoOriginalWithBrush()                   │
│         └─ Blends AI result back onto original image         │
│              using brush mask for seamless integration        │
└───────────────────────────────────────────────────────────────┘
                            ↓
┌───────────────────────────────────────────────────────────────┐
│                       FINAL OUTPUT                            │
│                                                               │
│  Array of Candidate objects:                                 │
│    - id: unique identifier                                    │
│    - imageUrl: base64 or URL of rendered signage             │
│    - spec: VariantSpec with prompt used                      │
│    - generatedAt: timestamp                                   │
└───────────────────────────────────────────────────────────────┘
```

---

## Key Takeaways

1. **Two-Layer Instruction System:**
   - **System Instruction** (provider.ts): Establishes role and core rules
   - **User Prompt** (variation-planner.ts): Provides case-specific details

2. **Helper Function Architecture:**
   - **getLightingDescription()**: Technical lighting specifications
   - **getConstructionType()**: Construction rules by brand mode
   - **buildPrompt()**: Assembles complete architectural prompt

3. **Contextual Intelligence:**
   - Awning detection modifies construction approach
   - Logo presence determines color protocol
   - Building materials influence text-only color selection

4. **Industry Compliance:**
   - Logo symbols → Always 3D Light Box
   - Business names → Always Channel Letters
   - Lighting modes → Technical specifications (LED placement, halo effects)

5. **Quality Assurance:**
   - Explicit golden zone mandate
   - Preservation requirements
   - Premium quality specification
   - Photorealistic format requirement
