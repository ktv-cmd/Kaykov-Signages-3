# Enhanced Architectural Prompt Example

## System Role Update

The system instruction has been upgraded to emphasize:
- **Generative Fill Logic**: Golden zone pixels are REMOVED and REPLACED (not overlaid)
- **Physical Fabrication Details**: Specific depths, materials, construction methods
- **Mounting Hardware**: Visible studs, raceways, fasteners
- **Ambient Occlusion**: Contact shadows for realism
- **Perspective Alignment**: Following building vanishing points

---

## Example: Back-Lit Restaurant Sign (Text Only)

### Input Parameters
- **Brand Text:** "BISTRO NOUVEAU"
- **Brand Mode:** text-only
- **Reference Style:** Back Lit Sign
- **Lighting Mode:** back (halo)
- **Mounting:** stand-off

### Generated Prompt (Enhanced)

```
This is a high-fidelity architectural signage visualization using generative fill logic. Image 1 shows the building with a GOLD HIGHLIGHTED ZONE — this is a MASK. These pixels must be REMOVED ENTIRELY and REPLACED with a 3D physical sign structure. This is NOT an overlay. Remove the highlighted pixels and generate a physically mounted, fabricated sign in that exact space. The golden yellow is purely a placement guide — remove it completely. It is NOT a brand color. All pixels outside the golden zone remain UNTOUCHED (generative fill) — preserve original materials, textures, shadows, reflections, window glare, architectural details.  CRITICAL PHYSICAL ACCURACY: - PERSPECTIVE ALIGNMENT: Sign must follow the building's vanishing points and architectural perspective. If facade recedes, sign follows that angle. - AMBIENT OCCLUSION: Render contact shadows where sign meets wall. Darker shadow directly behind elements, softening with distance. This prevents "pasted on" look. - MOUNTING HARDWARE: Show realistic mounting (stand-off studs, raceway edges, flush fasteners). stand-off mounted (depth from wall) — make hardware visible and realistic. - DEPTH & DIMENSION: 3D elements (3-5 inch depth) cast realistic shadows based on sun position in the photo.  CASE B: TEXT ONLY Render the business name "BISTRO NOUVEAU" in the golden zone. Business name is rendered as Individual 3D Channel Letters (Dimensional Lettering). Each letter is a separately fabricated element: 3-5 inches deep, aluminum or acrylic construction, with visible returns (letter sides). NOT a flat panel or single light box. Each letter mounts independently with visible spacing between characters. COLOR SELECTION (NO LOGO): Analyze building facade materials in Image 1: brick color and mortar, stucco tone, glass tint, metal panel finish. Consider time of day and sun angle. Select letter finish that complements: brushed aluminum (#A9A9A9), polished stainless (#C0C0C0), matte black (#1C1C1C), brushed bronze (#CD7F32), or painted to match building accent colors. DO NOT use golden yellow guide color. DO NOT select arbitrary colors disconnected from the scene. TYPOGRAPHY: Professional signage typeface appropriate for Back Lit Sign style. Letters proportional, well-spaced, with realistic kerning for fabricated dimensional letters. LIGHTING FABRICATION: Back-lit (Halo) — Solid brushed metal or opaque acrylic faces with LED strips mounted on letter returns. LEDs project light against building facade, creating soft ambient glow 6-12 inches beyond letter edges. Letter appears as dark silhouette with luminous halo. NO face illumination. Light interacts with wall texture (grout lines, stucco, brick). MATERIAL REALISM: Show metal grain direction on brushed finishes, paint sheen, acrylic translucency. Letter returns (sides) visible if angle allows. Contact shadows under each letter.  RESULT: Photorealistic 16:9 architectural render with "BISTRO NOUVEAU" as physically installed dimensional letters. Accurate perspective following building lines, visible mounting hardware, contact shadows, sun-cast shadows from 3-5 inch depth. Looks professionally fabricated and installed.
```

---

## Key Enhancements in This Prompt

### 1. Generative Fill Emphasis
**Before:**
> "This zone must be replaced with new signage"

