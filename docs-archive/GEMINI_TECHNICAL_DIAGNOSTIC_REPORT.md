# Technical Diagnostic Report for Gemini 2.5
## Architectural Signage Rendering Analysis & Optimization

**Report Date**: 2026-04-22  
**Model**: gemini-2.5-flash-image  
**Issue**: "Sticker/Smudge Effect" - 2D appearance instead of true 3D volumetric rendering  
**Goal**: Achieve high-end architectural visualization with authentic dimensional depth

---

## 1. LOGIC AUDIT: Current 3D Translation Strategy

### Current Implementation

#### A. Channel Letters (Individual 3D Elements)
**Current Prompt Language:**
```
"Individual 3D Channel Letters" or "Dimensional Lettering"
Each letter is a separate fabricated element, typically 3-5 inches deep 
with aluminum or acrylic construction.
```

**Depth Specification:**
- ✅ Numeric depth: "3-5 inches deep"
- ✅ Material: "aluminum or acrylic"
- ⚠️ **MISSING**: Thickness specifications (face depth, return width)
- ⚠️ **MISSING**: Explicit "extrude" or "volumetric" geometry language

**Material Shaders:**
- ✅ "brushed metal grain direction"
- ✅ "acrylic edge glow"
- ✅ "painted finish sheen"
- ⚠️ **MISSING**: Roughness/smoothness values
- ⚠️ **MISSING**: Reflectivity coefficients
- ⚠️ **MISSING**: Subsurface scattering (for acrylic)

#### B. Lightboxes (Cabinet-Style 3D)
**Current Prompt Language:**
```
"Custom-shaped 3D Lightboxes" or "Acrylic Cloud Signs" 
with 2-3 inch depth. Cabinet-style construction with aluminum 
returns and translucent faces.
```

**Depth Specification:**
- ✅ Numeric depth: "2-3 inch depth"
- ✅ Construction type: "Cabinet-style"
- ✅ Components: "aluminum returns and translucent faces"
- ⚠️ **MISSING**: Box profile description (flat vs tapered returns)

### Diagnostic Finding #1: Insufficient Geometric Primitives

**Problem**: The prompts describe "what to make" but not "how to construct geometry."

**Current**: "3D Channel Letters with 3-5 inches deep"  
**AI Interprets As**: "Add depth texture/shading to flat letters"

**Needed**: Geometric construction language that forces volumetric thinking:
- "Extruded letterforms" (suggests push/pull geometry)
- "Solid volume with front face + side returns + back face"
- "Box primitives with depth axis perpendicular to wall plane"

---

## 2. MASK INTERPRETATION: Golden Zone Treatment

### Current Implementation

**Current Prompt Language:**
```
Image 1 contains a gold/yellow highlighted area — this is a MASK 
marking pixels to be REMOVED and REPLACED with a 3D physical structure.

This is NOT an overlay. Remove these pixels entirely and generate 
a physically mounted sign in that exact space.
```

**Classification**: ✅ Destructive Replacement (correct approach)

**Strengths:**
- ✅ Explicitly states "REMOVED and REPLACED"
- ✅ States "NOT an overlay"
- ✅ "Remove these pixels entirely"

**Weaknesses:**
- ⚠️ **AMBIGUOUS**: "in that exact space" could mean 2D plane
- ⚠️ **MISSING**: Depth-axis language (z-axis protrusion from wall)
- ⚠️ **MISSING**: Explicit "void/cavity" terminology

### Diagnostic Finding #2: Inpainting vs Reconstruction Confusion

**Problem**: Gemini's image generation models are optimized for **inpainting** (texture blending) not **scene reconstruction** (geometry replacement).

**Current Interpretation:**
```
Golden Zone = "Fill this area with sign-textured pixels"
              (2D texture synthesis)
```

**Desired Interpretation:**
```
Golden Zone = "Carve out this volume, insert 3D geometric structure 
               that protrudes Z inches from wall plane"
              (3D geometric insertion)
```

**Why This Happens:**
- Generative fill models are trained on photo editing (smooth blending)
- They excel at texture continuation, not object construction
- "Remove and replace" is ambiguous - could mean pixel replacement

---

## 3. PERSPECTIVE & LIGHTING STRATEGY

### Current Implementation

#### A. Perspective Alignment
**Current Prompt Language:**
```
PERSPECTIVE ALIGNMENT: Sign must follow the building's vanishing 
points and architectural perspective. If the building facade recedes, 
the sign must follow that angle.
```

