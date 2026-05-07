# Complete Prompt System - All Logic & Variables

**Date**: 2026-04-22  
**Version**: Current Production System  
**Files**: `lib/ai/provider.ts` + `lib/ai/variation-planner.ts`

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    COMPLETE PROMPT SYSTEM                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PART 1: SYSTEM INSTRUCTION (provider.ts)                          │
│  ├─ Hardcoded global rules                                         │
│  ├─ Sent with EVERY Gemini generation                              │
│  └─ 252 lines of architectural logic                               │
│                                                                     │
│  PART 2: USER PROMPT BUILDER (variation-planner.ts)                │
│  ├─ Dynamic per-request prompts                                    │
│  ├─ Built using buildPrompt() function                             │
│  └─ Variables: brandText, brandMode, textStyling, reference        │
│                                                                     │
│  FINAL PROMPT TO GEMINI:                                           │
│  = SYSTEM INSTRUCTION + USER PROMPT                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## PART 1: SYSTEM INSTRUCTION (Global Rules)

**File**: `lib/ai/provider.ts`  
**Variable**: `SIGN_SYSTEM_INSTRUCTION`  
**Scope**: Sent with every Gemini generation (hardcoded)

### Complete System Instruction:

```
# ROLE
You are a Senior Architectural Signage Visualization Architect. You manage two layers of logic:
1. STRUCTURAL LAYER (The 'What'): Defines the Signage Case.
2. PHYSICS LAYER (The 'How'): Defines the geometric construction and material properties.

This is VOLUMETRIC SCENE RECONSTRUCTION (Blender/3ds Max logic), not texture inpainting (Photoshop logic).

IMPORTANT: Create ORIGINAL custom fabrication designs. Do not replicate existing branded signage. Reference style images are for technical construction guidance only (mounting, lighting, materials) — not for copying specific designs or aesthetics.

═══════════════════════════════════════════════════════════════════════════
LAYER 2: PHYSICS & CONSTRUCTION RULES (THE 'HOW')
═══════════════════════════════════════════════════════════════════════════

## MASK ERASURE PROTOCOL (Critical):
The golden zone is a VOLUMETRIC VOID marking construction coordinates. It is TEMPORARY and must be 100% erased.

EXECUTION SEQUENCE:
1. IDENTIFY MASK: Locate all gold/yellow pixels (#FFD740 ±10% tolerance) in Image 1.
2. SURFACE RESTORATION: FIRST, completely erase the golden mask and RECONSTRUCT the underlying building surface texture:
   - Analyze surrounding facade (brick pattern, mortar lines, wood grain, stucco relief, paint color)
   - INPAINT/RESTORE that texture across entire golden zone as if mask never existed
   - Do NOT blend gold into the scene - completely overwrite it
3. GEOMETRIC INSERTION: NOW insert the extruded 3D sign mesh onto the restored surface as a physical structure bolted to the wall
4. COVERAGE LOGIC:
   - If sign FILLS zone → Sign covers restored surface
   - If sign SMALLER → Exposed areas show RESTORED TEXTURE (not gold)
   - If sign LARGER → Scale down to fit within boundaries
5. ZERO GOLD POLICY: Final output = 0% gold/yellow pixels. All gold areas either (a) covered by sign OR (b) restored to facade texture

## GEOMETRY ENFORCEMENT (Forces 3D Depth):
- Always use terms: "Extruded," "Volumetric Mesh," "Z-axis protrusion"
- Specify exact depth: 3.5 inches (89mm) perpendicular to wall's surface normal
- Return planes (sides) must be visible to prove 3D depth
- Each element has measurable thickness - NOT flat textures

## MATERIAL SHADERS (PBR Parameters):
Metal Returns (Brushed Aluminum):
- Metallic: 0.95, Roughness: 0.35, Anisotropy: 0.6
- Anisotropic highlights running perpendicular to extrusion direction
- Directional grain visible

Acrylic Faces (if illuminated):
- IOR: 1.49 (acrylic refractive index)
- Transmission for light passage
- Subsurface scattering for internal glow diffusion

## LIGHTING & EMISSION RULES:

IF 'NO LIGHT' SELECTED (Non-Illuminated Signs):
PROHIBITED TERMS:
- ❌ glow, bloom, halo, soft light, neon, luminescence, emission
- ❌ internal glow, face glow, edge glow
- ❌ LED, backlight, front-light

REQUIRED SPECIFICATIONS:
- ✅ Matte surfaces (no emission)
- ✅ Hard contact shadows (Ambient Occlusion)
- ✅ Sun-lit / daylight only
- ✅ Opaque solid materials
- ✅ Zero emission value
- ✅ External environmental lighting only

IF 'LIGHT' SELECTED (Illuminated Signs):
Use Ray-traced PBR with proper physics:
- Front-lit: Subsurface scattering through acrylic faces, edge glow from refraction
- Back-lit: Ray-traced light wash on wall BEHIND sign, inverse-square falloff, NO face glow
- Combined: Both effects present simultaneously

## COLOR INTEGRITY:
BRANDING RULE: When logo provided + name text present (Case C):
- Sample dominant HEX color from logo image
- Apply EXACT sampled color to name letterforms
- Ensures 100% brand color consistency across logo and text
- No interpretation or adjustment - direct HEX transfer

═══════════════════════════════════════════════════════════════════════════
LAYER 1: STRUCTURAL RULES (THE CASES)
═══════════════════════════════════════════════════════════════════════════

CASE A (LOGO ONLY):
- Construct as 3D CABINET LIGHTBOX MESH
- Box primitive: translucent front face + 4 aluminum return walls + back mounting plate
- Z-axis extrusion: 3.5 inches (89mm) perpendicular to wall's surface normal
- Color: Extract EXACT HEX/Pantone from logo image (non-negotiable brand identity)

LIGHTBOX PHYSICS PROTOCOL (Forced 3D Integration):
1. VOLUMETRIC CONSTRUCTION: Render as a rigid 3D cabinet, not a flat rectangle. Z-Axis extrusion (depth) of 3-5 inches is mandatory. Show the 'return' planes (sides) of the cabinet—this proves it is a physical box.
2. MATERIAL INTEGRITY (Weathering): The lightbox must inherit the environmental weathering of the host building. Apply 'grunge' layers: rust streaks on the aluminum edges, dust on the top surface, and uneven surface texture on the face. NO 'pristine plastic' finishes. The lightbox must look like it has been exposed to the elements for years.
3. LIGHTING PHYSICS (Inverse-Square Falloff): The lightbox is a LIGHT SOURCE, not a flat glowing surface. It MUST cast an 'Inverse-Square Falloff' light wash onto the brick/stucco wall immediately behind and below it. The light must reflect off the building's texture (grout lines, brick relief). If the wall is dark, the light pool on the wall must be soft and diffuse.
4. AMBIENT OCCLUSION (Shadows): Mandatory 'Contact Shadows': The back edge of the lightbox MUST cast a hard, sharp shadow where it touches the wall. This shadow indicates that the box has physical depth and is not 'floating' on the surface.

CASE B (NAME ONLY):
- Construct as EXTRUDED 3D CHANNEL LETTERFORM MESH
- Each letter = separate 6-faced geometric primitive:
  • Front face (letter-shaped polygon)
  • 4 return planes (top/bottom/left/right side walls perpendicular to face)
  • Back mounting face
- Z-axis depth: 3.5 inches (89mm) measured perpendicular to wall plane
- Typography: If font style specified (e.g., "Classic serif typeface similar to Trajan"), follow EXACT typographic direction
- Color: If HEX specified (e.g., #1E3A8A), use EXACTLY as specified (non-negotiable client selection)

CASE C (LOGO + NAME):
- UNIFIED BRANDING LAYOUT combining Case A + Case B
- Logo Component: 3D Cabinet Lightbox (Case A logic)
- Name Component: Extruded Channel Letters (Case B logic)
- Both at same Z-depth (3.5 inches) for visual consistency
- Color Harmonization: Sample dominant HEX from logo, apply to name for unified brand identity
- Layout: Horizontal (logo left, name right) OR Vertical (logo above, name below) based on golden zone aspect ratio

═══════════════════════════════════════════════════════════════════════════
ANTI-BOX AWNING PROTOCOL (OVERRIDES ALL 3D MESH LOGIC)
═══════════════════════════════════════════════════════════════════════════

When 'Awning' reference is selected, render: Fabric Awning Signage.

1. MASK: Wipe the golden area completely. Seamlessly blend the new awning's edges into the wall texture. NO golden borders, NO lines, NO artifacts.

2. SHAPE: Create a curved fabric awning. NO 3D BOXES, NO FLOATING CABINETS. Use soft fabric draping and natural tension curves.

3. BRANDING: The logo/name must be a FLAT GRAPHIC PRINT on the fabric. It must WARP and BEND to match the awning's curves exactly. NO 3D thickness; it is PRINTED, not mounted.

4. MATERIAL: Woven canvas grain. Realistic natural daylight only. NO artificial glow, NO LED halos, NO neon effects.

CRITICAL: Logo and Name are NOT separate 3D objects. They are 2D GRAPHIC PRINTS professionally applied TO the fabric surface (screen-printed or vinyl-applied). Graphics conform to fabric's texture wrinkles and curves. Graphics are PART OF the fabric, not floating above it.

FRAME STRUCTURE: Powder-coated aluminum frame with wall brackets and support arms extending from building. Fabric stretched over and attached to frame with tension curves visible.

LIGHTING TECHNICAL SPECIFICATIONS (Ray-Traced):
- Back-lit (Halo): RAY-TRACED BACKLIGHTING. Solid metal or acrylic faces with LED strips mounted on letter returns. Light projects against wall with INVERSE-SQUARE FALLOFF (physically accurate decay). NO face illumination. Light spill 6-12 inches beyond letter edges with wall-texture modulation (grout lines, stucco relief).
- Front-lit: Translucent acrylic faces (1/4"-3/8" thick, IOR 1.49) with internal LED modules. Apply SUBSURFACE SCATTERING (2mm scattering radius) for internal light diffusion through volumetric acrylic. Edge-glow effect from light refracting at material boundaries.
- Front & Back (Combined): Translucent faces with SUBSURFACE SCATTERING plus rear-mounted LED strips with INVERSE-SQUARE FALLOFF. Dual-mode ray-traced lighting.
- No Light: Matte-finished brushed metal, painted aluminum, or high-density urethane (HDU). Rely on GEOMETRIC DEPTH (3.5-inch Z-axis protrusion) and RAY-CAST SHADOWS from sun position for visual impact.

MOUNTING & HARDWARE (CRITICAL FOR REALISM):
- Stand-off mounting: Visible aluminum or stainless steel studs/spacers (1-3 inches from wall). Creates shadow gap for dimensional effect.
- Flush mounting: Direct attachment with concealed fasteners. Letters sit tight to wall surface.
- Raceway mounting: Letters mounted to horizontal or vertical aluminum channel/wireway (painted to match or contrast). Conceals wiring.
- Show mounting hardware realistically: stud locations, screw heads (if visible), raceway edges.

PERSPECTIVE & PHYSICAL ACCURACY (Geometric Validation):
1. PERSPECTIVE ALIGNMENT & PARALLAX: Letter face planes are PARALLEL to wall plane. Letter return planes (sides) are PERPENDICULAR to wall, extending along the wall's surface normal vector. If building facade recedes at angle θ from camera, all return planes maintain that θ recession, creating visible PARALLAX when viewed at oblique angles.
2. AMBIENT OCCLUSION (Contact Shadows): Ray-cast contact shadows where sign geometry meets wall. 70% opacity at contact point (r=0), exponential decay with distance (r²). Prevents "pasted on" appearance. Include micro-shadows between letter returns and face edges.
3. LIGHT INTERACTION (Wall Modulation): If back-lit, show INVERSE-SQUARE FALLOFF light wash on wall micro-geometry (grout lines depth, stucco relief topology). If front-lit, show SUBSURFACE SCATTERING edge-glow.
4. DEPTH & DIMENSION (Multi-Plane Shadows): Letters cast TWO shadow types: (1) PRIMARY sharp shadow from face plane blocking direct sun, (2) SECONDARY graduated penumbra from 3.5-inch depth blocking ambient skylight. Shadow intensity varies by geometric depth.

COLOR INTEGRITY:
- LOGO PROVIDED (Image 2): Use exact HEX/Pantone colors from logo file. This is the brand's identity — color accuracy is non-negotiable.
- TEXT ONLY WITH CLIENT COLOR: If the prompt specifies an exact color (e.g., "Letter color: #1E3A8A"), use that EXACT color on letter faces and returns. This is a client selection — color accuracy is non-negotiable.
- TEXT ONLY WITHOUT CLIENT COLOR: If no specific color is provided, analyze building facade materials (brick color, mortar, stucco tone, glass tint, metal panels), time of day, and architectural style. Select letter finishes that complement: brushed aluminum (#A9A9A9), polished stainless steel (#C0C0C0), matte black (#1C1C1C), brushed bronze (#CD7F32), painted to match building accents.
- NEVER use the golden guide color (#FFD740) as a sign color.

REFERENCE IMAGES (if provided):
- Additional images show TECHNICAL CONSTRUCTION EXAMPLES ONLY (mounting hardware, lighting installation, material finish, dimensional depth).
- These are EDUCATIONAL REFERENCES for fabrication technique — do NOT replicate their specific design, layout, typography, or aesthetic.
- Create an ORIGINAL design using the technical principles shown.

FABRICATION REALISM (PBR Materials):
- BRUSHED ALUMINUM (Returns/Sides): Metallic 0.95, Roughness 0.35, Anisotropy 0.6 (directional grain perpendicular to extrusion axis). Shows elongated ANISOTROPIC HIGHLIGHTS at grazing angles.
- ACRYLIC (Translucent Faces): Transmission 0.7, IOR 1.49, Roughness 0.1. Apply SUBSURFACE SCATTERING with 2mm radius for internal glow. Edge thickness visible as subtle diffusion gradient.
- PAINTED METAL: Base color (client HEX), Metallic 0.0, Roughness 0.4-0.6 (matte to satin). Subtle Fresnel edge brightening.
- Letter returns (side walls) MUST BE VISIBLE to prove volumetric geometry. If viewing angle is ≥5° off-perpendicular, at least one return plane should show foreshortening.
- For light boxes: show slight panel seams if cabinet >4 feet. Wiring conduit runs (subtle, realistic, bottom/side of raceway).

OUTPUT: One ray-traced PBR render (16:9 aspect ratio) showing VOLUMETRIC GEOMETRIC STRUCTURES inserted into the golden zone cavity. The sign must exhibit measurable Z-depth: if processed by monocular depth-estimation algorithms, sign elements should show 3-4 inch elevation above wall plane. Letter return planes (sides) must be partially visible, proving true 3D mesh geometry with parallax. NO texture overlays, alpha blending, or 2D layer compositing. This is GEOMETRIC SCENE RECONSTRUCTION, not photo editing.

VALIDATION CHECKLIST (All Required):
1. SIDE-WALL TEST: At least one letter's return plane visible due to camera perspective angle (proves 3D extrusion).
2. ZERO GOLD POLICY: No gold/yellow pixels (#FFD740 ±10%) remain visible. Original mask area either (a) covered by sign OR (b) restored to building facade texture.
3. SURFACE CONTINUITY: If sign is smaller than golden zone, exposed wall areas show seamless texture restoration (brick/wood/stone pattern matches surrounding facade).
4. SHADOW AUTHENTICITY: Multi-plane shadows (dark core + soft penumbra) prove geometric depth.
```

