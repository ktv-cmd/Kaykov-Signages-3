# Architectural Signage Prompt System

## Overview
This document describes the comprehensive prompt generation system for creating premium architectural signage visualizations using Gemini 2.5. The system follows professional signage industry standards for construction types, lighting modes, and material selection.

## System Architecture

### Files Modified
1. **`lib/ai/variation-planner.ts`** - Prompt generation logic with architectural rules
2. **`lib/ai/provider.ts`** - System instruction for Gemini 2.5

### Core Components

#### 1. System Instruction (provider.ts)
The system instruction establishes the AI's role as a Senior Architectural Signage Visualization Expert and defines:
- Golden zone replacement rules
- Pixel preservation requirements outside the golden zone
- Construction logic (3D Light Boxes vs Channel Letters)
- Lighting mode specifications
- Color integrity protocols

#### 2. Prompt Builder (variation-planner.ts)
Dynamic prompt templates that adapt based on three cases:
- **CASE A**: Logo Only
- **CASE B**: Text Only
- **CASE C**: Logo + Name

---

## Industry-Standard Rules

### Construction Types

#### Logo Symbols
- **Always rendered as:** 3D Light Box
- **Definition:** Dimensional cabinet with translucent face and internal illumination
- **Typical dimensions:** 3-6 inches deep, flush or stand-off mounted
- **Lighting:** Internal LED illumination with even face glow

#### Business Name Letters
- **Always rendered as:** Individual 3D Channel Letters
- **Definition:** Each letter is a separate dimensional element
- **NOT:** Flat panels or light boxes
- **Construction:** Fabricated aluminum or acrylic with returns (letter depth)
- **Typical dimensions:** 2-4 inches deep

#### Exception: Awning Style
When the selected reference is "awning":
- Both logo and name are **printed or applied to fabric/material**
- No 3D construction
- Lighting is external or edge-mounted (if applicable)

### Lighting Modes

#### Front-lit
- **Technical:** Translucent acrylic faces with internal LED illumination
- **Visual effect:** Letter faces glow evenly from within
- **Best for:** High visibility, 24/7 businesses
- **Typical applications:** Channel letters, light box faces

#### Back-lit (Halo)
- **Technical:** Solid metal/acrylic faces with LEDs mounted behind letters
- **Visual effect:** Halo glow effect on wall surface behind letters
- **Best for:** Premium branding, upscale establishments
- **Typical applications:** Reverse channel letters, halo-lit logos
- **Note:** No face illumination

#### Front & Back Lit (Combined)
- **Technical:** Translucent faces (internal LEDs) + halo LEDs behind
- **Visual effect:** Maximum visibility and dimensional effect
- **Best for:** Flagship locations, high-impact branding
- **Typical applications:** Dual-lit channel letters

#### No Light
- **Technical:** Non-illuminated 3D dimensional letters
- **Materials:** Brushed metal, painted aluminum, polished steel
- **Best for:** Professional offices, upscale daytime businesses
- **Visual effect:** Bold physical presence through dimensional depth and premium materials

### Color Integrity Protocols

#### When Logo is Provided (Image 2)
- **Rule:** Use exact HEX/Pantone colors from the logo file
- **Rationale:** Brand identity requires color accuracy
- **Application:** Logo symbols, channel letter faces, trim colors
- **Critical:** Color matching is non-negotiable for logo-based signs

#### When Text Only (No Logo)
- **Rule:** Select colors/materials that complement the building facade
- **Analysis required:**
  - Wall texture (brick, stucco, concrete, metal panels)
  - Time of day and lighting conditions
  - Architectural style (modern, traditional, industrial)
  - Existing color palette of the building
- **Material options:**
  - Brushed aluminum (silver, champagne, bronze)
  - Polished steel
  - Matte black
  - Brass or bronze
  - Painted finishes matching facade accent colors
- **Prohibited:** Using the golden placement guide color as a sign color

---

## Prompt Generation Cases

### CASE A: Logo Only

#### Input
- Image 1: Storefront with golden zone
- Image 2: Logo artwork

#### Prompt Structure
```
[Base Instructions]
CASE A: LOGO ONLY
Image 2 contains the logo artwork. Logo symbols are rendered as a 3D Light Box — a dimensional cabinet with translucent face and internal illumination.
Color integrity: Use the exact HEX/Pantone colors from Image 2. This is the brand's official logo — color accuracy is critical.
Lighting: [Front-lit/Back-lit/etc. description]
Mounting: [flush/stand-off/raceway description]
Result: A photorealistic 16:9 exterior shot showing the new sign seamlessly integrated into the golden zone. Premium architectural render quality.
```

