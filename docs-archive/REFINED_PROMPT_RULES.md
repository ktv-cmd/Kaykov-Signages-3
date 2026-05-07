# Refined Prompt Rules - Concise Version

**Date**: 2026-04-22  
**Purpose**: Simplified core rules for signage rendering

---

## TASK
Render a signage installation inside the Golden Zone.

---

## CORE RULES

### RULE 1: MASK (ALWAYS APPLY FIRST)
**Do not leave a border.**

**Execution**:
1. Sample the wall texture around the Golden Zone
2. Fill the zone with that wall texture FIRST
3. Place the sign ON TOP of restored texture

**Validation**: 0% golden pixels remaining. All areas either covered by sign OR show restored wall texture.

---

### RULE 2: AWNING MODE (If isAwning = true)

**DO NOT render a 3D box or extrusion.**

**Required**:
- Treat the entire Golden Zone as a **curved fabric surface**
- The graphic is a **"Surface Print"** (like vinyl/ink) warped onto the fabric
- Graphics must **WARP and BEND** to follow fabric curves
- Woven canvas texture visible

**Lighting**:
- If lit: Light glows **THROUGH** the fabric (diffused)
- NOT from a lamp in front of it
- Natural daylight only (no artificial glow)

**Prohibited**:
- ❌ 3D boxes
- ❌ Rigid extrusions
- ❌ Floating cabinets
- ❌ 3D channel letters
- ❌ Flat undistorted graphics

---

### RULE 3: SIGN MODE (If isAwning = false)

**Render a volumetric 3D sign.**

**Required**:
- Extrude **3.5 inches** (89mm) perpendicular to wall
- Each element = **6-faced mesh primitive**
- Return planes (sides of letters) **MUST BE VISIBLE**
- Z-axis depth measurable with parallax

**PBR Materials**:
- Metal returns: Metallic 0.95, Roughness 0.35, Anisotropy 0.6
- Acrylic faces: IOR 1.49, Subsurface scattering

**Validation**: At least one letter's side-wall visible (proves 3D extrusion)

---

## VARIABLE LOGIC

### Input Variables:
```typescript
isAwning: boolean              // true → AWNING MODE, false → SIGN MODE
brandText: string              // e.g., "BISTRO"
brandMode: "logo-only" | "text-only" | "logo-and-text"
textStyling?: {
  color?: string              // e.g., "#1E3A8A" (client HEX)
  fontStyle?: FontStyle       // "modern-sans" | "classic-serif" | "bold-condensed"
}
lightMode: string             // "front" | "back" | "both" | "neon"
mount: string                 // "flush" | "stand-off" | "raceway"
```

### Computed Logic:
```typescript
// Awning detection
isAwning = (reference.id === "awning")

// Mode selection
if (isAwning) {
  → Use RULE 2 (Awning Mode)
  → Disable 3D extrusion
  → Enable fabric surface print
} else {
  → Use RULE 3 (Sign Mode)
  → Enable 3D volumetric mesh
  → Show return planes
}
```

---

## COMPLETE IMPLEMENTATION

### System Instruction Structure:

```
# ROLE
Senior Architectural Signage Visualization Architect

# EXECUTION SEQUENCE

STEP 1: MASK RESTORATION (ALWAYS FIRST)
- Locate Golden Zone (#FFD740 pixels)
- Sample surrounding wall texture (brick/wood/stucco)
- Fill zone with sampled texture (erase all gold)
- Validate: 0% golden pixels remain

STEP 2: MODE SELECTION

IF isAwning = true → AWNING MODE:
  - Create curved fabric surface
  - Apply branding as SURFACE PRINT (warped to fabric)
  - Show woven canvas texture
  - If lit: light glows THROUGH fabric
  - NO 3D boxes, NO rigid extrusions

IF isAwning = false → SIGN MODE:
  - Create volumetric 3D mesh
  - Extrude 3.5 inches perpendicular to wall
  - Show return planes (sides)
  - Apply PBR materials
  - If lit: use specified lighting mode

STEP 3: MOUNTING & INTEGRATION
- Mount constructed object onto restored wall
- Add mounting hardware
- Apply contact shadows (Ambient Occlusion)
- Ensure sign fits within original Golden Zone boundaries
```

---

## CASE DEFINITIONS

### CASE A: LOGO ONLY

**Sign Mode**:
- 3D Cabinet Lightbox mesh
- Custom shape following logo outline
- 3.5" depth, aluminum returns
- Color: Exact HEX from logo image

**Awning Mode**:
- Logo as SURFACE PRINT on fabric
- Warps with fabric curves
- Screen-printed or vinyl-applied appearance

---

### CASE B: NAME ONLY

**Sign Mode**:
- Individual 3D Channel Letters
- Each letter = 6-faced mesh primitive
- 3.5" depth per letter
- Color: Client HEX or auto-select from facade
- Font: Client-specified or complementary

**Awning Mode**:
- Text as SURFACE PRINT on fabric
- Warps with fabric curves
- Screen-printed or vinyl-applied appearance

---

### CASE C: LOGO + NAME

**Sign Mode**:
- Logo: 3D Cabinet Lightbox
- Name: 3D Channel Letters
- Both at 3.5" depth
- Color harmonization (logo HEX → name)

**Awning Mode**:
- Logo + Name as SURFACE PRINTS on fabric
- Both warp with fabric curves
- Unified layout on curved awning

---

## LIGHTING MODES

### Standard Signs (isAwning = false):

**Front-lit**:
- Translucent acrylic faces
- Internal LED modules
- Face glows evenly
- Subsurface scattering