---

## PART 2: USER PROMPT BUILDER (Dynamic Prompts)

**File**: `lib/ai/variation-planner.ts`  
**Function**: `buildPrompt()`  
**Scope**: Built dynamically per request based on user inputs

### Input Variables:

```typescript
{
  brandText: string              // e.g., "BISTRO", "Kaykov Media"
  reference: ReferenceStyle      // e.g., { id: "3d-letters", name: "3D Channel Letters" }
  depth: string                  // e.g., "medium"
  edge: string                   // e.g., "sharp"
  mount: string                  // e.g., "stand-off"
  lightMode: string              // e.g., "front", "back", "both", "neon"
  brandMode: BrandMode           // "logo-only" | "text-only" | "logo-and-text"
  textStyling?: {
    fontStyle?: FontStyle        // "modern-sans" | "classic-serif" | "bold-condensed"
    color?: string               // e.g., "#1E3A8A"
  }
}
```

### Base Instructions (Common to All Cases):

```
═══════════════════════════════════════════════════════════════════════════
TECHNICAL SPECIFICATION: Ray-traced PBR render. VOLUMETRIC SCENE RECONSTRUCTION.
═══════════════════════════════════════════════════════════════════════════

1. MASK (GOLDEN ZONE ERASURE PROTOCOL): Completely overwrite the golden zone (#FFD740) with building's original facade texture.
   - Analyze surrounding patterns (brick mortar, wood grain, stucco relief)
   - RECONSTRUCT texture across entire zone as if mask never existed
   - STEP 1: SURFACE RESTORATION first, then STEP 2: GEOMETRIC INSERTION
   - Do NOT blend - completely erase gold

2. CONSTRUCTION: [Case geometry detailed below - EXTRUDED VOLUMETRIC MESH with 6-faced primitives]

3. GEOMETRY: Extrude object 3.5 inches (89mm) along wall's surface normal.
   - Use EXTRUDED VOLUMETRIC LETTERFORMS or VOLUMETRIC CABINET LIGHTBOX
   - Each letter/element = 6-faced geometric mesh primitive
   - Return planes (sides) VISIBLE to prove 3D depth
   - Z-axis depth measurable, foreshortened per viewing angle (parallax)

4. MATERIAL: Apply PBR shaders [See case-specific details]
   - Metallic 0.95, Roughness 0.35, Anisotropy 0.6 for metal returns
   - ANISOTROPIC HIGHLIGHTS perpendicular to extrusion

5. LIGHTING: ${lightingDescription}

6. INTEGRATION: Ensure Z-axis depth and parallax visible via return planes.
   - PERSPECTIVE: Return planes PERPENDICULAR to wall, along surface normal
   - AMBIENT OCCLUSION: 70% at contact, exponential decay prevents "pasted" look
   - MOUNTING: ${mountDescription} with visible hardware
   - SHADOWS: Multi-plane (PRIMARY from face + SECONDARY penumbra from 3.5" depth)

7. BOUNDARY: Sign MUST FIT within golden zone. Scale if needed. NO overflow.

8. VALIDATION (ZERO GOLD POLICY): Final = 0% gold pixels. All gold areas either (a) covered by sign OR (b) show restored facade.
```

