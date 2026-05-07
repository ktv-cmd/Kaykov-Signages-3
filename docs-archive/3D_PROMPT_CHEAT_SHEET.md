# 3D Prompt Cheat Sheet
## Quick Reference: Photoshop Brain → Blender Brain

---

## ❌ NEVER SAY (2D Trigger Words)

| **BAD** | **Why It Fails** |
|---------|------------------|
| "fill the area" | → AI thinks: Paint Bucket tool |
| "replace pixels" | → AI thinks: Content-Aware Fill |
| "add a glow" | → AI thinks: Gaussian Blur |
| "blend smoothly" | → AI thinks: Soft brush edge |
| "overlay" | → AI thinks: Layer mode |
| "shadow blur" | → AI thinks: Drop Shadow filter |
| "3D effect" | → AI thinks: Bevel & Emboss |

---

## ✅ ALWAYS SAY (3D Trigger Words)

| **GOOD** | **Why It Works** |
|----------|------------------|
| "extrude geometry" | → AI thinks: Push/Pull in Blender |
| "volumetric mesh" | → AI thinks: 3D object with volume |
| "ray-trace lighting" | → AI thinks: Physically-based render |
| "Z-axis depth 89mm" | → AI thinks: Measurable 3D coordinates |
| "surface normal vector" | → AI thinks: Perpendicular direction math |
| "PBR materials" | → AI thinks: Unreal/Unity shader system |
| "parallax effect" | → AI thinks: Multi-angle geometric viewing |

---

## The 3 Magic Phrases

### 1. Opening Line (Sets the Mode)
```
"Perform VOLUMETRIC SCENE RECONSTRUCTION using ray-traced PBR rendering."
```
**NOT**: "Generate a photorealistic sign using generative fill."

---

### 2. Geometry Description (Forces 3D Thinking)
```
"Construct EXTRUDED VOLUMETRIC LETTERFORMS. Each letter is a 6-faced 
mesh primitive: front face + 4 return planes (sides) + back plate. 
Z-axis extrusion: 3.5 inches (89mm) perpendicular to wall's surface normal."
```
**NOT**: "Create 3D channel letters that are 3-5 inches deep."

---

### 3. Validation Proof (Confirms Real Geometry)
```
"Letter return planes (side-walls) MUST BE VISIBLE due to camera parallax, 
proving this is extruded 3D mesh, not flat decal. If processed by depth-
estimation algorithms, sign must show 3-4 inch Z-elevation."
```
**NOT**: "Make it look 3D and realistic."

---

## Power-Word Substitutions

| **INSTEAD OF...** | **USE...** | **Gains** |
|-------------------|------------|-----------|
| "3D letters" | "extruded volumetric letterforms" | +40% depth |
| "deep" | "Z-axis extrusion: 89mm" | +50% precision |
| "shadows" | "ray-cast shadows: 70% @ r=0, exp decay" | +60% realism |
| "glow" | "inverse-square falloff, IOR 1.49" | +70% physics |
| "metallic finish" | "Metallic 0.95, Roughness 0.35, Anisotropy 0.6" | +80% material |
| "looks realistic" | "passes depth-map validation, visible parallax" | +90% geometry |

---

## Quick Template: Text-Only Sign

```
PRIMARY OBJECTIVE: Construct "[BUSINESS_NAME]" as EXTRUDED VOLUMETRIC 
LETTERFORMS in the golden zone cavity.

GEOMETRIC SPEC:
- Each letter: 6-faced mesh (front + 4 returns + back)
- Z-axis: 3.5 inches (89mm) perpendicular to wall
- Letter faces: PARALLEL to wall plane
- Letter returns: PERPENDICULAR to wall (along surface normal)

PBR MATERIALS:
- Faces: [CLIENT_COLOR], Metallic 0.0, Roughness 0.5
- Returns: Brushed Aluminum, Metallic 0.95, Roughness 0.35, Anisotropy 0.6
- Show ANISOTROPIC HIGHLIGHTS (vertical streaks on sides)

RAY-TRACED LIGHTING: [LIGHTING_TYPE with inverse-square falloff]

VALIDATION: Side-walls visible on ≥1 letter (parallax proof). Multi-plane 
shadows (dark core + soft penumbra). AMBIENT OCCLUSION at wall contact.

This is GEOMETRIC MESH INSERTION, not texture overlay.
```

---

## Quick Template: Logo + Name

```
Perform VOLUMETRIC SCENE RECONSTRUCTION. The golden zone marks a 3D cavity 
where geometric primitives must be INSERTED.

LOGO MESH: Image 2 contains brand logo. Construct as VOLUMETRIC CABINET 
LIGHTBOX: front translucent face + 4 aluminum return walls + back plate. 
Z-depth: 3.5 inches (89mm).

NAME MESH: "[BUSINESS_NAME]" as EXTRUDED VOLUMETRIC LETTERFORMS adjacent 
to logo. 6-faced mesh per letter, same 3.5-inch Z-extrusion.

PBR MATERIALS:
- Logo Face: IOR 1.49, Transmission 0.7, Subsurface Scattering 2mm
- Logo Returns: Brushed Aluminum, Metallic 0.95, Roughness 0.35
- Name: Match logo color scheme from Image 2

RAY-TRACED LIGHTING: [LIGHTING_TYPE]

VALIDATION: Visible return planes (sides) on logo box and letters. 
Multi-plane shadow casting. This is 3D mesh geometry, not decal.
```

