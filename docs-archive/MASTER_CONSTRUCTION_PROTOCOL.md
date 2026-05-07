# Master Construction Protocol for Gemini
## Architectural Signage Rendering - Complete Logic Audit

**Date**: 2026-04-22  
**Purpose**: Eliminate mask bleed artifacts and enforce proper awning fabric physics  
**Status**: NEW PROTOCOL GENERATED

---

## FAILURE ANALYSIS

### Failure #1: Mask Bleed (The 'Golden Line' Problem)

**Symptom**: 
- Visible border/outline where selection mask was
- Golden edges/halos around sign
- AI treating mask as a frame, not a deletion area

**Root Cause**:
```
Current AI Interpretation (WRONG):
┌─────────────┐
│ [Gold Zone] │  ← Treats as "frame" or "border"
│   [Sign]    │  ← Places sign inside frame
└─────────────┘  ← Border remains visible
      ↓
Golden artifacts remain
```

**Correct Interpretation (NEEDED)**:
```
Step 1: VOID            Step 2: RESTORE         Step 3: MOUNT
┌─────────────┐        ┌─────────────┐        ┌─────────────┐
│ [DELETE]    │  →     │ [Brick]     │  →     │ [Brick]     │
│ [THIS]      │        │ [Pattern]   │        │ ┌─[Sign]─┐ │
└─────────────┘        └─────────────┘        └─┴────────┴─┘
Erase completely       Restore wall           Mount on top
```

---

### Failure #2: Awning Physics Collapse

**Symptom**:
- Rigid 3D box rendered instead of fabric
- Flat rectangular structure
- No curves, no draping, no fabric texture
- Logo/text appear as rigid 3D elements

**Root Cause**:
```
Current AI Path (WRONG):
"Awning" keyword → Still uses 3D mesh construction → Generates rigid box

Needed AI Path (CORRECT):
"Awning" keyword → DISABLE 3D mesh → ENABLE fabric physics → Curved textile surface
```

**Missing Logic**:
- No "Material Physics" distinction between rigid (metal/acrylic) and soft (fabric)
- No explicit "DISABLE 3D BOX" command
- No "WARP/BEND" instruction for graphics on fabric

---

## NEW MASTER CONSTRUCTION PROTOCOL

### PROTOCOL ARCHITECTURE

```
┌─────────────────────────────────────────────────┐
│         MASTER CONSTRUCTION PROTOCOL            │
├─────────────────────────────────────────────────┤
│                                                 │
│  PHASE 1: DESTRUCTIVE MASK PROCESSING           │
│  ├─ Step 1.1: Detect void coordinates          │
│  ├─ Step 1.2: Clear/Restore wall texture       │
│  └─ Step 1.3: Validate zero mask pixels        │
│                                                 │
│  PHASE 2: MATERIAL PHYSICS SELECTION            │
│  ├─ Path A: RIGID PHYSICS (Signs)              │
│  │   └─ Volumetric mesh construction           │
│  └─ Path B: SOFT PHYSICS (Awnings)             │
│      └─ Fabric mesh with textile dynamics      │
│                                                 │
│  PHASE 3: GEOMETRIC MOUNTING                    │
│  └─ Mount constructed object to restored wall   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## PHASE 1: DESTRUCTIVE MASK PROCESSING

### Mathematical Definition

```
M = Mask region (golden zone pixels)
W = Wall texture (underlying facade)
S = Sign object (to be constructed)