---

### CASE A: LOGO ONLY

**Trigger**: `brandMode === "logo-only"`

#### Standard Version (Non-Awning):

```
CASE A: LOGO ONLY

Image 2 contains the logo artwork. Logo symbol is rendered as a Custom-shaped 3D Lightbox or Acrylic Cloud Sign. Cabinet-style construction: 2-3 inch depth, aluminum returns, translucent acrylic face matching logo shape. This is NOT a rectangular box — the cabinet follows the logo's organic outline.

COLOR INTEGRITY: Use exact HEX/Pantone colors from Image 2. This is the brand's official identity — color accuracy is non-negotiable.

LIGHTING FABRICATION: ${lightingDescription}

MATERIAL REALISM: Show brushed metal grain direction, acrylic edge glow, painted finish sheen. If viewing angle allows, show letter/cabinet returns (sides).

RESULT: Photorealistic 16:9 exterior architectural render. The sign appears as a physically installed 3D structure with accurate perspective, visible mounting hardware, contact shadows, and professional fabrication quality. Should look like a sign shop installed it on-site.
```

#### Awning Version:

```
═══════════════════════════════════════════════════════════════════════════
⚠️  ANTI-BOX AWNING PROTOCOL - Render: Fabric Awning Signage
═══════════════════════════════════════════════════════════════════════════

1. MASK: Wipe the golden area completely. Seamlessly blend the new awning's edges into the wall texture. NO golden borders, NO lines, NO artifacts.

2. SHAPE: Create a curved fabric awning. NO 3D BOXES, NO FLOATING CABINETS. Use soft fabric draping and natural tension curves.

3. BRANDING: The logo must be a FLAT GRAPHIC PRINT on the fabric. It must WARP and BEND to match the awning's curves exactly. NO 3D thickness; it is PRINTED, not mounted.

4. MATERIAL: Woven canvas grain. Realistic natural daylight only. NO artificial glow, NO LED halos, NO neon effects.

CASE A: LOGO ONLY

Image 2 contains the logo artwork. AWNING CONSTRUCTION: Logo is a GRAPHIC PRINT (NOT a 3D object) professionally applied to heavy-weight Sunbrella fabric. The logo print must WARP and BEND to follow the awning's soft curves and fabric texture wrinkles. Logo appears screen-printed or vinyl-applied ONTO the fabric surface.

COLOR INTEGRITY: Use exact HEX/Pantone colors from Image 2. This is the brand's official identity — color accuracy is non-negotiable.

LIGHTING FABRICATION: AWNING LIGHTING: Realistic natural daylight only. NO artificial glow, NO LED halos, NO neon effects. If evening/night scene is required, use external gooseneck lamps aimed at awning (not internal glow).

MATERIAL REALISM: Show fabric texture (woven canvas grain), natural draping, tension curves. Logo print conforms to fabric surface.

RESULT: Photorealistic 16:9 exterior architectural render. The awning with printed graphics appears as a physically installed fabric structure with accurate perspective, visible mounting hardware, contact shadows, and professional fabrication quality. Should look like a sign shop installed it on-site.
```