**Architectural Terms Used:**
- ✅ "vanishing points"
- ✅ "architectural perspective"
- ✅ "facade recedes"

**Strengths:**
- Correct terminology for perspective matching

**Weaknesses:**
- ⚠️ **VAGUE**: "follow the angle" - which angle? Horizontal? Vertical? Both?
- ⚠️ **MISSING**: One-point vs two-point vs three-point perspective specification
- ⚠️ **MISSING**: Horizon line reference
- ⚠️ **MISSING**: Letter plane orientation (parallel to wall plane)

#### B. Ambient Occlusion
**Current Prompt Language:**
```
AMBIENT OCCLUSION: Render contact shadows where sign elements 
meet the wall. Darker shadow directly behind letters, softening 
with distance. This prevents "pasted on" appearance.
```

**Strengths:**
- ✅ Correct term: "ambient occlusion"
- ✅ Describes gradient: "darker behind, softening with distance"
- ✅ States purpose: "prevents pasted on appearance"

**Weaknesses:**
- ⚠️ **MISSING**: Shadow falloff radius (e.g., "6-12 inch falloff")
- ⚠️ **MISSING**: Occlusion intensity (e.g., "60-80% opacity at contact")
- ⚠️ **MISSING**: Micro-shadows between letter returns and face

#### C. Light Spill / Refractive Behavior
**Current Prompt Language:**
```
Back-lit: Light spills 6-12 inches beyond letter edges creating halo effect.
Front-lit: Face glows evenly with soft light spill onto adjacent wall surfaces.
```

**Strengths:**
- ✅ Numeric spill distance: "6-12 inches"
- ✅ "halo effect" terminology
- ✅ "soft light spill onto adjacent surfaces"

**Weaknesses:**
- ⚠️ **MISSING**: "Refractive" term not used (more precise than "spill")
- ⚠️ **MISSING**: Inverse square law mention (light falloff)
- ⚠️ **MISSING**: Wall texture interaction detail
- ⚠️ **MISSING**: Color temperature of LED light (warm/cool/neutral)

### Diagnostic Finding #3: Perspective Terms Too General

**Problem**: "Follow vanishing points" is correct but too abstract.

**Current**: "Sign must follow the building's vanishing points"  
**AI Interprets As**: "Make sign vaguely match building angle"

**Needed**: Explicit geometric constraints:
```
"Letter faces are parallel to the wall plane. Letter returns 
(sides) are perpendicular to wall, extending outward along 
the wall's surface normal vector. If building facade recedes 
at 5° from camera right, all letter returns must share that 
5° recession angle, maintaining parallel alignment with wall."
```

---

## 4. FAILURE ANALYSIS: "Sticker/Smudge" Root Causes

### Examination of Previous Failed Results

Based on the described failures (logo appearing as "2D sticker or smudge"):

#### Hypothesis A: Texture Synthesis Bias
**Problematic Keywords Currently Used:**
1. ❌ "generative fill logic" (line 89, 97)
   - **Why It Fails**: "Fill" suggests texture infilling, not geometry construction
   - **AI Association**: Photoshop content-aware fill = smooth texture blending

2. ❌ "Replace the golden zone" (line 94)
   - **Why It Fails**: "Replace pixels" vs "Replace volume" - 2D vs 3D
   - **AI Association**: Pixel replacement = texture swapping

3. ❌ "soft light spill" (line 122)
   - **Why It Fails**: "Soft" and "spill" = blur/smudge operations
   - **AI Association**: Gaussian blur, glow effects (2D post-processing)

4. ❌ "Photorealistic" (line 87, 222)
   - **Why It Fails**: Ambiguous - could mean photo texture fidelity
   - **AI Association**: High-res texture mapping, not geometry

#### Hypothesis B: Insufficient Geometry Vocabulary
**Missing Keywords That Force 3D Thinking:**
1. ❌ "Extrude" / "Extrusion"
   - Forces volumetric construction thinking
   - Clear 3D modeling term

2. ❌ "Volumetric" / "Solid Volume"
   - Distinguishes from surface/texture

3. ❌ "Z-depth" / "Z-axis protrusion"
   - Explicit depth-axis language

4. ❌ "Polygon mesh" / "Geometric primitive"
   - 3D modeling vocabulary