**After:**
> "These pixels must be REMOVED ENTIRELY and REPLACED with a 3D physical sign structure. This is NOT an overlay."

### 2. Physical Construction Specifics
**Before:**
> "Individual 3D Channel Letters"

**After:**
> "Each letter is a separately fabricated element: 3-5 inches deep, aluminum or acrylic construction, with visible returns (letter sides). NOT a flat panel. Each letter mounts independently with visible spacing."

### 3. Lighting Technical Details
**Before:**
> "Back-lit with halo effect"

**After:**
> "Solid brushed metal faces with LED strips mounted on letter returns. LEDs project light against building facade, creating soft ambient glow 6-12 inches beyond letter edges. Letter appears as dark silhouette with luminous halo. NO face illumination. Light interacts with wall texture."

### 4. Material & Hardware Realism
**Before:**
> "Stand-off mounting"

**After:**
> "Show realistic mounting (stand-off studs, raceway edges, flush fasteners). stand-off mounted — make hardware visible and realistic. Show metal grain direction, contact shadows under each letter."

### 5. Physical Accuracy Requirements
**New additions:**
- PERSPECTIVE ALIGNMENT: Must follow building vanishing points
- AMBIENT OCCLUSION: Contact shadows prevent "pasted on" look
- DEPTH & DIMENSION: 3-5 inch depth casts sun shadows
- MATERIAL REALISM: Brushed grain, paint sheen, acrylic translucency

---

## Comparison: Logo-Only Case

### Input
- **Brand Mode:** logo-only
- **Logo:** Coffee shop logo (brown coffee bean symbol)
- **Lighting:** Back-lit halo
- **Mounting:** Stand-off

### Enhanced Prompt Excerpt

```
CASE A: LOGO ONLY
Image 2 contains the logo artwork. Logo symbol is rendered as a Custom-shaped 3D Lightbox or Acrylic Cloud Sign. Cabinet-style construction: 2-3 inch depth, aluminum returns, translucent acrylic face matching logo shape. This is NOT a rectangular box — the cabinet follows the logo's organic outline.

COLOR INTEGRITY: Use exact HEX/Pantone colors from Image 2. This is the brand's official identity — color accuracy is non-negotiable.

LIGHTING FABRICATION: Back-lit (Halo) — Solid brushed metal or opaque acrylic faces with LED strips mounted on letter returns. LEDs project light against building facade, creating soft ambient glow 6-12 inches beyond letter edges. Letter appears as dark silhouette with luminous halo. NO face illumination. Light interacts with wall texture (grout lines, stucco, brick).

MATERIAL REALISM: Show brushed metal grain direction, acrylic edge glow, painted finish sheen. If viewing angle allows, show letter/cabinet returns (sides).

RESULT: Photorealistic 16:9 exterior architectural render. The sign appears as a physically installed 3D structure with accurate perspective, visible mounting hardware, contact shadows, and professional fabrication quality. Should look like a sign shop installed it on-site.
```

**Key Features:**
1. ✅ **Cabinet follows logo outline** (not rectangular box)
2. ✅ **Specific depth** (2-3 inches for logo vs 3-5 for letters)
3. ✅ **Light interaction with wall texture** (grout, stucco, brick)
4. ✅ **Material properties** (grain direction, edge glow, sheen)
5. ✅ **Installation realism** ("sign shop installed it on-site")

---

## Comparison: Logo + Name Case

### Input
- **Brand Mode:** logo-and-text
- **Logo:** Fitness club dumbbell icon (blue/white)
- **Brand Text:** "FITNESS CLUB"
- **Lighting:** Front & Back (combined)
- **Mounting:** Raceway

### Enhanced Prompt Excerpt