#### Example Output
For a coffee shop logo with brown and cream colors:
- Logo symbol: 3D light box, 4" deep
- Logo colors: Exact brown (#8B4513) and cream (#FFF8DC) from logo file
- Lighting: Front-lit with warm LED (3000K)
- Mounting: Stand-off with brushed aluminum studs
- Integration: Seamlessly placed in golden zone, halo shadow on brick wall

### CASE B: Text Only

#### Input
- Image 1: Storefront with golden zone
- brandText: "ARTISAN BAKERY"

#### Prompt Structure
```
[Base Instructions]
CASE B: TEXT ONLY
Render the business name "ARTISAN BAKERY" in the golden zone. Business names/letters are rendered as Individual 3D Channel Letters — each letter is a separate dimensional element, not a flat panel or light box.
Color selection: NO LOGO PROVIDED — choose letter colors, materials (brushed aluminum, polished steel, matte black, brass, bronze), and finishes that complement the existing building materials visible in Image 1.
Analyze the facade: Consider the wall texture, time of day, architectural style, and color palette.
DO NOT use the golden yellow from the placement guide as a sign color.
Typography: Select a professional, readable font appropriate for [reference style] signage.
Lighting: [lighting description]
Mounting: [mounting description]
Result: Photorealistic 16:9 exterior shot with "ARTISAN BAKERY" integrated naturally into the golden zone.
```

#### Example Output
For a rustic brick building:
- Letters: Individual 3D channel letters, 3" deep
- Font: Classic serif (Trajan or similar)
- Material: Brushed bronze finish
- Color: Warm bronze (#CD7F32) complementing red brick
- Lighting: Back-lit halo, warm white LEDs
- Mounting: Stand-off, 1.5" from wall
- Integration: Letters cast subtle shadows on brick, halo glow accentuates texture

### CASE C: Logo + Name

#### Input
- Image 1: Storefront with golden zone
- Image 2: Logo artwork
- brandText: "FITNESS CLUB"

#### Prompt Structure
```
[Base Instructions]
CASE C: LOGO + NAME
Image 2 contains the logo artwork. Layout: Place the logo first as a 3D Light Box, immediately followed by the business name as Individual 3D Channel Letters. Logo left/center, name to the right or below in a balanced composition.
Color integrity: Match the text colors/materials to the logo's color scheme from Image 2. The logo and name must feel like a unified brand identity.
Typography: Choose a font style for "FITNESS CLUB" that complements the logo's design language.
Lighting: [lighting description]
Mounting: [mounting description]
Result: Photorealistic 16:9 exterior shot showing the logo and "FITNESS CLUB" seamlessly integrated as a cohesive branded sign.
```

#### Example Output
For a modern fitness club with blue/white logo:
- Logo: 3D light box, 5" deep, logo colors blue (#0066CC) and white (#FFFFFF)
- Text: "FITNESS CLUB" in individual 3D channel letters, 3" deep
- Font: Bold sans-serif matching logo's modern aesthetic
- Color: Same blue (#0066CC) as logo, white faces
- Layout: Logo on left, text to right, horizontally aligned
- Lighting: Front & back lit (combined) for maximum impact
- Mounting: Raceway system for clean electrical routing
- Integration: Unified sign system, balanced composition

---

## Mounting Styles

### Flush Mount
- **Description:** Mounted directly against facade surface
- **Visual:** No visible gap between sign and wall
- **Best for:** Flat facades, light boxes, plaques
- **Hardware:** Concealed fasteners, adhesive, or internal frame

### Stand-off Mount
- **Description:** Mounted with visible standoff studs creating depth
- **Visual:** Floating appearance with shadow gap (typically 1-3" from wall)
- **Best for:** Channel letters, dimensional logos, premium signage
- **Hardware:** Polished or brushed metal studs/spacers
- **Effect:** Enhanced dimensional effect, professional appearance

### Raceway Mount
- **Description:** Letters/logo mounted on metal wireway box
- **Visual:** Sign elements attached to horizontal or vertical channel
- **Best for:** Multiple letters, complex electrical routing
- **Hardware:** Aluminum or steel raceway, painted to match
- **Advantage:** Simplified installation, concealed wiring

---

## Reference Style Integration

The system uses predefined reference styles from `lib/references.ts`:

1. **Front Lit Sign** - Traditional illuminated channel letters
2. **Back & Front Lit** - Maximum visibility dual illumination
3. **Back Lit Sign** - Premium halo effect
4. **Light Box** - Classic cabinet sign with even face illumination
5. **No Light – 3D Outdoor** - Non-illuminated dimensional letters
6. **Awning Sign** - Printed fabric with structural support

Each reference defines:
- `lightingType`: front | back | both
- `materialFeel`: brushed-metal | acrylic | neon | dimensional | flat
- `depthStyle`: flat | shallow | deep
- `mountingStyle`: flush | stand-off | raceway
- `compatibleLightModes`: Array of supported lighting configurations

---

## Image Slot Descriptions

For Gemini 2.5 multi-image generation:

### Image 1: Storefront with Golden Zone
```
Image 1: storefront — gold/yellow shows zones where new signage goes; edit only those areas.
```

### Image 2: Logo (when provided)
```
Image 2: supplied logo file — use as the sign artwork (colors from this file).
```

For logo + name combinations:
```
Image 2: supplied logo file — pair with name "BUSINESS NAME" per the text instructions.
```

---

## Best Practices

### Color Selection (Text-Only Mode)
1. Analyze the photograph for dominant and accent colors
2. Consider time of day (golden hour warmth, midday neutrals, dusk coolness)
3. Match or complement existing signage, window frames, architectural details
4. Avoid: Golden guide color, arbitrary brand colors, neon without context

### Typography Matching
1. Modern buildings → Sans-serif, geometric fonts
2. Traditional/historic → Serif, classical fonts
3. Industrial → Bold, condensed, technical fonts
4. Upscale retail → Elegant, refined, high contrast

### Lighting Realism
1. Front-lit: Consistent glow, slight light spill onto adjacent surfaces
2. Back-lit: Defined halo, deeper shadows on textured walls
3. Combined: Both effects present but balanced, not overexposed
4. Unlit: Emphasize dimensional shadows, material reflections

### Perspective & Scale
1. Letters/logos must follow building perspective lines
2. Scale should be proportional to golden zone size
3. Typical channel letter height: 12-48 inches depending on viewing distance
4. Logo light boxes: Often square or rectangular, 24-72 inches

---

## Testing & Validation

### Example Test Cases

#### Test 1: Logo Only - Modern Tech Company
- **Input:** Glass facade building, minimalist blue logo
- **Expected:** 3D light box, exact blue (#0066FF), front-lit, stand-off mount
- **Validation:** Logo colors match exactly, clean modern aesthetic

#### Test 2: Text Only - Rustic Restaurant
- **Input:** Brick building, warm evening light, "HARVEST KITCHEN"
- **Expected:** Bronze channel letters, serif font, halo lighting
- **Validation:** Bronze complements brick, halo enhances texture

#### Test 3: Logo + Name - Retail Boutique
- **Input:** Stucco facade, elegant logo, "BELLA MODE"
- **Expected:** Logo as light box, elegant script for name, coordinated colors
- **Validation:** Unified brand presentation, balanced composition

---

## Troubleshooting

### Issue: AI uses golden guide color for signage
**Solution:** Enhance prompt with explicit prohibition:
```
DO NOT use the golden yellow from the placement guide as a sign color.
```

### Issue: Logo colors are not accurate
**Solution:** Reinforce color integrity protocol:
```
Use the exact HEX/Pantone colors from Image 2. Color accuracy is critical.
```

### Issue: Text is not rendered as individual letters
**Solution:** Clarify construction type:
```
Business names/letters are rendered as Individual 3D Channel Letters — each letter is a separate dimensional element, not a flat panel or light box.
```

### Issue: Lighting effect is not realistic
**Solution:** Use detailed lighting descriptions from helper functions:
```
Back-lit (Halo) — solid metal or acrylic faces with LEDs mounted behind the letters, creating a halo glow effect against the wall. No face illumination.
```

---

## Future Enhancements

1. **Material Library:** Expand getConstructionType with specific material finishes (brushed vs polished, acrylic types)
2. **Seasonal Context:** Time-of-day and seasonal lighting adjustments
3. **Regulatory Compliance:** ADA requirements, local sign codes
4. **Cost Indicators:** Complexity scoring for pricing estimates
5. **3D Preview:** Integration with 3D rendering engines for pre-visualization

---

## Conclusion

This prompt architecture system transforms generic image generation into industry-compliant architectural signage visualization by:
1. Enforcing construction standards (light boxes vs channel letters)
2. Applying professional lighting terminology and physics
3. Maintaining color integrity protocols
4. Adapting to contextual building materials and styles
5. Generating prompts that produce premium, photorealistic results

The system is designed to scale with additional reference styles, lighting modes, and material options while maintaining consistency with professional signage industry practices.