5. ❌ "Depth map" / "Parallax"
   - Forces consideration of multi-angle viewing

#### Hypothesis C: Lighting Cues Insufficient for Depth
**Current Lighting Terms:**
- ✅ "ambient occlusion" (good)
- ✅ "contact shadows" (good)
- ⚠️ "sun-cast shadows" (vague)

**Missing Depth Indicators:**
1. ❌ "Shadow projection distance" (how far shadow extends = depth indicator)
2. ❌ "Multi-plane shadow casting" (letter face shadow + return shadow)
3. ❌ "Specular highlights" (different angles for face vs returns)
4. ❌ "Fresnel effect" (edge lighting that reveals geometry)

#### Hypothesis D: Material Description Too Surface-Level
**Current Material Terms:**
- ✅ "brushed metal grain"
- ✅ "acrylic edge glow"

**Missing Depth-Revealing Properties:**
1. ❌ "Anisotropic reflection" (brushed metal reflects differently at angles)
2. ❌ "Subsurface scattering" (acrylic has internal light diffusion)
3. ❌ "Bi-directional reflectance" (how light bounces differ by angle)
4. ❌ "Translucency depth" (thicker acrylic = more diffusion)

### Root Cause Summary

**PRIMARY FAILURE MODE**: The prompt uses **photo-editing vocabulary** (fill, replace, blend) instead of **3D-rendering vocabulary** (extrude, volume, mesh, geometry).

Gemini 2.5's image generation models are:
- ✅ Excellent at: Texture synthesis, style transfer, inpainting
- ❌ Weak at: Geometric construction, volumetric rendering, CAD-like precision

**The prompts inadvertently trigger the wrong neural pathways.**

---

## 5. PROPOSED REFINEMENTS: 3 New Technical "Power-Words"

### Power-Word Set #1: GEOMETRIC CONSTRUCTION LANGUAGE

**Replace:**
```
"3D Channel Letters" with "typically 3-5 inches deep"
```

**With:**
```
"EXTRUDED LETTERFORMS: Each letter is a solid volumetric extrusion 
with three geometric planes:
  - FACE PLANE: Front surface (letter-shaped polygon)
  - RETURN PLANES: Four side walls perpendicular to face (top, bottom, left, right)
  - BACK PLANE: Rear surface parallel to face
  
Total Z-axis depth from wall: 3.5 inches (89mm). The letter volume 
protrudes perpendicular to the wall's surface normal vector."
```

**Why This Works:**
- "Extruded" is 3D modeling vocabulary (Blender, Maya, CAD)
- "Solid volumetric" removes ambiguity about surface vs volume
- "Three geometric planes" forces the AI to consider 6-sided box geometry
- "Z-axis depth" and "surface normal vector" are explicit 3D math terms
- Numeric precision (89mm) signals technical rendering, not artistic interpretation

---

### Power-Word Set #2: DEPTH-MAP & PARALLAX ENFORCEMENT

**Add New Section:**
```
DEPTH RECONSTRUCTION REQUIREMENT:
This is a GEOMETRIC SCENE EDIT, not a texture replacement. 
The golden zone marks a VOLUMETRIC CAVITY where 3D geometry 
must be inserted.

DEPTH-MAP VALIDATION: The result must contain ACTUAL Z-DEPTH 
VARIATION. If viewed from a 15° offset angle, the letter returns 
(sides) would become visible due to PARALLAX. The sign is not 
a flat decal - it is a multi-planar structure with measurable 
depth when analyzed by depth-estimation algorithms.

REQUIRED GEOMETRY: Front-facing surfaces AND side-facing surfaces 
must both be rendered with appropriate foreshortening based on 
camera angle.
```