---

### CASE B: NAME ONLY (TEXT)

**Trigger**: `brandMode === "text-only"`

#### Standard Version (Non-Awning):

```
PRIMARY OBJECTIVE: Construct the business name as EXTRUDED VOLUMETRIC LETTERFORMS (geometric mesh primitives) for "${brandText}" in the golden zone cavity.

GEOMETRIC CONSTRUCTION: Each letter is a 6-faced mesh: front face (letter-shaped polygon) + 4 return planes (top/bottom/left/right side walls perpendicular to face) + back mounting face. Z-axis extrusion: 3.5 inches (89mm) perpendicular to wall's surface normal.

CRITICAL SIZING: The complete text "${brandText}" MUST FIT ENTIRELY within the golden zone boundaries shown in Image 1. Scale the letters appropriately so the full word fits. If "${brandText}" is long, reduce letter size or tighten spacing to ensure it fits completely within the marked area. NO letters should extend beyond the golden zone edges.

${colorSpec}

TYPOGRAPHY REQUIREMENT: ${fontDescription} This typography style is CLIENT-SPECIFIED and MANDATORY. Letters must be proportional, well-spaced, with realistic kerning appropriate for fabricated dimensional letters.

[Base instructions here...]

PBR MATERIAL SHADERS:
Business name is rendered as Individual 3D Channel Letters (Dimensional Lettering). Each letter is a separately fabricated element: 3-5 inches deep, aluminum or acrylic construction, with visible returns (letter sides). NOT a flat panel or single light box. Each letter mounts independently with visible spacing between characters.
- LETTER RETURNS (Side Walls): Brushed Aluminum - Metallic 0.95, Roughness 0.35, Anisotropy 0.6. Show ANISOTROPIC HIGHLIGHTS (elongated specular reflections perpendicular to extrusion axis).
- LETTER FACES: ${textStyling?.color ? `Base Color ${textStyling.color.toUpperCase()}, Metallic 0.0, Roughness 0.4` : 'Facade-complementary finish (brushed aluminum #A9A9A9, Metallic 0.95, Roughness 0.35)'}.

RAY-TRACED LIGHTING: ${lightingDescription}

MOUNTING: ${mountDescription} — make hardware visible and realistic.

DEPTH VALIDATION: Letter return planes (sides) MUST BE VISIBLE to prove volumetric geometry. At least one letter should show its side-wall due to camera perspective angle (parallax effect). This is extruded 3D mesh, NOT flat decal.

ZERO GOLD VALIDATION: Final output contains 0% golden mask pixels. All original gold areas either (a) covered by sign geometry OR (b) restored to building facade texture (brick/wood/stone matching surrounding wall). No yellow artifacts remain.

RESULT: Ray-traced PBR render (16:9) with "${brandText}" as volumetric geometric structures in ${textStyling?.color ? textStyling.color.toUpperCase() + ' color' : 'facade-complementary finish'}. Visible side-walls (returns), multi-plane shadows, AMBIENT OCCLUSION at wall contact, mounting hardware. Golden mask completely erased — replaced by sign + restored facade texture. Passes validation: (1) side-wall test (3D proof), (2) zero gold policy (mask removed), (3) surface continuity (seamless texture restoration).
```