STEP 1: VOID DETECTION
  Detect: M = {pixels where color ≈ #FFD740 ±10%}
  
STEP 2: DESTRUCTIVE CLEAR & RESTORE
  For all p ∈ M:
    W'(p) = Inpaint(W, surrounding_texture)
  
  Where:
    W'(p) = Restored wall pixel at position p
    Inpaint() = Texture synthesis from surrounding non-mask region
  
STEP 3: VALIDATION
  Assert: ∀p ∈ M, color(p) ≠ #FFD740
  Assert: W'(M) seamlessly blends with W(boundary(M))
  
  Translation: NO golden pixels remain. Restored texture is continuous.
```

### Prompt Language (Destructive Mask)

```
DESTRUCTIVE MASK PROTOCOL:

The golden zone (#FFD740) in Image 1 is a VOID MARKER, not a frame.

STEP 1: DETECTION
Locate all golden pixels (#FFD740 ±10% tolerance).

STEP 2: ERASE & RECONSTRUCT
BEFORE placing any sign geometry, perform DESTRUCTIVE CLEARING:
- Completely ERASE all golden pixels
- INPAINT the underlying wall texture (brick pattern, mortar lines, wood grain, stucco)
- Use surrounding facade as texture source
- Blend seamlessly so restored area is INDISTINGUISHABLE from original wall
- The golden zone must disappear as if it never existed

STEP 3: VALIDATION CHECKPOINT
Verify: 0% golden pixels remain in working canvas
Verify: Wall texture is continuous (no seams, no borders, no outlines)

ONLY AFTER Steps 1-3 are complete → Proceed to mounting sign geometry.

CRITICAL: The sign mounts ONTO the restored wall, not INSIDE the golden frame.
```

---

## PHASE 2: MATERIAL PHYSICS SELECTION

### Path A: RIGID PHYSICS (Standard Signs)

**When**: Logo-only, Name-only, Logo+Name (NON-awning cases)

**Material State**: SOLID, RIGID, GEOMETRIC
**Construction**: Volumetric mesh with measurable dimensions
**Physics**: Ray-traced PBR for metal/acrylic

```
RIGID PHYSICS PATH:

Material Type: SOLID (metal, acrylic, painted surfaces)
Geometric Model: VOLUMETRIC MESH with fixed dimensions
  - Each element = 6-faced primitive
  - Z-axis depth: 3.5 inches (89mm)
  - Return planes (sides) perpendicular to face

PBR Shaders:
  - Metallic: 0.95, Roughness: 0.35, Anisotropy: 0.6
  - Acrylic IOR: 1.49
  - NO deformation, NO bending, NO warping

Mounting: Bolted to wall with visible hardware (studs, raceways)
```

---

### Path B: SOFT PHYSICS (Awning)

**When**: 'Awning' reference selected

**Material State**: SOFT, FLEXIBLE, TEXTILE
**Construction**: Fabric mesh with curve dynamics
**Physics**: Textile material properties, draping simulation

```
SOFT PHYSICS PATH (AWNING):

╔═══════════════════════════════════════════════════════════════════════════╗
║  MATERIAL PHYSICS OVERRIDE - FABRIC MODE                                  ║
╚═══════════════════════════════════════════════════════════════════════════╝

DISABLE ALL RIGID GEOMETRIC CONSTRUCTION:
❌ Do NOT use: "Volumetric mesh," "Extruded primitives," "6-faced geometry"
❌ Do NOT render: 3D boxes, cabinet lightboxes, rigid channel letters
❌ Do NOT create: Floating rectangles, hard-edged structures

ENABLE FABRIC MESH PHYSICS:
✅ Material Type: TEXTILE (Sunbrella canvas, vinyl)
✅ Geometric Model: CURVED SURFACE MESH (not volumetric solid)
✅ Physics Properties:
   - Flexible, deformable, non-rigid
   - Natural draping under gravity
   - Tension curves where stretched over frame
   - Soft edges, no sharp corners

FRAME STRUCTURE:
✅ Powder-coated aluminum frame (rigid support)
✅ Wall-mounted brackets visible
✅ Support arms extend outward from building
✅ Fabric stretched over and attached to frame

FABRIC CHARACTERISTICS:
✅ Woven canvas texture (visible grain pattern)
✅ Slight texture wrinkles and irregularities
✅ Non-uniform surface (not perfectly flat)
✅ Natural fiber appearance
✅ Thickness: ~3-4mm fabric weight

BRANDING APPLICATION (CRITICAL):
Logo and Name are NOT separate 3D objects.
They are GRAPHIC PRINTS applied TO the fabric substrate.

Mathematical Representation:
  Let F(u,v) = Fabric surface (curved mesh)
  Let G(x,y) = Graphic (logo/text) in 2D space
  
  Result: G'(u,v) = Project(G, F)
  
  Where Project() warps flat graphic onto curved surface.

Translation:
- Graphics BEND and CURVE with fabric surface
- Graphics FOLLOW fabric wrinkles and texture
- Graphics appear screen-printed or vinyl-decal applied
- Graphics are INTEGRATED into fabric, not floating above
- If fabric has fold/wrinkle, graphic distorts accordingly

LIGHTING PHYSICS (If awning is lit):
✅ Internal illumination from UNDERNEATH fabric
✅ Light source: Long-box fluorescent or LED strip inside frame cavity
✅ Light passes THROUGH fabric (fabric as diffuser)
✅ Soft even glow across fabric surface
✅ Visible frame structure at edges

❌ NOT frontal spotlights
❌ NOT external illumination ON the awning
❌ NOT glowing rigid box

SHADOW PHYSICS:
✅ Broad shadow cast by entire awning onto wall behind
✅ Soft shadow edges (fabric blocks light diffusely)
✅ Shadow follows awning curve profile
```

---

## PHASE 3: UNIFIED MASTER PROMPT

### Complete System Instruction (For Gemini)

```
═══════════════════════════════════════════════════════════════════════════
MASTER CONSTRUCTION PROTOCOL v2.0
Senior Architectural Signage Visualization Architect
═══════════════════════════════════════════════════════════════════════════

# PHASE 1: DESTRUCTIVE MASK PROCESSING (MANDATORY FIRST STEP)

The golden zone (#FFD740) in Image 1 is a VOID MARKER for deletion, NOT a frame.

STEP 1.1 - VOID DETECTION:
Locate all golden pixels (#FFD740 with ±10% tolerance).

STEP 1.2 - DESTRUCTIVE CLEAR & RESTORE:
BEFORE constructing any sign geometry, perform DESTRUCTIVE ERASURE:
  a) Completely DELETE all golden pixels from canvas
  b) INPAINT underlying wall texture across entire void area:
     - Sample surrounding facade (brick pattern + mortar, wood grain direction, stucco relief, paint color)
     - Reconstruct texture as if golden mask never existed
     - Ensure seamless blending (no borders, no outlines, no seams)
  c) Validate: Restored wall section is INDISTINGUISHABLE from surrounding facade

STEP 1.3 - VALIDATION CHECKPOINT:
Assert: Count(golden_pixels) = 0
Assert: Texture_continuity(restored_area, surrounding_wall) = seamless

CRITICAL: The restored wall is your NEW CANVAS. The sign will mount ONTO this restored surface.

═══════════════════════════════════════════════════════════════════════════
# PHASE 2: MATERIAL PHYSICS SELECTION
═══════════════════════════════════════════════════════════════════════════

IF reference ≠ "Awning":
  → ACTIVATE: RIGID PHYSICS PATH (Path A)
  → Material: Solid (metal, acrylic)
  → Geometry: Volumetric mesh primitives
  → Construction: 3D extruded structures

IF reference = "Awning":
  → ACTIVATE: SOFT PHYSICS PATH (Path B)
  → Material: Textile (fabric)
  → Geometry: Curved surface mesh
  → Construction: Fabric with printed graphics

---

## PATH A: RIGID PHYSICS (Standard Signage)

MATERIAL STATE: SOLID, RIGID, GEOMETRIC

CASE A (Logo Only):
  Construction: 3D Cabinet Lightbox
  - Box primitive with logo-shaped outline
  - 6 surfaces: front (translucent) + 4 returns (aluminum) + back (mounting)
  - Z-axis: 3.5 inches (89mm)
  
CASE B (Name Only):
  Construction: 3D Extruded Channel Letters
  - Each letter = separate 6-faced mesh
  - Z-axis: 3.5 inches (89mm) per letter
  - Returns visible at viewing angle
  
CASE C (Logo + Name):
  Construction: Combined (Case A + Case B)
  - Logo as cabinet, name as letters
  - Unified depth, harmonized colors

PBR Material Shaders:
  Metal: Metallic 0.95, Roughness 0.35, Anisotropy 0.6
  Acrylic: IOR 1.49, Subsurface scattering

---

## PATH B: SOFT PHYSICS (Awning Override)

MATERIAL STATE: SOFT, FLEXIBLE, TEXTILE

⚠️  CRITICAL OVERRIDE: DISABLE ALL RIGID CONSTRUCTION

FORBIDDEN (Do NOT render):
  ❌ 3D volumetric boxes
  ❌ Cabinet lightboxes
  ❌ Extruded channel letters
  ❌ Rigid geometric primitives
  ❌ Hard edges and sharp corners
  ❌ Metallic/acrylic PBR shaders
  ❌ Frontal illumination ON the awning

REQUIRED (Must render):
  ✅ Physical Fabric Awning Structure
  ✅ Material: Sunbrella canvas or commercial vinyl (textile properties)
  ✅ Geometric Model: CURVED SURFACE MESH (not volumetric solid)

FABRIC PHYSICS:
  Property: Flexibility = HIGH (deformable under tension/gravity)
  Property: Rigidity = ZERO (no hard edges)
  Property: Thickness = 3-4mm (fabric weight, not 3.5 inch extrusion)
  
  Surface Characteristics:
    - Natural draping curves (catenary curves under gravity)
    - Tension curves where stretched over frame
    - Soft rounded edges (no sharp corners)
    - Woven texture visible (canvas grain pattern)
    - Micro-wrinkles and fabric irregularities
    - Non-planar surface (curves in 3D space)

FRAME STRUCTURE (Supporting Awning):
  ✅ Powder-coated aluminum frame (1.5-2 inch diameter tubes)
  ✅ Wall brackets (visible mounting hardware)
  ✅ Support arms extending 3-4 feet from building
  ✅ Fabric attached to frame with grommets or sewn sleeves
  ✅ Frame creates fabric tension (stretched taut)

BRANDING APPLICATION - GRAPHIC PROJECTION (CRITICAL):

Mathematical Model:
  Let F(u,v) = Fabric surface (3D curved mesh)
  Let G(x,y) = Graphic design (logo/text in 2D plane)
  Let T(u,v) = Texture wrinkles on fabric
  
  Result: G'(u,v) = Project(G onto F) × T
  
  Translation:
  1. Graphics are PRINTED/APPLIED to fabric (not floating objects)
  2. Graphics CONFORM to fabric's curved surface F(u,v)
  3. Graphics DISTORT to follow wrinkles T(u,v)
  4. Graphics appear as 2D prints with subtle imperfections

Visual Requirements:
  ✅ Logo/text WARP where fabric curves
  ✅ Logo/text BEND at fabric fold lines
  ✅ Logo/text show fabric grain texture underneath
  ✅ Slight ink absorption into canvas weave
  ✅ Graphics are PART OF fabric surface (not on top layer)
  ✅ If fabric has wrinkle, graphic distorts accordingly

PROHIBITED Graphics:
  ❌ Logo floating as 3D cabinet above fabric
  ❌ Text as 3D channel letters
  ❌ Perfectly flat undistorted graphics (ignore fabric curves)
  ❌ Graphics that don't conform to fabric texture

LIGHTING PHYSICS (If awning is lit):
  Light Source: Internal long-box (fluorescent tube or LED strip)
  Location: UNDERNEATH fabric, inside frame cavity
  Mechanism: Light passes THROUGH fabric (fabric as diffuser)
  
  Result:
    ✅ Soft even glow across entire fabric surface
    ✅ Graphics visible via transmitted light
    ✅ Frame structure silhouette visible at edges
    ✅ Warmer/brighter where fabric is closer to light source
  
  PROHIBITED:
    ❌ Frontal spotlights aimed AT awning
    ❌ External illumination ON fabric surface
    ❌ Glowing rigid box effect

SHADOW PHYSICS:
  ✅ Broad shadow cast by entire awning structure onto wall behind
  ✅ Shadow follows curved awning profile (not rectangular)
  ✅ Soft shadow edges (fabric blocks light diffusely, not sharply)
  ✅ Shadow intensity varies with awning depth/curve

═══════════════════════════════════════════════════════════════════════════
# PHASE 3: GEOMETRIC MOUNTING & INTEGRATION
═══════════════════════════════════════════════════════════════════════════

After Phase 1 (wall restored) and Phase 2 (object constructed):

MOUNTING SEQUENCE:
1. Position constructed object onto restored wall surface
2. Align to wall's surface normal vector
3. Apply contact physics:
   - Ambient Occlusion: 70% opacity at contact point, exponential decay
   - Contact shadows: Multi-plane (primary + penumbra)
4. Add mounting hardware:
   - Path A (Rigid): Bolts, studs, raceways
   - Path B (Soft): Brackets, frame support arms
5. Validate perspective and parallax

BOUNDARY CONSTRAINT:
All geometry must fit within original golden zone coordinates.
If object exceeds zone → Scale down geometry to fit.

FINAL VALIDATION:
✓ Zero golden pixels remain (mask completely erased)
✓ Wall texture continuous (no borders/outlines)
✓ Object appears physically mounted (not floating)
✓ Correct material physics applied (rigid vs soft)
```

---

## COMPLETE MASTER SYSTEM PROMPT

### For Gemini System Instruction

```
You are a Senior Architectural Signage Visualization Architect specializing in physically-accurate rendering.

Your workflow has THREE MANDATORY PHASES:

═══════════════════════════════════════════════════════════════════════════
PHASE 1: DESTRUCTIVE MASK PROCESSING (EXECUTE FIRST)
═══════════════════════════════════════════════════════════════════════════

The golden zone (#FFD740) in Image 1 is a VOID MARKER for deletion.

STEP 1: Detect all golden pixels (#FFD740 ±10%)
STEP 2: DESTRUCTIVE CLEAR - Completely erase golden pixels
STEP 3: INPAINT RESTORATION - Reconstruct underlying wall texture:
  - Sample surrounding facade (brick, wood, stucco patterns)
  - Restore texture across entire void as if mask never existed
  - Blend seamlessly (no borders, no outlines, no golden traces)
STEP 4: VALIDATION - Verify 0% golden pixels, continuous texture

CRITICAL: The restored wall is your NEW CANVAS. Sign mounts ONTO restored surface, not INSIDE golden frame.

═══════════════════════════════════════════════════════════════════════════
PHASE 2: MATERIAL PHYSICS SELECTION
═══════════════════════════════════════════════════════════════════════════

SELECT PHYSICS PATH based on reference type:

── PATH A: RIGID PHYSICS (If NOT awning) ──

Material: SOLID (metal, acrylic, painted surfaces)
Geometry: VOLUMETRIC MESH with fixed dimensions

CASE A - Logo Only:
  • 3D Cabinet Lightbox (box primitive, 3.5" depth)
  • Translucent front + aluminum returns + mounting back

CASE B - Name Only:
  • 3D Extruded Channel Letters (each letter = 6-faced mesh, 3.5" depth)
  • Typography: Client-specified style (exact)
  • Color: Client-specified HEX (exact, non-negotiable)

CASE C - Logo + Name:
  • Combined: Logo as cabinet + Name as letters
  • Same depth (3.5"), harmonized colors

PBR Shaders:
  Metal Returns: Metallic 0.95, Roughness 0.35, Anisotropy 0.6
  Acrylic Faces: IOR 1.49, Subsurface scattering

Lighting Options:
  - Front-lit: Internal LED, face glow, subsurface scattering
  - Back-lit: LED on returns, wall halo, inverse-square falloff
  - No-light: Matte finish, sun-cast shadows only

── PATH B: SOFT PHYSICS (If awning selected) ──

╔═══════════════════════════════════════════════════════════════════════════╗
║  ⚠️  AWNING MODIFIER ACTIVE - DISABLE RIGID CONSTRUCTION                  ║
╚═══════════════════════════════════════════════════════════════════════════╝

Material: TEXTILE (Sunbrella canvas, commercial vinyl)
Geometry: CURVED SURFACE MESH (fabric, not solid volume)

FORBIDDEN (Do NOT render):
  ❌ 3D boxes, cabinets, lightboxes
  ❌ Extruded channel letters  
  ❌ Rigid geometric primitives
  ❌ Volumetric mesh construction
  ❌ Hard edges, sharp corners

REQUIRED (Must render):
  ✅ Physical Fabric Awning:
     - Curved textile surface stretched over aluminum frame
     - Natural draping with tension curves
     - Soft rounded edges
     - Woven canvas texture visible (grain pattern)
     - Fabric thickness: 3-4mm (not 3.5 inch extrusion)
  
  ✅ Aluminum Frame Structure:
     - 1.5-2" diameter support tubes
     - Wall brackets visible
     - Arms extend 3-4 feet from building
     - Fabric attached with grommets
  
  ✅ Branding as GRAPHIC PRINTS:
     
     CRITICAL INSTRUCTION:
     Logo and Name are NOT 3D objects.
     They are 2D GRAPHIC PRINTS applied TO the fabric surface.
     
     Graphics must:
     • WARP to follow fabric's curve
     • BEND at fabric fold lines
     • DISTORT with fabric wrinkles
     • Show fabric texture grain underneath
     • Appear screen-printed or vinyl-applied
     • CONFORM to fabric surface (not floating)
     
     Think: T-shirt print that curves with fabric, NOT sticker on top.
  
  ✅ Lighting (If lit):
     - Internal long-box illumination from UNDERNEATH fabric
     - Light glows THROUGH fabric from inside frame
     - Soft even diffusion
     - NOT frontal spotlights ON awning
  
  ✅ Shadow:
     - Broad shadow from entire awning onto wall
     - Follows curved awning profile
     - Soft edges (fabric diffuses light)

═══════════════════════════════════════════════════════════════════════════
PHASE 3: MOUNTING & INTEGRATION
═══════════════════════════════════════════════════════════════════════════

Mount constructed object (Path A or B) onto restored wall:

1. Positioning: Align to wall's surface normal
2. Contact Physics:
   - Ambient Occlusion at mounting points
   - Multi-plane shadows (primary + penumbra)
3. Hardware:
   - Path A: Bolts/studs/raceways visible
   - Path B: Frame brackets/support arms visible
4. Boundary: Scale to fit within original golden zone coordinates
5. Perspective: Ensure parallax and foreshortening

FINAL VALIDATION:
  ✓ Zero golden pixels (mask erased)
  ✓ No borders/outlines (wall continuous)
  ✓ Correct material physics (rigid vs soft)
  ✓ Proper integration (mounted, not floating)

═══════════════════════════════════════════════════════════════════════════
OUTPUT REQUIREMENTS
═══════════════════════════════════════════════════════════════════════════

Deliver photorealistic architectural render showing:
  • Completely erased golden mask (0% golden pixels)
  • Seamless wall texture restoration
  • Properly constructed signage (Path A rigid OR Path B fabric)
  • Physically accurate mounting and shadows
  • Professional sign shop quality installation
```

---

## TESTING CHECKLIST (Updated)

### For Awning Tests (C6, 4.1, 4.2):

**PASS Criteria**:
- ✅ NO rigid 3D boxes/letters visible
- ✅ Visible fabric texture (woven canvas grain)
- ✅ Soft curved awning shape (not rectangular)
- ✅ Graphics WARP with fabric curves
- ✅ Natural draping visible
- ✅ Aluminum frame structure visible
- ✅ If lit: glow from underneath (not frontal)
- ✅ Broad soft shadow on wall

**FAIL Indicators**:
- ❌ Rigid box structure
- ❌ 3D channel letters
- ❌ Perfectly flat graphics (no warping)
- ❌ Hard edges
- ❌ No fabric texture
- ❌ Graphics floating above surface

### For All Tests:

**PASS Criteria**:
- ✅ Zero golden pixels (#FFD740)
- ✅ No visible borders/outlines where mask was
- ✅ Seamless wall texture restoration
- ✅ No "frame" effect around sign

**FAIL Indicators**:
- ❌ Golden line/border visible
- ❌ Outline where mask edges were
- ❌ Texture discontinuity
- ❌ Sign appears "framed" by golden edges

---

## IMPLEMENTATION INSTRUCTIONS

### Update `lib/ai/provider.ts`:

Replace the AWNING MODIFIER section with Path B logic from above.

### Update `lib/ai/variation-planner.ts`:

For awning cases, inject:
```typescript
⚠️  AWNING MODIFIER ACTIVE - PATH B: SOFT PHYSICS

DISABLE: All rigid volumetric construction
ENABLE: Fabric mesh physics

Graphics are PRINTED ON fabric and WARP with surface curves.
NOT 3D objects. NOT floating elements.

If lit: Internal illumination from UNDERNEATH. NOT frontal.
```

---

## KEY DISTINCTIONS (Mathematical Clarity)

### Signage Object vs Canvas Texture

**SIGNAGE OBJECT (Path A - Rigid)**:
```
Definition: Geometric primitive with measurable volume
Properties:
  - Dimension: Width × Height × Depth(3.5")
  - Faces: 6 per letter/element
  - Material: Solid (metal/acrylic)
  - Deformation: ZERO (rigid structure)
  - Mounting: Bolted perpendicular to wall

Mathematical: Object ⊥ Wall_plane, Depth = 3.5"
```

**CANVAS TEXTURE (Path B - Fabric)**:
```
Definition: Curved 2D surface mesh with applied graphics
Properties:
  - Dimension: Width × Height × Thickness(3-4mm)
  - Surface: Curved, non-planar
  - Material: Textile (flexible)
  - Deformation: HIGH (bends, drapes, wrinkles)
  - Mounting: Frame structure perpendicular, fabric spans frame

Mathematical: 
  Fabric_surface = Curve(u,v) 
  Graphics = Project(2D_image, Fabric_surface)
  NOT: Graphics = Separate_3D_object
```

### Mask vs Frame

**MASK (Correct Interpretation)**:
```
Type: Temporary coordinate marker
Purpose: Define construction area
Lifecycle:
  1. Detect coordinates
  2. ERASE completely
  3. Restore underlying texture
  4. Mount object on restored area
  
Result: Mask = DELETED (0% pixels remain)
```

**FRAME (Incorrect Interpretation - AVOID)**:
```
Type: Permanent border element
Purpose: Visual boundary
Result: Mask remains as visible outline ← THIS IS WRONG
```

**Prompt Language to Enforce**:
```
"The golden zone is a VOID MARKER, not a frame."
"ERASE all golden pixels before construction."
"Restored wall must be INDISTINGUISHABLE from surroundings."
"Sign mounts ONTO restored wall, not INSIDE golden frame."
```

---

## DEPLOYMENT CHECKLIST

Before deploying new protocol:

- [ ] Update PHASE 1 (Destructive Mask) in system instruction
- [ ] Add PATH A / PATH B logic gates in system instruction
- [ ] Update AWNING MODIFIER with FORBIDDEN/REQUIRED lists
- [ ] Add fabric physics specifications (curves, draping, wrinkles)
- [ ] Add graphic projection math (WARP and BEND)
- [ ] Update lighting: internal underneath for awnings
- [ ] Add validation checkpoints after each phase
- [ ] Test with awning reference (should show fabric, not box)
- [ ] Test with non-awning reference (should show 3D rigid)
- [ ] Verify zero golden pixels in both paths

---

## EXPECTED RESULTS AFTER DEPLOYMENT

### Standard Sign (Path A):
- ✅ 3D volumetric structures
- ✅ Visible return planes
- ✅ Zero golden artifacts
- ✅ Seamless wall restoration
- ✅ No border outlines

### Awning (Path B):
- ✅ Curved fabric surface (not box)
- ✅ Graphics warp with fabric
- ✅ Woven texture visible
- ✅ Natural draping
- ✅ If lit: glow from underneath
- ✅ Zero golden artifacts
- ✅ No rigid 3D elements

---

## SUMMARY

**Problem 1 (Golden Line)**: AI treats mask as frame  
**Solution**: 3-step destructive erasure BEFORE construction  

**Problem 2 (Awning Box)**: AI uses rigid 3D construction for fabric  
**Solution**: Material physics path selection (RIGID vs SOFT)  

**New Protocol**:
- PHASE 1: Destructive Mask (erase → restore → validate)
- PHASE 2: Physics Path Selection (rigid OR soft based on reference)
- PHASE 3: Mounting & Integration

**Mathematical Clarity**:
- Mask = Temporary void (erase completely)
- Frame = Permanent border (NEVER render)
- Rigid Object = Volumetric mesh (3D extrusion)
- Fabric Canvas = Curved surface (graphics warp onto it)

**Files to Update**:
- `lib/ai/provider.ts` - System instruction
- `lib/ai/variation-planner.ts` - User prompts

**Status**: ✅ PROTOCOL DESIGNED - Ready for implementation
