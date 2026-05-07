# Comprehensive Prompt Logic & Variable System Guide

**Last Updated**: 2026-04-23  
**Version**: Production v2.0  
**Purpose**: Complete technical reference for prompt generation system

---

## Table of Contents

1. [System Architecture Overview](#system-architecture-overview)
2. [Input Variables](#input-variables)
3. [Computed Variables](#computed-variables)
4. [Case Logic (3 Modes)](#case-logic-3-modes)
5. [Conditional Logic Gates](#conditional-logic-gates)
6. [Prompt Assembly Process](#prompt-assembly-process)
7. [Complete Examples](#complete-examples)
8. [Variable Flow Diagram](#variable-flow-diagram)

---

## System Architecture Overview

### Two-Layer System

```
┌─────────────────────────────────────────────────────────────────┐
│                  COMPLETE PROMPT SYSTEM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LAYER 1: SYSTEM INSTRUCTION (Global Rules)                    │
│  ├─ File: lib/ai/provider.ts                                   │
│  ├─ Variable: SIGN_SYSTEM_INSTRUCTION                          │
│  ├─ Scope: Sent with EVERY generation                          │
│  ├─ Size: 256 lines                                            │
│  └─ Content: Physics rules, case definitions, validation       │
│                                                                 │
│  LAYER 2: USER PROMPT (Dynamic Per-Request)                    │
│  ├─ File: lib/ai/variation-planner.ts                          │
│  ├─ Function: buildPrompt()                                    │
│  ├─ Scope: Built dynamically per request                       │
│  └─ Content: Case-specific instructions + variables            │
│                                                                 │
│  FINAL PROMPT TO GEMINI:                                       │
│  = SYSTEM INSTRUCTION (global) + USER PROMPT (dynamic)         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Request Flow

```
User Input → planVariations() → buildPrompt() → Gemini API
                                       ↓
                            System Instruction (global)
                                       +
                            User Prompt (dynamic)
                                       ↓
                            Generated Sign Image
```

---

## Input Variables

### Core Variables (Always Required)

| Variable | Type | Source | Example Values | Purpose |
|----------|------|--------|----------------|---------|
| `brandText` | string | User input | "BISTRO", "Kaykov Media" | Business name to display |
| `brandMode` | BrandMode | User selection | "logo-only", "text-only", "logo-and-text" | Determines which CASE to use |
| `reference` | ReferenceStyle | User selection | `{ id: "3d-letters", name: "3D Channel Letters" }` | Style reference |

### Optional Variables (User-Provided)

| Variable | Type | Source | Example Values | Purpose |
|----------|------|--------|----------------|---------|
| `textStyling.color` | string? | Color picker | "#1E3A8A", "#FF5733" | Client-selected letter color |
| `textStyling.fontStyle` | FontStyle? | Dropdown | "modern-sans", "classic-serif", "bold-condensed" | Typography style |

### Variation Matrix Variables (Auto-Generated)

| Variable | Type | Source | Possible Values | Purpose |
|----------|------|--------|-----------------|---------|
| `depth` | string | Matrix | "flat", "shallow", "medium", "deep" | Depth profile (unused in prompt) |
| `edge` | string | Matrix | "sharp", "beveled", "rounded" | Edge profile (unused in prompt) |
| `mount` | string | Matrix | "flush", "stand-off", "raceway" | Mounting style |
| `lightMode` | string | Cycle | "front", "back", "both", "neon" | Lighting configuration |

### Reference Object Properties

```typescript
interface ReferenceStyle {
  id: string                    // "3d-letters", "awning", "lightbox"
  name: string                  // Display name
  materialFeel: string          // "brushed-metal", "acrylic", "neon"
  depthStyle: string            // "flat", "shallow", "deep"
  mountingStyle: string         // "flush", "stand-off", "raceway"
  lightingType: string          // "front", "back", "both"
  hasBackingPlate: boolean      // true/false
  compatibleLightModes: string[] // ["front", "back", "both", "neon"]
}
```

---

## Computed Variables

### Computed During buildPrompt()

| Variable | Computation | Type | Purpose |
|----------|-------------|------|---------|
| `isAwning` | `reference.id === "awning"` | boolean | Trigger Anti-Box Awning Protocol |
| `lightingDescription` | `getLightingDescription(lightMode, isAwning)` | string | Full lighting instructions |
| `mountDescription` | `mountMap[mount]` | string | Mounting hardware description |
| `constructionType.logo` | `getConstructionType(brandMode, isAwning).logo` | string | Logo construction method |
| `constructionType.text` | `getConstructionType(brandMode, isAwning).text` | string | Text construction method |
| `constructionType.logoAndText` | `getConstructionType(brandMode, isAwning).logoAndText` | string | Combined construction |
| `fontDescription` | `getFontDescription(textStyling?.fontStyle)` | string | Typography details |
| `colorSpec` | Conditional on `textStyling?.color` | string | Color requirement instructions |

### Variable Computation Functions

#### 1. `getLightingDescription(lightMode, isAwning)`

**Input**: `lightMode` (string), `isAwning` (boolean)  
**Output**: Detailed lighting instructions

**Logic**:
```typescript
if (isAwning) {
  return "AWNING LIGHTING: Realistic natural daylight only. NO artificial glow..."
}

const lightingMap = {
  front: "Front-lit — Translucent acrylic faces...",
  back: "Back-lit (Halo) — Solid metal faces with LED strips...",
  both: "Front & Back (Combined) — Translucent faces + rear LEDs...",
  neon: "No Light — Non-illuminated 3D dimensional letters...",
}

return lightingMap[lightMode]
```

**Example Outputs**:
- `front` → "Front-lit — Translucent white or colored acrylic faces (1/4" - 3/8" thick) with internal LED modules..."
- `back` → "Back-lit (Halo) — Solid brushed metal or opaque acrylic faces with LED strips mounted on letter returns..."
- `neon` → "No Light — Non-illuminated 3D dimensional letters in matte-finished brushed metal..."
- `isAwning=true` → "AWNING LIGHTING: Realistic natural daylight only. NO artificial glow..."

#### 2. `getConstructionType(brandMode, isAwning)`

**Input**: `brandMode` (BrandMode), `isAwning` (boolean)  
**Output**: Object with construction descriptions

**Logic**:
```typescript
if (isAwning) {
  return {
    logo: "AWNING CONSTRUCTION: Logo is a GRAPHIC PRINT...",
    text: "AWNING CONSTRUCTION: Business name is a GRAPHIC PRINT...",
    logoAndText: "AWNING CONSTRUCTION: Logo and name are both GRAPHIC PRINTS..."
  }
}

return {
  logo: "Logo symbol is rendered as a Custom-shaped 3D Lightbox...",
  text: "Business name is rendered as Individual 3D Channel Letters...",
  logoAndText: "Logo: Custom-shaped 3D Lightbox... Business name: Individual 3D Channel Letters..."
}
```

**Example Outputs**:

**Standard (isAwning=false)**:
- `.logo` → "Logo symbol is rendered as a Custom-shaped 3D Lightbox or Acrylic Cloud Sign. Cabinet-style construction: 2-3 inch depth..."
- `.text` → "Business name is rendered as Individual 3D Channel Letters (Dimensional Lettering). Each letter is a separately fabricated element..."
- `.logoAndText` → "Logo: Custom-shaped 3D Lightbox (2-3" depth). Business name: Individual 3D Channel Letters (3-5" depth)..."

**Awning (isAwning=true)**:
- `.logo` → "AWNING CONSTRUCTION: Logo is a GRAPHIC PRINT (NOT a 3D object) professionally applied to heavy-weight Sunbrella fabric..."
- `.text` → "AWNING CONSTRUCTION: Business name is a GRAPHIC PRINT (NOT 3D channel letters)..."
- `.logoAndText` → "AWNING CONSTRUCTION: Logo and name are both GRAPHIC PRINTS (NOT 3D objects)..."

#### 3. `getFontDescription(fontStyle)`

**Input**: `fontStyle` (FontStyle | undefined)  
**Output**: Typography instructions

**Logic**:
```typescript
const fontMap = {
  "modern-sans": "Modern sans-serif typeface (geometric, clean lines). Similar to Futura, Avant Garde, or Gotham.",
  "classic-serif": "Classic serif typeface (traditional, elegant). Similar to Trajan, Times Roman, or Garamond.",
  "bold-condensed": "Bold condensed sans-serif (industrial, impactful). Similar to Impact, Univers Condensed.",
}

return fontStyle ? fontMap[fontStyle] : "Professional signage typeface"
```

**Example Outputs**:
- `"modern-sans"` → "Modern sans-serif typeface (geometric, clean lines, contemporary feel). Similar to Futura, Avant Garde, or Gotham."
- `"classic-serif"` → "Classic serif typeface (traditional, elegant, timeless). Similar to Trajan, Times Roman, or Garamond..."
- `undefined` → "Professional signage typeface appropriate for the selected style"

#### 4. Color Specification Logic

**Input**: `textStyling?.color` (string | undefined)  
**Output**: Color requirement instructions

**Logic**:
```typescript
if (textStyling?.color) {
  return `CRITICAL COLOR REQUIREMENT: Letter color MUST BE ${textStyling.color.toUpperCase()} 
          (client-selected HEX). This is NON-NEGOTIABLE. Apply this EXACT color to all letter 
          faces and returns. DO NOT modify, interpret, or adjust this color.`
}

return `COLOR SELECTION: Analyze building facade materials in Image 1: brick color and mortar, 
        stucco tone, glass tint, metal panel finish. Consider time of day and sun angle. 
        Select letter finish that complements: brushed aluminum (#A9A9A9), polished stainless 
        (#C0C0C0), matte black (#1C1C1C), brushed bronze (#CD7F32)...`
```

**Example Outputs**:
- With color `"#1E3A8A"` → "CRITICAL COLOR REQUIREMENT: Letter color MUST BE #1E3A8A..."
- Without color (undefined) → "COLOR SELECTION: Analyze building facade materials..."

---

## Case Logic (3 Modes)

### CASE A: Logo Only

**Trigger**: `brandMode === "logo-only"`

**Variables Used**:
- ✅ `brandText` - Not used directly (logo is in Image 2)
- ✅ `reference` - Style reference
- ✅ `lightMode` - Lighting type
- ✅ `mount` - Mounting style
- ✅ `isAwning` - Awning detection
- ❌ `textStyling` - Not applicable (no text)

**Prompt Structure**:
```
[Base Instructions - 8 steps]
[Anti-Box Awning Protocol - IF isAwning=true]
CASE A: LOGO ONLY
Image 2 contains the logo artwork. [constructionType.logo]
COLOR INTEGRITY: Use exact HEX/Pantone colors from Image 2...
LIGHTING FABRICATION: [lightingDescription]
MATERIAL REALISM: [awning-specific OR 3D-specific]
RESULT: [Final render description]
```

**Key Logic**:
1. Check `isAwning` → If true, inject Anti-Box Awning Protocol
2. Use `constructionType.logo` (either 3D lightbox OR awning print)
3. Color always from logo image (Image 2)
4. Material realism changes based on `isAwning`

---

### CASE B: Text Only

**Trigger**: `brandMode === "text-only"`

**Variables Used**:
- ✅ `brandText` - Business name to render
- ✅ `reference` - Style reference
- ✅ `lightMode` - Lighting type
- ✅ `mount` - Mounting style
- ✅ `isAwning` - Awning detection
- ✅ `textStyling.color` - Optional client color
- ✅ `textStyling.fontStyle` - Optional font style

**Prompt Structure**:
```
[Anti-Box Awning Protocol - IF isAwning=true]
PRIMARY OBJECTIVE: [Awning OR 3D letterforms] for "[brandText]"...
GEOMETRIC CONSTRUCTION: [Awning print OR 6-faced mesh]
CRITICAL SIZING: Text must fit within golden zone...
[colorSpec - Client color OR auto-selection]
TYPOGRAPHY REQUIREMENT: [fontDescription]...

[Base Instructions - 8 steps]

PBR MATERIAL SHADERS:
[constructionType.text]
- LETTER RETURNS: Brushed Aluminum...
- LETTER FACES: [Client color OR facade-complementary]
RAY-TRACED LIGHTING: [lightingDescription]
MOUNTING: [mountDescription]

DEPTH VALIDATION: Return planes must be visible...
ZERO GOLD VALIDATION: No gold pixels remain...

RESULT: [Final render description with brandText]
```

**Key Logic**:
1. Check `isAwning` → If true, inject Anti-Box Awning Protocol
2. PRIMARY OBJECTIVE placed FIRST (high priority)
3. Color logic: If `textStyling.color` exists → use exact HEX, else → analyze facade
4. Font logic: If `textStyling.fontStyle` exists → use specific font, else → professional default
5. Use `constructionType.text` (either 3D channel letters OR awning print)
6. Critical sizing ensures `brandText` fits within golden zone

---

### CASE C: Logo + Name

**Trigger**: `brandMode === "logo-and-text"`

**Variables Used**:
- ✅ `brandText` - Business name to render
- ✅ `reference` - Style reference
- ✅ `lightMode` - Lighting type
- ✅ `mount` - Mounting style
- ✅ `isAwning` - Awning detection
- ❌ `textStyling.color` - Not used (color from logo)
- ❌ `textStyling.fontStyle` - Not used (complements logo)

**Prompt Structure**:
```
[Base Instructions - 8 steps]
[Anti-Box Awning Protocol - IF isAwning=true]

CASE C: LOGO + NAME
Image 2 contains the logo artwork. CONSTRUCTION: [constructionType.logoAndText]
COLOR INTEGRITY: Logo uses exact HEX from Image 2. Name "[brandText]" matches logo palette...
TYPOGRAPHY: Font style for "[brandText]" complements logo's design language...
LAYOUT: Logo positioned first, name follows in balanced composition...
LIGHTING FABRICATION: [lightingDescription]
MATERIAL REALISM: [awning-specific OR 3D-specific]

RESULT: [Final render description with logo and brandText]
```

**Key Logic**:
1. Check `isAwning` → If true, inject Anti-Box Awning Protocol
2. Use `constructionType.logoAndText` (combines logo + text construction)
3. Color always from logo (Image 2), text matches logo palette
4. Font always complements logo design (not user-specified)
5. Layout: logo first (left/center/top), text follows

---

## Conditional Logic Gates

### Gate 1: Awning Detection

**Condition**: `reference.id === "awning"`  
**Variable**: `isAwning` (boolean)

**Impact**:
- ✅ IF TRUE → Inject Anti-Box Awning Protocol
- ✅ IF TRUE → Use awning construction types (graphic prints)
- ✅ IF TRUE → Force natural daylight lighting (override lightMode)
- ✅ IF TRUE → Material realism = fabric texture
- ❌ IF FALSE → Use standard 3D construction types
- ❌ IF FALSE → Use lightMode as specified
- ❌ IF FALSE → Material realism = metal/acrylic

**Code Location**: `variation-planner.ts`, line 151
```typescript
const isAwning = reference.id === "awning"
```

**Anti-Box Awning Protocol Injection**:
```typescript
const awningConstraint = isAwning ? [
  `⚠️  ANTI-BOX AWNING PROTOCOL - Render: Fabric Awning Signage`,
  `1. SURFACE RECONSTRUCTION: Wipe golden area completely...`,
  `2. GEOMETRY: Create a curved fabric awning. NO 3D BOXES...`,
  `3. GRAPHIC APPLICATION: Apply as 2D flat ink print...`,
  `4. LIGHTING: Natural daylight only. NO glow...`,
  `5. LAYOUT: [Case-specific layout]`,
] : []
```

---

### Gate 2: Color Specification (Text-Only)

**Condition**: `textStyling?.color !== undefined`  
**Applies to**: CASE B (text-only) only

**Impact**:
- ✅ IF TRUE → Use CRITICAL COLOR REQUIREMENT with exact HEX
- ✅ IF TRUE → Non-negotiable client selection
- ✅ IF TRUE → Apply to all letter faces and returns
- ❌ IF FALSE → Use COLOR SELECTION (analyze facade)
- ❌ IF FALSE → Auto-select complementary colors

**Code Location**: `variation-planner.ts`, line 234
```typescript
const colorSpec = textStyling?.color 
  ? `CRITICAL COLOR REQUIREMENT: Letter color MUST BE ${textStyling.color.toUpperCase()}...`
  : `COLOR SELECTION: Analyze building facade materials...`
```

---

### Gate 3: Font Specification (Text-Only)

**Condition**: `textStyling?.fontStyle !== undefined`  
**Applies to**: CASE B (text-only) only

**Impact**:
- ✅ IF TRUE → Use specific font description (modern-sans, classic-serif, bold-condensed)
- ✅ IF TRUE → CLIENT-SPECIFIED and MANDATORY
- ❌ IF FALSE → Use generic "Professional signage typeface"

**Code Location**: `variation-planner.ts`, line 233
```typescript
const fontDescription = getFontDescription(textStyling?.fontStyle)
```

---

### Gate 4: Brand Mode Selection

**Condition**: `brandMode` value  
**Applies to**: All cases

**Impact**:
- `"logo-only"` → Execute CASE A logic
- `"text-only"` → Execute CASE B logic
- `"logo-and-text"` → Execute CASE C logic

**Code Location**: `variation-planner.ts`, lines 199-322
```typescript
if (brandMode === "logo-only") {
  // CASE A logic
}

if (brandMode === "text-only") {
  // CASE B logic
}

// Else: CASE C (logo-and-text)
```

---

## Prompt Assembly Process

### Step-by-Step Assembly

#### Step 1: Initialize Variables
```typescript
const isAwning = reference.id === "awning"
const lightingDescription = getLightingDescription(lightMode, isAwning)
const constructionType = getConstructionType(brandMode, isAwning)
const mountDescription = mountMap[mount] ?? `${mount} mounting`
```

#### Step 2: Build Base Instructions (8-Step Protocol)
```typescript
const baseInstructions = [
  `1. MASK (GOLDEN ZONE ERASURE PROTOCOL): ...`,
  `2. CONSTRUCTION: ...`,
  `3. GEOMETRY: ...`,
  `4. MATERIAL: ...`,
  `5. LIGHTING: ${lightingDescription}`,
  `6. INTEGRATION: ... MOUNTING: ${mountDescription} ...`,
  `7. BOUNDARY: ...`,
  `8. VALIDATION (ZERO GOLD POLICY): ...`,
]
```

#### Step 3: Detect Awning & Build Constraint
```typescript
const awningConstraint = isAwning ? [
  `⚠️  ANTI-BOX AWNING PROTOCOL`,
  `1. SURFACE RECONSTRUCTION: ...`,
  `2. GEOMETRY: Create curved fabric awning...`,
  `3. GRAPHIC APPLICATION: Apply as 2D print...`,
  `4. LIGHTING: Natural daylight only...`,
  `5. LAYOUT: [case-specific]`,
] : []
```

#### Step 4: Route to Case-Specific Logic
```typescript
if (brandMode === "logo-only") {
  return [
    ...baseInstructions,
    ...awningConstraint,
    `CASE A: LOGO ONLY`,
    `Image 2 contains the logo artwork. ${constructionType.logo}`,
    `COLOR INTEGRITY: Use exact HEX/Pantone from Image 2...`,
    // ... rest of CASE A
  ].join(" ")
}

if (brandMode === "text-only") {
  const colorSpec = textStyling?.color ? /* client color */ : /* auto color */
  const fontDescription = getFontDescription(textStyling?.fontStyle)
  
  return [
    ...awningConstraint,
    `PRIMARY OBJECTIVE: ... for "${brandText}"...`,
    colorSpec,
    `TYPOGRAPHY REQUIREMENT: ${fontDescription}...`,
    ...baseInstructions,
    `PBR MATERIAL SHADERS: ${constructionType.text}`,
    // ... rest of CASE B
  ].join(" ")
}

// Else: CASE C
return [
  ...baseInstructions,
  ...awningConstraint,
  `CASE C: LOGO + NAME`,
  `Image 2 contains the logo artwork. ${constructionType.logoAndText}`,
  // ... rest of CASE C
].join(" ")
```

#### Step 5: Join & Return
All prompt parts are joined with spaces to create a single string sent to Gemini.

---

## Complete Examples

### Example 1: Text-Only, Client Color, Standard 3D

**Input Variables**:
```javascript
{
  brandText: "BISTRO",
  brandMode: "text-only",
  textStyling: {
    color: "#1E3A8A",
    fontStyle: "classic-serif"
  },
  reference: { id: "3d-letters", name: "3D Channel Letters" },
  lightMode: "front",
  mount: "stand-off"
}
```

**Computed Variables**:
```javascript
{
  isAwning: false,  // reference.id !== "awning"
  lightingDescription: "Front-lit — Translucent white or colored acrylic faces...",
  mountDescription: "stand-off mounted (depth from wall)",
  constructionType.text: "Business name is rendered as Individual 3D Channel Letters...",
  fontDescription: "Classic serif typeface (traditional, elegant, timeless)...",
  colorSpec: "CRITICAL COLOR REQUIREMENT: Letter color MUST BE #1E3A8A..."
}
```

**Generated Prompt** (abbreviated):
```
PRIMARY OBJECTIVE: Construct the business name as EXTRUDED VOLUMETRIC LETTERFORMS for "BISTRO"...

CRITICAL COLOR REQUIREMENT: Letter color MUST BE #1E3A8A (client-selected HEX). This is NON-NEGOTIABLE...

TYPOGRAPHY REQUIREMENT: Classic serif typeface (traditional, elegant, timeless). Similar to Trajan, Times Roman, or Garamond...

[8-step base instructions]

PBR MATERIAL SHADERS:
Business name is rendered as Individual 3D Channel Letters (Dimensional Lettering)...
- LETTER RETURNS: Brushed Aluminum - Metallic 0.95, Roughness 0.35...
- LETTER FACES: Base Color #1E3A8A, Metallic 0.0, Roughness 0.4

RAY-TRACED LIGHTING: Front-lit — Translucent white or colored acrylic faces (1/4" - 3/8" thick)...

MOUNTING: stand-off mounted (depth from wall) — make hardware visible and realistic.

RESULT: Ray-traced PBR render (16:9) with "BISTRO" as volumetric geometric structures in #1E3A8A color...
```

**Key Logic Applied**:
- ✅ CASE B triggered (`brandMode === "text-only"`)
- ✅ Client color used (`textStyling.color` present)
- ✅ Classic serif font (`textStyling.fontStyle` present)
- ❌ Not awning (`isAwning = false`)
- ✅ Front-lit lighting applied
- ✅ Stand-off mounting specified

---

### Example 2: Logo + Name, Awning, No Light

**Input Variables**:
```javascript
{
  brandText: "Kaykov Media",
  brandMode: "logo-and-text",
  reference: { id: "awning", name: "Awning Sign" },
  lightMode: "neon",  // Will be overridden by awning protocol
  mount: "flush"      // Not applicable for awning
}
```

**Computed Variables**:
```javascript
{
  isAwning: true,  // reference.id === "awning"
  lightingDescription: "AWNING LIGHTING: Realistic natural daylight only. NO artificial glow...",
  mountDescription: "flush mounted to facade",  // Ignored for awning
  constructionType.logoAndText: "AWNING CONSTRUCTION: Logo and name are both GRAPHIC PRINTS...",
  fontDescription: N/A,  // Not used in CASE C
  colorSpec: N/A  // Not used in CASE C
}
```

**Generated Prompt** (abbreviated):
```
[8-step base instructions]

⚠️  ANTI-BOX AWNING PROTOCOL - Render: Fabric Awning Signage

1. SURFACE RECONSTRUCTION: Wipe the golden area completely. Use surrounding facade texture...
2. GEOMETRY: Create a curved fabric awning. ABSOLUTELY NO 3D BOXES...
3. GRAPHIC APPLICATION: Apply the Logo and "Kaykov Media" as 2D flat ink prints...
4. LIGHTING: Use natural daylight only. NO glow, NO neon...
5. LAYOUT: Place the Logo on the left side and the Name on the right side...

CASE C: LOGO + NAME
Image 2 contains the logo artwork. CONSTRUCTION: AWNING CONSTRUCTION: Logo and name are both GRAPHIC PRINTS (NOT 3D objects) applied to awning fabric...

COLOR INTEGRITY: Logo uses exact HEX/Pantone from Image 2. Business name "Kaykov Media" uses colors matching logo palette...

LIGHTING FABRICATION: AWNING LIGHTING: Realistic natural daylight only...

MATERIAL REALISM: Show fabric texture (woven canvas grain), natural draping, tension curves. Logo and text prints conform to fabric surface.

RESULT: Photorealistic 16:9 architectural render showing logo and "Kaykov Media" as flat graphic prints on fabric awning...
```

**Key Logic Applied**:
- ✅ CASE C triggered (`brandMode === "logo-and-text"`)
- ✅ Awning detected (`isAwning = true`)
- ✅ Anti-Box Awning Protocol injected
- ✅ Construction type changed to GRAPHIC PRINTS
- ✅ Lighting overridden to natural daylight (ignores `lightMode: "neon"`)
- ✅ Material realism changed to fabric
- ❌ Mount description ignored (not relevant for awning)

---

### Example 3: Logo Only, Standard Lightbox, Back-Lit

**Input Variables**:
```javascript
{
  brandText: "Coffee Co",  // Not used in CASE A
  brandMode: "logo-only",
  reference: { id: "lightbox", name: "Light Box" },
  lightMode: "back",
  mount: "raceway"
}
```

**Computed Variables**:
```javascript
{
  isAwning: false,
  lightingDescription: "Back-lit (Halo) — Solid brushed metal or opaque acrylic faces...",
  mountDescription: "raceway box mounting system",
  constructionType.logo: "Logo symbol is rendered as a Custom-shaped 3D Lightbox...",
  fontDescription: N/A,  // Not used in CASE A
  colorSpec: N/A  // Not used in CASE A
}
```

**Generated Prompt** (abbreviated):
```
[8-step base instructions]

CASE A: LOGO ONLY
Image 2 contains the logo artwork. Logo symbol is rendered as a Custom-shaped 3D Lightbox or Acrylic Cloud Sign. Cabinet-style construction: 2-3 inch depth, aluminum returns, translucent acrylic face matching logo shape. This is NOT a rectangular box — the cabinet follows the logo's organic outline.

COLOR INTEGRITY: Use exact HEX/Pantone colors from Image 2. This is the brand's official identity — color accuracy is non-negotiable.

LIGHTING FABRICATION: Back-lit (Halo) — Solid brushed metal or opaque acrylic faces with LED strips mounted on letter returns. LEDs project light against building facade, creating soft ambient glow 6-12 inches beyond letter edges...

MATERIAL REALISM: Show brushed metal grain direction, acrylic edge glow, painted finish sheen. If viewing angle allows, show letter/cabinet returns (sides).

RESULT: Photorealistic 16:9 exterior architectural render. The sign appears as a physically installed 3D structure with accurate perspective, visible mounting hardware, contact shadows, and professional fabrication quality...
```

**Key Logic Applied**:
- ✅ CASE A triggered (`brandMode === "logo-only"`)
- ❌ Not awning (`isAwning = false`)
- ✅ 3D Lightbox construction
- ✅ Back-lit (halo) lighting applied
- ✅ Raceway mounting specified
- ✅ Color from logo image (Image 2)
- ❌ `brandText` not used in prompt (logo-only)

---

## Variable Flow Diagram

### Complete Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INPUTS                              │
├─────────────────────────────────────────────────────────────────┤
│ brandText, brandMode, reference, textStyling (optional)         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                   VARIATION MATRIX                              │
├─────────────────────────────────────────────────────────────────┤
│ For each variation (1/3/6):                                     │
│   depth, edge, mount (from matrix)                              │
│   lightMode (cycle through compatibleLightModes)                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                   buildPrompt() ENTRY                           │
├─────────────────────────────────────────────────────────────────┤
│ Receives: brandText, reference, mount, lightMode,               │
│           brandMode, textStyling                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              COMPUTE DERIVED VARIABLES                          │
├─────────────────────────────────────────────────────────────────┤
│ isAwning = reference.id === "awning"                            │
│ lightingDescription = getLightingDescription(lightMode,isAwning)│
│ constructionType = getConstructionType(brandMode, isAwning)     │
│ mountDescription = mountMap[mount]                              │
│ fontDescription = getFontDescription(textStyling?.fontStyle)    │
│ colorSpec = textStyling?.color ? client : auto                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BUILD BASE PARTS                             │
├─────────────────────────────────────────────────────────────────┤
│ baseInstructions (8-step protocol)                              │
│ awningConstraint (if isAwning)                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                   ROUTE TO CASE LOGIC                           │
├─────────────────────────────────────────────────────────────────┤
│ IF brandMode === "logo-only"    → CASE A                        │
│ IF brandMode === "text-only"    → CASE B                        │
│ IF brandMode === "logo-and-text" → CASE C                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ↓                ↓                ↓
    ┌───────┐       ┌───────┐       ┌───────┐
    │CASE A │       │CASE B │       │CASE C │
    │ Logo  │       │ Text  │       │Logo+Name│
    │ Only  │       │ Only  │       │       │
    └───┬───┘       └───┬───┘       └───┬───┘
        │               │               │
        │               │               │
        └───────┬───────┴───────┬───────┘
                │               │
                ↓               ↓
        ┌───────────────────────────┐
        │   ASSEMBLE PROMPT         │
        │   (join all parts)        │
        └───────────┬───────────────┘
                    │
                    ↓
        ┌───────────────────────────┐
        │   RETURN PROMPT STRING    │
        └───────────┬───────────────┘
                    │
                    ↓
        ┌───────────────────────────┐
        │   SENT TO GEMINI API      │
        │   (with system instruction)│
        └───────────────────────────┘
```

---

## Variable Priority Matrix

### Which Variables Matter in Each Case?

| Variable | CASE A (Logo) | CASE B (Text) | CASE C (Logo+Text) |
|----------|---------------|---------------|-------------------|
| `brandText` | ❌ Not used | ✅ Critical | ✅ Critical |
| `brandMode` | ✅ Triggers CASE A | ✅ Triggers CASE B | ✅ Triggers CASE C |
| `reference` | ✅ Awning detection | ✅ Awning detection | ✅ Awning detection |
| `lightMode` | ✅ Lighting description | ✅ Lighting description | ✅ Lighting description |
| `mount` | ✅ Mounting hardware | ✅ Mounting hardware | ✅ Mounting hardware |
| `isAwning` (computed) | ✅ Protocol injection | ✅ Protocol injection | ✅ Protocol injection |
| `textStyling.color` | ❌ Not applicable | ✅ Optional (critical if present) | ❌ Not used (color from logo) |
| `textStyling.fontStyle` | ❌ Not applicable | ✅ Optional (used if present) | ❌ Not used (complements logo) |
| `lightingDescription` (computed) | ✅ Used in prompt | ✅ Used in prompt | ✅ Used in prompt |
| `constructionType` (computed) | ✅ .logo used | ✅ .text used | ✅ .logoAndText used |
| `fontDescription` (computed) | ❌ Not applicable | ✅ Used in prompt | ❌ Not used |
| `colorSpec` (computed) | ❌ Not applicable | ✅ Used in prompt | ❌ Not used |

---

## Quick Reference: Decision Tree

```
START
│
├─ Is reference.id === "awning"?
│  ├─ YES → Set isAwning = true
│  │        → Force natural daylight lighting
│  │        → Use graphic print construction
│  │        → Inject Anti-Box Awning Protocol
│  │
│  └─ NO  → Set isAwning = false
│           → Use specified lightMode
│           → Use 3D mesh construction
│
├─ What is brandMode?
│  │
│  ├─ "logo-only" → CASE A
│  │                 ├─ Use constructionType.logo
│  │                 ├─ Color from Image 2 (logo)
│  │                 ├─ No text styling
│  │                 └─ Logo-focused prompt
│  │
│  ├─ "text-only" → CASE B
│  │                 ├─ Use constructionType.text
│  │                 ├─ Check textStyling.color
│  │                 │   ├─ Present → Use exact HEX
│  │                 │   └─ Absent → Analyze facade
│  │                 ├─ Check textStyling.fontStyle
│  │                 │   ├─ Present → Use specific font
│  │                 │   └─ Absent → Professional default
│  │                 └─ Text-focused prompt with brandText
│  │
│  └─ "logo-and-text" → CASE C
│                       ├─ Use constructionType.logoAndText
│                       ├─ Color from Image 2 (logo)
│                       ├─ Name color matches logo palette
│                       ├─ Font complements logo
│                       └─ Combined prompt with logo + brandText
│
└─ Assemble final prompt:
   1. Base instructions (8 steps)
   2. Awning constraint (if applicable)
   3. Case-specific content
   4. Join all parts
   5. Return string
```

---

## Summary Table: Input → Output

| Input Scenario | Key Variables | Computed Values | Output Prompt Includes |
|---------------|---------------|-----------------|------------------------|
| **Logo, 3D, Front-lit** | `brandMode="logo-only"`, `reference.id="lightbox"`, `lightMode="front"` | `isAwning=false`, `constructionType.logo="3D Lightbox"`, `lightingDescription="Front-lit..."` | Base instructions + CASE A + 3D lightbox construction + front-lit lighting + logo color integrity |
| **Logo, Awning** | `brandMode="logo-only"`, `reference.id="awning"`, `lightMode="neon"` | `isAwning=true`, `constructionType.logo="GRAPHIC PRINT"`, `lightingDescription="natural daylight"` | Base instructions + Anti-Box Protocol + CASE A + graphic print + natural light (overrides neon) |
| **Text, Client Color, Serif** | `brandMode="text-only"`, `textStyling.color="#1E3A8A"`, `textStyling.fontStyle="classic-serif"` | `isAwning=false`, `colorSpec="CRITICAL COLOR..."`, `fontDescription="Classic serif..."` | Primary objective + critical color + serif font + base instructions + CASE B + exact HEX color |
| **Text, Auto Color, No Font** | `brandMode="text-only"`, `textStyling=undefined` | `isAwning=false`, `colorSpec="COLOR SELECTION..."`, `fontDescription="Professional..."` | Primary objective + auto color selection + professional font + base instructions + CASE B + facade analysis |
| **Text, Awning** | `brandMode="text-only"`, `reference.id="awning"`, `brandText="CAFE"` | `isAwning=true`, `constructionType.text="GRAPHIC PRINT"`, `lightingDescription="natural daylight"` | Anti-Box Protocol + primary objective (graphic print) + CASE B + fabric construction + natural light |
| **Logo+Text, 3D, Back-lit** | `brandMode="logo-and-text"`, `brandText="Bistro"`, `lightMode="back"` | `isAwning=false`, `constructionType.logoAndText="Logo: 3D Lightbox... Name: Channel Letters"`, `lightingDescription="Back-lit..."` | Base instructions + CASE C + combined construction + back-lit halo + unified branding |
| **Logo+Text, Awning** | `brandMode="logo-and-text"`, `reference.id="awning"`, `brandText="Shop"` | `isAwning=true`, `constructionType.logoAndText="both GRAPHIC PRINTS"`, `lightingDescription="natural daylight"` | Base instructions + Anti-Box Protocol + CASE C + dual graphic prints + fabric awning + natural light |

---

## Appendix: Code References

### Key Files
- **System Instruction**: `lib/ai/provider.ts` (lines 86-252)
- **Prompt Builder**: `lib/ai/variation-planner.ts` (lines 134-358)

### Key Functions
- `planVariations()` - Entry point (line 15)
- `planDeterministic()` - Variation matrix (line 87)
- `buildPrompt()` - Prompt assembly (line 134)
- `getLightingDescription()` - Lighting logic (line 325)
- `getConstructionType()` - Construction logic (line 340)
- `getFontDescription()` - Font logic (line 29)

### Key Constants
- `DEPTH_PROFILES` - ["flat", "shallow", "medium", "deep"] (line 9)
- `EDGE_PROFILES` - ["sharp", "beveled", "rounded"] (line 10)
- `MOUNTING_STYLES` - ["flush", "stand-off", "raceway"] (line 11)

---

**Document Version**: 2.0  
**Last Updated**: 2026-04-23  
**Completeness**: 100% - All cases, variables, and logic documented  
**Maintenance**: Update when adding new cases, variables, or logic gates