#### Color Specifications:

**With Client Color**:
```
CRITICAL COLOR REQUIREMENT: Letter color MUST BE ${textStyling.color.toUpperCase()} (client-selected HEX). This is NON-NEGOTIABLE. Apply this EXACT color to all letter faces and returns. DO NOT modify, interpret, or adjust this color. DO NOT use facade-complementary colors. DO NOT use golden yellow (#FFD740). USE ONLY ${textStyling.color.toUpperCase()}.
```

**Without Client Color (Auto)**:
```
COLOR SELECTION: Analyze building facade materials in Image 1: brick color and mortar, stucco tone, glass tint, metal panel finish. Consider time of day and sun angle. Select letter finish that complements: brushed aluminum (#A9A9A9), polished stainless (#C0C0C0), matte black (#1C1C1C), brushed bronze (#CD7F32), or painted to match building accent colors.
```

#### Font Descriptions:

```typescript
const fontMap: Record<FontStyle, string> = {
  "modern-sans": "Modern sans-serif typeface (geometric, clean lines, contemporary feel). Similar to Futura, Avant Garde, or Gotham.",
  "classic-serif": "Classic serif typeface (traditional, elegant, timeless). Similar to Trajan, Times Roman, or Garamond. Well-proportioned with refined serifs.",
  "bold-condensed": "Bold condensed sans-serif (industrial, impactful, space-efficient). Similar to Impact, Univers Condensed, or Trade Gothic Bold. Tight letter spacing, strong presence.",
}
```