**Why This Works:**
- "Geometric scene edit" vs "texture replacement" = clear distinction
- "Volumetric cavity" forces 3D thinking (carving out space)
- "Depth-map validation" invokes actual 3D depth buffer concept
- "Parallax" is a pure geometric phenomenon (can't fake with texture)
- "Multi-planar structure" = must render multiple surfaces
- "Depth-estimation algorithms" suggests the output should fool computer vision

---

### Power-Word Set #3: PHYSICALLY-BASED RENDERING (PBR) CONSTRAINTS

**Add New Section:**
```
PHYSICALLY-BASED RENDERING REQUIREMENTS:
Apply PBR material shaders with measured optical properties:

METALLIC SURFACES (Aluminum Channel Letter Returns):
  - Base Color: #A9A9A9 (140, 140, 140 sRGB)
  - Metallic: 0.95 (95% metallic)
  - Roughness: 0.35 (brushed finish)
  - Anisotropy: 0.6 (directional grain at 90° to extrusion axis)
  - Specular Intensity: 0.8
  - Result: Anisotropic highlights running perpendicular to letter edges

ACRYLIC SURFACES (Translucent Letter Faces):
  - Base Color: [Client HEX] at 85% opacity
  - Transmission: 0.7 (70% light transmission)
  - Roughness: 0.1 (smooth polished surface)
  - Subsurface Scattering: 2mm scattering radius
  - IOR (Index of Refraction): 1.49 (acrylic)
  - Result: Internal glow with soft edge diffusion, visible thickness

SHADOW CASTING (Multi-Plane):
  - PRIMARY SHADOW: Letter face blocks sun, casts sharp outline on wall
  - SECONDARY SHADOW: Letter returns create graduated penumbra (1-4 inch fade)
  - AMBIENT OCCLUSION: 70% opacity at wall contact, exponential falloff (r²)
  - SELF-SHADOWING: Letter returns cast micro-shadows on letter face edges
```

**Why This Works:**
- "PBR" (Physically-Based Rendering) is industry-standard 3D rendering
- Numeric parameters (metallic: 0.95, roughness: 0.35) are unambiguous
- "Anisotropy" and "IOR" are pure 3D rendering terms (can't apply to 2D textures)
- "Multi-plane shadow casting" requires understanding 3D geometry
- "Self-shadowing" proves multiple surfaces exist
- These values match Blender/Unreal/Unity material systems

---

## 6. CRITICAL VOCABULARY REPLACEMENTS

### Immediate Changes Needed

| **REMOVE (2D-biased)**          | **REPLACE WITH (3D-forcing)**               | **Why**                                    |
|---------------------------------|---------------------------------------------|--------------------------------------------|
| "generative fill logic"         | "volumetric scene reconstruction"           | "Fill" = texture, "reconstruction" = geometry |
| "replace the golden zone"       | "carve out masked volume, insert 3D mesh"   | "Carve" + "mesh" = clear geometric operation |
| "soft light spill"              | "inverse-square light falloff with wall-texture modulation" | Physics-based vs aesthetic description |
| "photorealistic"                | "ray-traced PBR render"                     | "Ray-traced" = explicit 3D technique |
| "3-5 inches deep"               | "3.5-inch Z-axis extrusion (89mm normal displacement)" | Math precision vs vague range |
| "dimensional letters"           | "volumetric extruded letterforms"           | "Volumetric" + "extruded" = 3D modeling vocab |
| "contact shadows"               | "ambient occlusion with 70% opacity at r=0, exponential decay" | Numeric parameters vs vague description |
| "letter returns (sides)"        | "perpendicular return planes (mesh normals at 90° to face)" | Geometric precision |

---

## 7. PROPOSED NEW SYSTEM INSTRUCTION (Enhanced)

```
You are a 3D Architectural Visualization Engine specializing in 
VOLUMETRIC SCENE RECONSTRUCTION for commercial signage.

RENDERING METHOD: Ray-traced PBR (Physically-Based Rendering) using 
volumetric geometry insertion, not texture synthesis.

GOLDEN ZONE INTERPRETATION:
The highlighted area marks a VOLUMETRIC VOID where 3D geometric 
primitives must be INSERTED. This is SCENE RECONSTRUCTION (like 
Blender/3ds Max), not INPAINTING (like Photoshop content-aware fill).

EXECUTION:
1. Analyze building geometry: Extract vanishing points, wall plane 
   normal vectors, sun azimuth/altitude
2. CONSTRUCT 3D MESH: Generate polygon mesh for sign elements
   - Channel Letters: Box primitives with 6 faces (front, back, 4 returns)
   - Light Boxes: Cabinet mesh with aluminum frame + translucent face
3. EXTRUDE GEOMETRY: Project mesh 3.5 inches (89mm) along wall's 
   surface normal (perpendicular to wall plane)
4. APPLY PBR MATERIALS: Assign metallic/roughness/transmission values
5. RAY-TRACE LIGHTING: Calculate ambient occlusion, specular highlights, 
   subsurface scattering, shadow casting
6. COMPOSITE INTO SCENE: Replace golden zone pixels with rendered 
   3D geometry, preserve surrounding photo data

VALIDATION: The output must contain measurable Z-depth. If processed 
by depth-estimation (monocular depth prediction), the sign area should 
show 3-4 inch elevation above wall plane. Letter returns must be 
visible as distinct surfaces with different normals than letter faces.

FORBIDDEN: Texture overlays, alpha blending, glow effects, 2D layer 
compositing. These are NOT post-processing effects - these are 
GEOMETRIC STRUCTURES that must be ray-traced as true 3D meshes.
```

---

## 8. RECOMMENDED TESTING PROTOCOL

### Test #1: Depth Verification
**Goal**: Confirm true Z-depth vs texture illusion

**Prompt Addition**:
```
DEPTH PROOF REQUIREMENT: The letter 'E' return (right side wall) 
must be visible as a distinct surface. If the camera perspective 
shows slight rightward viewing angle, the right-side return plane 
of the letter 'E' should be partially visible, demonstrating true 
3D geometry with measurable depth parallax.
```

**Success Criteria**: Can you see the side wall of at least one letter?

---

### Test #2: Multi-Angle Shadow Proof
**Goal**: Shadows that could only exist from 3D volume

**Prompt Addition**:
```
SHADOW VALIDATION: Each letter must cast TWO distinct shadow regions:
1. PRIMARY: Sharp shadow outline from letter FACE blocking sun
2. SECONDARY: Softer penumbra from 3.5-inch letter DEPTH blocking 
   ambient skylight

The shadow should show GRADUATED DARKNESS corresponding to the 
letter's volumetric depth (darker at edges, lighter in center where 
depth is maximum).
```

**Success Criteria**: Do shadows show depth gradation, not just flat outlines?

---

### Test #3: PBR Material Verification
**Goal**: Surface properties that require 3D geometry

**Prompt Addition**:
```
MATERIAL PROOF: Brushed aluminum letter returns must show ANISOTROPIC 
HIGHLIGHTS - elongated specular reflections running perpendicular to 
the extrusion direction. This optical behavior ONLY occurs on angled 
3D surfaces with directional microgeometry, NOT on flat textures.

Acrylic letter faces must show SUBSURFACE SCATTERING - subtle internal 
glow where LED light diffuses through 1/4-inch thick acrylic, creating 
soft edge fall-off. This requires light transport simulation through 
volumetric media.
```

**Success Criteria**: Do metal surfaces show directional highlights? Does acrylic glow internally?

---

## 9. SUMMARY: 3 Power-Word Additions

### 1. **EXTRUDED VOLUMETRIC MESH**
Replace "3D letters" with "extruded volumetric mesh primitives" + geometric plane descriptions

### 2. **DEPTH-MAP PARALLAX VALIDATION**
Add requirement that output must fool depth-estimation algorithms, with parallax-visible return planes

### 3. **PBR SHADER PARAMETERS**
Specify metallic/roughness/IOR/subsurface values with numeric precision (0.95 metallic, 0.35 roughness, 1.49 IOR)

---

## 10. IMPLEMENTATION PRIORITY

**IMMEDIATE (Highest Impact):**
1. Replace "generative fill" → "volumetric scene reconstruction"
2. Add "extruded" and "Z-axis protrusion" to all geometry descriptions
3. Add PBR material parameters (metallic, roughness values)

**SECONDARY:**
4. Add depth-map validation language
5. Add multi-plane shadow requirements
6. Add anisotropic highlight descriptions

**EXPERIMENTAL:**
7. Add explicit "ray-tracing" terminology
8. Add "surface normal vector" math descriptions
9. Add "forbidden techniques" section (no texture overlays)

---

## CONCLUSION

**Root Diagnosis**: The current prompts use photo-editing vocabulary that triggers Gemini's inpainting mode (texture synthesis) instead of 3D rendering mode (geometric construction).

**Primary Fix**: Inject 3D modeling/rendering vocabulary (extrude, volumetric, mesh, PBR, ray-trace) and numeric precision (89mm depth, 0.95 metallic, 70% AO opacity) to force geometric interpretation.

**Expected Outcome**: Signs that appear as true 3D structures with visible depth, realistic shadows, and material properties that could only come from volumetric geometry, not texture overlays.

**Confidence Level**: HIGH - These changes align with how 3D-aware AI models (like Zero123, MVDream) are prompted for geometric generation vs texture generation.