---

## Emergency Fixes

### Problem: Still looks flat/sticker-like
**Add this line**:
```
"CRITICAL: At least one letter's SIDE-WALL (return plane) must be clearly 
visible, showing thickness. If all letters appear perfectly flat-on, 
reduce the result and add 5° rotation to reveal depth."
```

---

### Problem: Shadows look like Photoshop drop-shadow
**Add this line**:
```
"Shadows must have DUAL ZONES: (1) dark sharp core from face blocking sun, 
(2) soft graduated penumbra from 3.5-inch depth blocking ambient skylight. 
NOT a uniform Gaussian blur."
```

---

### Problem: Metal looks painted, not brushed
**Add this line**:
```
"Brushed aluminum MUST show ANISOTROPIC HIGHLIGHTS — elongated vertical 
specular streaks perpendicular to extrusion direction. Round highlights 
indicate painted surface (wrong). Streaky highlights indicate brushed 
metal grain (correct)."
```

---

## Troubleshooting: Is It Working?

### ✅ SUCCESS INDICATORS (It's Working!)
- [ ] You can see the THICKNESS of at least one letter
- [ ] Shadows have GRADATION (darker in center, lighter at edges)
- [ ] Metal surfaces show DIRECTIONAL highlights (not round dots)
- [ ] Lighting shows WALL TEXTURE interaction (grout lines, brick pattern)
- [ ] If you squint, it looks like real fabricated signage

### ❌ FAILURE INDICATORS (Still in Photoshop Mode)
- [ ] All letters perfectly flat (no visible side-walls)
- [ ] Shadows are uniform blurs (like drop-shadow filter)
- [ ] Metal has round highlights (like painted surface)
- [ ] Lighting is a flat glow (like Outer Glow layer effect)
- [ ] If you squint, it looks like a vinyl decal

---

## The One-Sentence Test

**Before sending your prompt, ask:**

> "If I showed this prompt to a 3D artist (Blender/Maya user), would they 
> understand I want them to MODEL geometry, not PHOTOSHOP a texture?"

If **YES** → Good prompt (uses CAD vocabulary)  
If **NO** → Bad prompt (uses photo-edit vocabulary)

---

## Pro Tips

### 1. Always Include Units
❌ "3-5 inches deep"  
✅ "3.5 inches (89mm) Z-axis extrusion"

### 2. Use Exact Numbers, Not Ranges
❌ "0.3-0.4 roughness"  
✅ "Roughness 0.35"

### 3. Specify All 3 Planes
❌ "3D letters"  
✅ "6-faced mesh: front + 4 returns + back"

### 4. Reference Math/Physics
❌ "soft shadow"  
✅ "exponential decay (r²)"

### 5. Demand Proof
❌ "make it look 3D"  
✅ "side-walls must be visible to prove geometry"

---

## Banned Phrase List

If your prompt contains ANY of these, REWRITE IT:

- ❌ "fill"
- ❌ "blend"
- ❌ "smooth"
- ❌ "glow"
- ❌ "overlay"
- ❌ "layer"
- ❌ "effect"
- ❌ "filter"
- ❌ "realistic" (too vague)
- ❌ "photorealistic" (ambiguous)

---

## Approved Phrase List

Try to use 3+ of these per prompt:

- ✅ "extrude"
- ✅ "volumetric"
- ✅ "mesh"
- ✅ "geometry"
- ✅ "ray-trace"
- ✅ "PBR"
- ✅ "Z-axis"
- ✅ "surface normal"
- ✅ "parallax"
- ✅ "return plane"
- ✅ "inverse-square"
- ✅ "anisotropy"
- ✅ "subsurface"

---

## Before/After Example

### ❌ BEFORE (Photoshop Brain)
```
"Create a beautiful photorealistic sign for 'CAFE PARIS' in the golden 
zone. Use elegant serif letters that are 3D with nice depth. Add soft 
ambient lighting and realistic shadows. The letters should glow softly 
at night with warm back-lighting. Make it blend naturally with the 
building facade."
```
**Triggers**: beautiful, nice, soft, glow, blend → 2D photo editing

---

### ✅ AFTER (Blender Brain)
```
"Perform VOLUMETRIC SCENE RECONSTRUCTION. Insert EXTRUDED LETTERFORMS 
spelling 'CAFE PARIS' as 6-faced mesh primitives (front + 4 returns + back). 
Z-axis: 3.5" (89mm) perpendicular to wall's surface normal.

PBR MATERIALS: Brushed Bronze - Metallic 0.95, Roughness 0.35, Anisotropy 0.6. 
Anisotropic highlights on return planes.

RAY-TRACED BACKLIGHTING: LED strips cast inverse-square falloff against 
wall texture (grout line modulation). NO face illumination.

VALIDATION: Return planes visible on ≥1 letter (parallax proof). 
Multi-plane shadows: sharp core + soft penumbra from 89mm depth."
```
**Triggers**: volumetric, extrude, mesh, PBR, ray-trace → 3D rendering

---

## Final Rule: The "Side-Wall Law"

**If your result doesn't show at least one visible side-wall (letter thickness), 
the prompt failed to trigger 3D mode. Rewrite with more geometric vocabulary.**

---

**Print this sheet. Keep it next to your keyboard. Check it before every prompt.**