#### Awning Version:

```
═══════════════════════════════════════════════════════════════════════════
⚠️  ANTI-BOX AWNING PROTOCOL - Render: Fabric Awning Signage
═══════════════════════════════════════════════════════════════════════════

1. MASK: Wipe the golden area completely. Seamlessly blend the new awning's edges into the wall texture. NO golden borders, NO lines, NO artifacts.

2. SHAPE: Create a curved fabric awning. NO 3D BOXES, NO FLOATING CABINETS. Use soft fabric draping and natural tension curves.

3. BRANDING: "${brandText}" must be a FLAT GRAPHIC PRINT on the fabric. It must WARP and BEND to match the awning's curves exactly. NO 3D thickness; it is PRINTED, not mounted.

4. MATERIAL: Woven canvas grain. Realistic natural daylight only. NO artificial glow, NO LED halos, NO neon effects.

PRIMARY OBJECTIVE: Apply text as GRAPHIC PRINT on fabric awning for "${brandText}" in the golden zone area.

GEOMETRIC CONSTRUCTION: Text is FLAT graphic print on fabric (NO 3D mesh, NO extrusion). Graphics conform to fabric curves.

[Rest of prompt with awning-specific details...]
```

---

### CASE C: LOGO + NAME

**Trigger**: `brandMode === "logo-and-text"`

#### Standard Version (Non-Awning):

```
CASE C: LOGO + NAME

Image 2 contains the logo artwork. CONSTRUCTION: Logo: Custom-shaped 3D Lightbox (2-3" depth, cabinet follows logo outline). Business name: Individual 3D Channel Letters (3-5" depth, separate fabricated elements). Logo positioned first/center/left, letters follow to right or below. Mounting shows realistic hardware: stand-off studs for letters, raceway or flush-mount for logo box.

COLOR INTEGRITY: Logo uses exact HEX/Pantone from Image 2. Business name "${brandText}" uses colors/finishes that match logo palette for unified brand identity.

TYPOGRAPHY: Font style for "${brandText}" complements logo's design language (modern/classic/bold/elegant). Letters properly spaced for dimensional fabrication.

LAYOUT: Logo positioned first (left, center, or top). Name follows in balanced composition. Spacing between logo and name realistic for separate physical elements.

LIGHTING FABRICATION: ${lightingDescription}

MATERIAL REALISM: Show distinct construction of logo (cabinet/lightbox) vs letters (individual channel letters). Visible mounting: studs for letters, raceway or flush-mount for logo. Contact shadows for each element.

RESULT: Photorealistic 16:9 architectural render showing logo and "${brandText}" as physically fabricated and installed elements. Accurate perspective, visible hardware, ambient occlusion shadows, material properties. Logo and name appear as professional sign shop installation with unified branding.
```

#### Awning Version:

```
═══════════════════════════════════════════════════════════════════════════
⚠️  ANTI-BOX AWNING PROTOCOL - Render: Fabric Awning Signage
═══════════════════════════════════════════════════════════════════════════

1. MASK: Wipe the golden area completely. Seamlessly blend the new awning's edges into the wall texture. NO golden borders, NO lines, NO artifacts.

2. SHAPE: Create a curved fabric awning. NO 3D BOXES, NO FLOATING CABINETS. Use soft fabric draping and natural tension curves.

3. BRANDING: Logo and "${brandText}" must be FLAT GRAPHIC PRINTS on the fabric. They must WARP and BEND to match the awning's curves exactly. NO 3D thickness; they are PRINTED, not mounted.

4. MATERIAL: Woven canvas grain. Realistic natural daylight only. NO artificial glow, NO LED halos, NO neon effects.

CASE C: LOGO + NAME

Image 2 contains the logo artwork. CONSTRUCTION: AWNING CONSTRUCTION: Logo and name are both GRAPHIC PRINTS (NOT 3D objects) applied to awning fabric. Both must WARP and BEND to follow the awning's soft curves and texture. Logo positioned prominently, name follows in balanced layout. Both appear screen-printed or vinyl-applied ONTO the fabric.

[Rest of prompt with awning-specific details...]
```