```
CASE C: LOGO + NAME
Image 2 contains the logo artwork. CONSTRUCTION: Logo: Custom-shaped 3D Lightbox (2-3" depth, cabinet follows logo outline). Business name: Individual 3D Channel Letters (3-5" depth, separate fabricated elements). Logo positioned first/center/left, letters follow to right or below. Mounting shows realistic hardware: stand-off studs for letters, raceway or flush-mount for logo box.

COLOR INTEGRITY: Logo uses exact HEX/Pantone from Image 2. Business name "FITNESS CLUB" uses colors/finishes that match logo palette for unified brand identity.

TYPOGRAPHY: Font style for "FITNESS CLUB" complements logo's design language (modern/classic/bold/elegant). Letters properly spaced for dimensional fabrication.

LAYOUT: Logo positioned first (left, center, or top). Name follows in balanced composition. Spacing between logo and name realistic for separate physical elements.

LIGHTING FABRICATION: Front & Back (Combined) — Translucent acrylic faces with internal LED modules PLUS rear-mounted LED strips for halo effect. Face glows AND projects wall wash. Maximum 24/7 visibility. Light spill both forward and behind creates dimensional glow effect.

MATERIAL REALISM: Show distinct construction of logo (cabinet/lightbox) vs letters (individual channel letters). Visible mounting: studs for letters, raceway or flush-mount for logo. Contact shadows for each element.

RESULT: Photorealistic 16:9 architectural render showing logo and "FITNESS CLUB" as physically fabricated and installed elements. Accurate perspective, visible hardware, ambient occlusion shadows, material properties. Logo and name appear as professional sign shop installation with unified branding.
```

**Key Features:**
1. ✅ **Distinct construction** (logo = lightbox, text = channel letters)
2. ✅ **Separate mounting hardware** (studs for letters, raceway for logo)
3. ✅ **Individual contact shadows** for each element
4. ✅ **Realistic spacing** between physical elements
5. ✅ **Unified branding** through matching color palette

---

## Technical Specifications Now Included

### Depth Specifications
- Logo symbols: **2-3 inches** (Custom-shaped lightbox)
- Business letters: **3-5 inches** (Channel letters)
- Awning frame: **6-10 inches** (Aluminum structure)

### Material Details
- Acrylic thickness: **1/4" - 3/8"**
- Brushed metal: **Grain direction visible**
- LED placement: **On letter returns, 6-12 inch halo spread**
- Paint finish: **Sheen level appropriate to style**

### Mounting Hardware
- Stand-off studs: **1-3 inches from wall**
- Raceway: **Horizontal/vertical aluminum channel**
- Flush mount: **Concealed fasteners**
- Wiring: **Conduit exits realistic (bottom/side)**

### Shadow & Light Specifications
- Halo spread: **6-12 inches beyond letter edges**
- Front glow spill: **4-8 inches onto wall**
- Contact shadow: **Darker directly behind, softening with distance**
- Sun shadows: **Based on 3-5 inch dimensional depth**

---

## Expected Visual Improvements

With these enhancements, Gemini 2.5 should now generate:

1. **Better Perspective**
   - Signs follow building vanishing points
   - Properly aligned with architectural elements

2. **More Realistic Mounting**
   - Visible studs, screws, or raceway edges
   - Appropriate hardware for construction type

3. **Enhanced Depth Perception**
   - Clear contact shadows (ambient occlusion)
   - Sun-cast shadows from dimensional depth
   - Light doesn't look "pasted on"

4. **Material Authenticity**
   - Brushed metal shows grain direction
   - Acrylic has edge glow and translucency
   - Paint finishes have appropriate sheen

5. **Professional Fabrication Look**
   - Each letter separately mounted
   - Realistic spacing between characters
   - Logo cabinets follow organic shapes
   - Hardware visible and properly scaled

---

## Testing Recommendations

To validate the enhancements:

1. **Test back-lit signs** - Check if halo interacts with wall texture
2. **Test logo shapes** - Verify cabinet follows logo outline (not rectangular)
3. **Test perspective** - Ensure signs follow building angles
4. **Test mounting** - Look for visible studs/hardware
5. **Test shadows** - Confirm contact shadows under letters

The system should now produce more architecturally accurate and professionally realistic signage visualizations.