**Back-lit (Halo)**:
- Solid opaque faces
- LED strips on returns
- Light projects on wall BEHIND sign
- Inverse-square falloff

**Both (Combined)**:
- Front-lit + Back-lit simultaneously

**No Light (Neon)**:
- Matte-finished metal
- Sun-cast shadows only
- No emission

### Awnings (isAwning = true):

**All modes → Natural daylight only**:
- NO artificial glow
- NO LED halos
- NO neon effects
- If evening: external gooseneck lamps (not internal)

---

## VALIDATION CHECKLIST

### RULE 1 (Mask):
- [ ] Zero golden pixels (#FFD740) remaining
- [ ] Wall texture continuous and seamless
- [ ] No border outline where mask was

### RULE 2 (Awning Mode):
- [ ] Curved fabric surface (not rigid box)
- [ ] Graphics warp with fabric curves
- [ ] Woven canvas texture visible
- [ ] Natural daylight only
- [ ] No 3D extrusions

### RULE 3 (Sign Mode):
- [ ] 3.5" Z-axis extrusion measurable
- [ ] Return planes (sides) visible
- [ ] PBR materials applied
- [ ] Multi-plane shadows present
- [ ] Volumetric depth evident

---

## PROMPT TEMPLATE

### Minimal Complete Prompt:

```
TASK: Render signage installation in Golden Zone.

RULE 1 - MASK:
Sample wall texture around Golden Zone. Fill zone with texture FIRST. 
Place sign ON TOP. Result: 0% golden pixels.

${isAwning ? `
RULE 2 - AWNING MODE:
- Curved fabric surface (NO 3D boxes)
- Branding = Surface Print warped onto fabric
- Woven canvas texture visible
- Natural daylight only
- Graphics WARP and BEND with fabric curves

CONSTRUCTION:
${brandMode === "logo-only" ? "Logo" : brandMode === "text-only" ? `"${brandText}"` : `Logo + "${brandText}"`} 
as FLAT GRAPHIC PRINT on fabric.
Screen-printed appearance.
Conforms to fabric wrinkles and curves.
` : `
RULE 3 - SIGN MODE:
- Volumetric 3D mesh
- Extrude 3.5 inches perpendicular to wall
- Return planes (sides) MUST BE VISIBLE
- PBR materials: Metallic 0.95, Roughness 0.35

CONSTRUCTION:
${brandMode === "logo-only" ? "3D Cabinet Lightbox (logo shape)" : brandMode === "text-only" ? `3D Channel Letters for "${brandText}"` : `Logo: 3D Cabinet Lightbox + Name: 3D Channel Letters for "${brandText}"`}
Each element = 6-faced mesh primitive.
Show side-walls to prove 3D depth.
`}

IMAGE 1: Storefront with Golden Zone marked
${brandMode !== "text-only" ? "IMAGE 2: Logo artwork" : ""}

LIGHTING: ${lightMode}
MOUNTING: ${mount}
${textStyling?.color ? `COLOR: ${textStyling.color} (NON-NEGOTIABLE)` : "COLOR: Facade-complementary"}
${textStyling?.fontStyle ? `FONT: ${fontStyle}` : ""}

OUTPUT: Photorealistic 16:9 architectural render. 
Sign appears professionally installed with accurate perspective, 
mounting hardware, contact shadows.
```

---

## IMPLEMENTATION IN CODE

### Current Files:

**`lib/ai/provider.ts`** (Line 86-252):
- Contains full `SIGN_SYSTEM_INSTRUCTION`
- 252 lines of detailed rules
- Sent with every Gemini generation

**`lib/ai/variation-planner.ts`** (Line 134-317):
- `buildPrompt()` function
- Dynamically constructs user-facing prompt
- Injects Anti-Box Awning Protocol when `isAwning = true`

### Key Logic:

```typescript
// Awning detection
const isAwning = reference.id === "awning"

// Anti-Box protocol injection
const awningConstraint = isAwning ? [
  `⚠️  ANTI-BOX AWNING PROTOCOL`,
  `1. MASK: Wipe golden area completely`,
  `2. SHAPE: Curved fabric awning (NO 3D BOXES)`,
  `3. BRANDING: FLAT GRAPHIC PRINT (WARP and BEND)`,
  `4. MATERIAL: Woven canvas, natural daylight`,
] : []

// Mode-specific construction
const constructionType = isAwning 
  ? "GRAPHIC PRINT on fabric (warps with curves)"
  : "3D Volumetric Mesh (3.5\" extrusion, visible returns)"
```

---

## SUMMARY

### Three Core Rules:

1. **MASK**: Sample wall → Fill zone → Place sign on top (0% gold)
2. **AWNING MODE** (`isAwning = true`): Curved fabric + Surface print (NO 3D)
3. **SIGN MODE** (`isAwning = false`): 3D mesh + 3.5" extrusion + Visible sides

### Key Variables:

- `isAwning`: Boolean gate (true → Rule 2, false → Rule 3)
- `brandText`: Text content
- `brandMode`: logo-only | text-only | logo-and-text
- `textStyling.color`: Client HEX or auto
- `lightMode`: Lighting type (awning → always natural daylight)

### Validation:

- ✅ Zero golden pixels
- ✅ Awning: Curved fabric, warped graphics, no 3D
- ✅ Sign: 3.5" depth, visible sides, PBR materials

---

**Status**: Concise rules extracted and ready for implementation  
**Files**: See `COMPLETE_PROMPT_SYSTEM.md` for full verbose version