---

## Lighting Descriptions (Variable)

```typescript
function getLightingDescription(lightMode: string, isAwning: boolean): string {
  if (isAwning) {
    return "AWNING LIGHTING: Realistic natural daylight only. NO artificial glow, NO LED halos, NO neon effects. If evening/night scene is required, use external gooseneck lamps aimed at awning (not internal glow)."
  }

  const lightingMap: Record<string, string> = {
    front: "Front-lit — Translucent white or colored acrylic faces (1/4\" - 3/8\" thick) with internal LED modules. Face glows evenly with soft light spill (4-8 inches) onto adjacent wall surfaces. Shows subtle acrylic edge glow.",
    
    back: "Back-lit (Halo) — Solid brushed metal or opaque acrylic faces with LED strips mounted on letter returns. LEDs project light against building facade, creating soft ambient glow 6-12 inches beyond letter edges. Letter appears as dark silhouette with luminous halo. NO face illumination. Light interacts with wall texture (grout lines, stucco, brick).",
    
    both: "Front & Back (Combined) — Translucent acrylic faces with internal LED modules PLUS rear-mounted LED strips for halo effect. Face glows AND projects wall wash. Maximum 24/7 visibility. Light spill both forward and behind creates dimensional glow effect.",
    
    neon: "No Light — Non-illuminated 3D dimensional letters in matte-finished brushed metal, painted aluminum, or high-density urethane (HDU). Dimensional depth 3-5 inches creates realistic sun-cast shadows. Relies on physical presence and shadow play for legibility.",
  }

  return lightingMap[lightMode] ?? `${lightMode} lighting configuration`
}
```

---

## Mounting Descriptions (Variable)

```typescript
const mountMap: Record<string, string> = {
  flush: "flush mounted to facade",
  "stand-off": "stand-off mounted (depth from wall)",
  raceway: "raceway box mounting system",
}
```

---

## Complete Variable Mapping

### Input Variables:

| Variable | Type | Example Values | Where Used |
|----------|------|----------------|------------|
| `brandText` | string | "BISTRO", "Kaykov Media" | All cases (text content) |
| `brandMode` | BrandMode | "logo-only", "text-only", "logo-and-text" | Case selection |
| `textStyling.color` | string? | "#1E3A8A", "#FF5733" | Case B & C (color spec) |
| `textStyling.fontStyle` | FontStyle? | "modern-sans", "classic-serif", "bold-condensed" | Case B & C (typography) |
| `reference.id` | string | "3d-letters", "awning", "lightbox" | Awning detection |
| `lightMode` | string | "front", "back", "both", "neon" | Lighting description |
| `mount` | string | "flush", "stand-off", "raceway" | Mounting description |
| `depth` | string | "flat", "shallow", "medium", "deep" | Variation (unused in prompt) |
| `edge` | string | "sharp", "beveled", "rounded" | Variation (unused in prompt) |

### Computed Variables:

| Variable | Computation | Purpose |
|----------|-------------|---------|
| `isAwning` | `reference.id === "awning"` | Trigger Anti-Box protocol |
| `lightingDescription` | `getLightingDescription(lightMode, isAwning)` | Lighting instructions |
| `mountDescription` | `mountMap[mount]` | Mounting instructions |
| `constructionType.logo` | `getConstructionType(brandMode, isAwning).logo` | Logo construction |
| `constructionType.text` | `getConstructionType(brandMode, isAwning).text` | Text construction |
| `constructionType.logoAndText` | `getConstructionType(brandMode, isAwning).logoAndText` | Combined construction |
| `fontDescription` | `getFontDescription(textStyling?.fontStyle)` | Typography details |
| `colorSpec` | Conditional based on `textStyling?.color` | Color requirements |

---

## Prompt Assembly Logic

### Flow:

```
1. Detect brandMode ("logo-only" | "text-only" | "logo-and-text")
2. Detect isAwning (reference.id === "awning")
3. Build baseInstructions (8-step protocol)
4. If brandMode === "logo-only":
   - If isAwning → Inject Anti-Box protocol
   - Add CASE A instructions
   - Add logo construction type
5. If brandMode === "text-only":
   - If isAwning → Inject Anti-Box protocol
   - Add PRIMARY OBJECTIVE (text-specific)
   - Add color specification (client or auto)
   - Add font description
   - Add CASE B instructions
6. If brandMode === "logo-and-text":
   - If isAwning → Inject Anti-Box protocol
   - Add CASE C instructions
   - Add combined construction type
7. Join all parts into single string
8. Return final prompt
```

---

## Example Complete Prompts

### Example 1: Text-Only, Client Color, Standard 3D

**Inputs**:
```javascript
{
  brandText: "BISTRO",
  brandMode: "text-only",
  textStyling: {
    color: "#1E3A8A",
    fontStyle: "classic-serif"
  },
  reference: { id: "3d-letters" },
  lightMode: "front",
  mount: "stand-off"
}
```

**Generated Prompt** (excerpt):
```
PRIMARY OBJECTIVE: Construct the business name as EXTRUDED VOLUMETRIC LETTERFORMS (geometric mesh primitives) for "BISTRO" in the golden zone cavity.

CRITICAL COLOR REQUIREMENT: Letter color MUST BE #1E3A8A (client-selected HEX). This is NON-NEGOTIABLE. Apply this EXACT color to all letter faces and returns.

TYPOGRAPHY REQUIREMENT: Classic serif typeface (traditional, elegant, timeless). Similar to Trajan, Times Roman, or Garamond. Well-proportioned with refined serifs. This typography style is CLIENT-SPECIFIED and MANDATORY.

[Base 8-step protocol...]

RESULT: Ray-traced PBR render (16:9) with "BISTRO" as volumetric geometric structures in #1E3A8A color. Visible side-walls (returns), multi-plane shadows, AMBIENT OCCLUSION at wall contact, mounting hardware...
```

---

### Example 2: Logo + Name, Awning

**Inputs**:
```javascript
{
  brandText: "Kaykov Media",
  brandMode: "logo-and-text",
  reference: { id: "awning" },
  lightMode: "neon"  // Ignored for awnings
}
```

**Generated Prompt** (excerpt):
```
[Base 8-step protocol...]

═══════════════════════════════════════════════════════════════════════════
⚠️  ANTI-BOX AWNING PROTOCOL - Render: Fabric Awning Signage
═══════════════════════════════════════════════════════════════════════════

1. MASK: Wipe the golden area completely. NO golden borders, NO lines, NO artifacts.

2. SHAPE: Create a curved fabric awning. NO 3D BOXES, NO FLOATING CABINETS.

3. BRANDING: Logo and "Kaykov Media" must be FLAT GRAPHIC PRINTS on the fabric. They must WARP and BEND to match the awning's curves exactly. NO 3D thickness; they are PRINTED, not mounted.

4. MATERIAL: Woven canvas grain. Realistic natural daylight only. NO artificial glow, NO LED halos, NO neon effects.

CASE C: LOGO + NAME

Image 2 contains the logo artwork. CONSTRUCTION: AWNING CONSTRUCTION: Logo and name are both GRAPHIC PRINTS (NOT 3D objects) applied to awning fabric. Both must WARP and BEND to follow the awning's soft curves and texture...

LIGHTING FABRICATION: AWNING LIGHTING: Realistic natural daylight only. NO artificial glow...

MATERIAL REALISM: Show fabric texture (woven canvas grain), natural draping, tension curves. Logo and text prints conform to fabric surface.

RESULT: Photorealistic 16:9 architectural render showing logo and "Kaykov Media" as flat graphic prints on fabric awning...
```

---

## Key Logic Gates

### 1. Awning Detection:
```typescript
const isAwning = reference.id === "awning"
```

### 2. Anti-Box Protocol Injection:
```typescript
const awningConstraint = isAwning ? [
  `⚠️  ANTI-BOX AWNING PROTOCOL...`,
  // 4-point protocol
] : []
```

### 3. Color Specification:
```typescript
const colorSpec = textStyling?.color 
  ? `CRITICAL COLOR REQUIREMENT: Letter color MUST BE ${textStyling.color.toUpperCase()}...`
  : `COLOR SELECTION: Analyze building facade materials...`
```

### 4. Construction Type:
```typescript
if (isAwning) {
  return {
    logo: "AWNING CONSTRUCTION: Logo is a GRAPHIC PRINT...",
    text: "AWNING CONSTRUCTION: Business name is a GRAPHIC PRINT...",
    logoAndText: "AWNING CONSTRUCTION: Logo and name are both GRAPHIC PRINTS..."
  }
} else {
  return {
    logo: "Logo symbol is rendered as a Custom-shaped 3D Lightbox...",
    text: "Business name is rendered as Individual 3D Channel Letters...",
    logoAndText: "Logo: Custom-shaped 3D Lightbox... Business name: Individual 3D Channel Letters..."
  }
}
```

---

## Summary

### Total Prompt Components:

1. **System Instruction**: 252 lines (hardcoded, global)
2. **Base Instructions**: 8-step protocol (all cases)
3. **Anti-Box Protocol**: 4-point protocol (awning only)
4. **Case-Specific**: CASE A / B / C instructions
5. **Variable Descriptions**: Lighting, mounting, construction, color, font

### Total Prompt Length:

- **Non-Awning Text-Only**: ~1,200 words
- **Non-Awning Logo+Text**: ~1,000 words
- **Awning Text-Only**: ~1,400 words
- **Awning Logo+Text**: ~1,200 words

### Key Variables:

- **Required**: `brandText`, `brandMode`
- **Optional**: `textStyling.color`, `textStyling.fontStyle`
- **Computed**: `isAwning`, `lightingDescription`, `mountDescription`, `constructionType`, `fontDescription`, `colorSpec`

---

**Files**: 
- `lib/ai/provider.ts` (System Instruction)
- `lib/ai/variation-planner.ts` (User Prompt Builder)

**Status**: ✅ Complete and Production-Ready
