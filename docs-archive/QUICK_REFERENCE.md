# Quick Reference Guide - Architectural Signage Prompt System

## Decision Tree

```
INPUT: Storefront Image + (Logo? / Text? / Both?)
         ↓
    CONSTRUCTION RULES
         ↓
┌────────────────────────────────────┐
│  Logo Symbols → 3D Light Box       │
│  Business Name → Channel Letters   │
│  Exception: Awning → Printed       │
└────────────────────────────────────┘
         ↓
    LIGHTING MODE
         ↓
┌────────────────────────────────────┐
│  Front-lit   → Internal LEDs       │
│  Back-lit    → Halo glow           │
│  Both        → Combined            │
│  No Light    → Dimensional only    │
└────────────────────────────────────┘
         ↓
    COLOR PROTOCOL
         ↓
┌────────────────────────────────────┐
│  Logo? → Exact HEX/Pantone         │
│  Text only? → Complement building  │
└────────────────────────────────────┘
         ↓
    OUTPUT: Architectural Prompt
```

---

## Three Core Cases

| Case | Input | Construction | Color Rule |
|------|-------|--------------|------------|
| **A: Logo Only** | Image 1 (storefront) + Image 2 (logo) | Logo = 3D Light Box | Exact colors from Image 2 |
| **B: Text Only** | Image 1 (storefront) + brandText | Text = Channel Letters | Complement building facade |
| **C: Logo + Name** | Image 1 + Image 2 + brandText | Logo = Light Box, Text = Letters | Logo colors, unified brand |

---

## Construction Types Cheat Sheet

### 3D Light Box
- **When:** Logo symbols ALWAYS (except awning)
- **What:** Dimensional cabinet with illuminated face
- **Depth:** 3-6 inches typical
- **Face:** Translucent acrylic or polycarbonate
- **Lighting:** Internal LEDs

### Individual Channel Letters
- **When:** Business names/text ALWAYS (except awning)
- **What:** Each letter is a separate 3D element
- **Depth:** 2-4 inches typical (letter returns)
- **Material:** Fabricated aluminum or acrylic
- **Not:** Flat panel, light box, or single piece

### Awning Application
- **When:** Reference style = "awning"
- **What:** Printed or applied graphics on fabric
- **Construction:** No 3D fabrication
- **Both:** Logo and text printed on awning surface

---

## Lighting Modes Quick Reference

| Mode | Face | Behind | Use Case | Effect |
|------|------|--------|----------|--------|
| **Front-lit** | ✓ Glowing | ✗ | 24/7 businesses | Bright, even face glow |
| **Back-lit (Halo)** | ✗ | ✓ Glowing | Premium branding | Wall halo, no face glow |
| **Front & Back** | ✓ Glowing | ✓ Glowing | Flagship locations | Maximum visibility |
| **No Light** | ✗ | ✗ | Daytime business | Dimensional shadows |

---

## Color Selection Matrix

### Logo Provided (Image 2)
```
✓ Use exact HEX codes from logo
✓ Match Pantone colors precisely
✓ Color accuracy is critical
✗ Do NOT modify logo colors
✗ Do NOT use contextual building colors for logo
```

### Text Only (No Logo)
```
✓ Analyze building materials (brick, stucco, metal)
✓ Consider time of day and lighting
✓ Match architectural style (modern/traditional)
✓ Complement existing color palette
✗ Do NOT use golden guide color
✗ Do NOT select arbitrary colors
✗ Do NOT ignore the building context
```

#### Material/Color Suggestions by Facade Type

| Facade Type | Recommended Materials | Color Options |
|-------------|----------------------|---------------|
| **Red Brick** | Brushed bronze, brass | #CD7F32 (bronze), #B87333 (copper) |
| **Cream Stucco** | Polished steel, black | #2F4F4F (charcoal), #C0C0C0 (silver) |
| **Glass/Modern** | Brushed aluminum | #A9A9A9 (gray), #000000 (black) |
| **Concrete** | Matte black, steel | #1C1C1C (onyx), #708090 (slate) |
| **Wood Siding** | Bronze, dark green | #654321 (dark wood), #228B22 (forest) |

---

## Mounting Methods

| Type | Description | Depth from Wall | Best For |
|------|-------------|-----------------|----------|
| **Flush** | Direct to surface | 0" | Light boxes, plaques, awnings |
| **Stand-off** | Visible studs/spacers | 1-3" | Channel letters, premium look |
| **Raceway** | Metal wireway box | 2-4" | Multiple letters, complex wiring |

---

## Reference Styles Available

1. **Front Lit Sign**
   - Front illumination, even glow
   - Compatible: front lighting only

2. **Back & Front Lit**
   - Dual illumination
   - Compatible: front, back, both

3. **Back Lit Sign**
   - Halo effect only
   - Compatible: back lighting only

4. **Light Box**
   - Cabinet with illuminated face
   - Compatible: back, both

5. **No Light – 3D Outdoor**
   - Non-illuminated dimensional
   - Compatible: front (daytime visibility)

6. **Awning Sign**
   - Fabric with printed graphics
   - Compatible: front (external lighting)

---

## Common Issues & Solutions

### Problem: AI uses golden guide color for sign
**Fix:** Prompt includes: "DO NOT use the golden yellow from the placement guide as a sign color."

### Problem: Logo colors are modified
**Fix:** Prompt emphasizes: "Use the exact HEX/Pantone colors from Image 2. Color accuracy is critical."

### Problem: Text rendered as light box instead of letters
**Fix:** Construction type specifies: "Individual 3D Channel Letters — each letter is a separate dimensional element."

### Problem: Lighting effect unrealistic
**Fix:** Detailed technical description: "Back-lit (Halo) — solid faces with LEDs behind letters, creating halo glow on wall."

### Problem: Building facade is altered outside golden zone
**Fix:** Preservation mandate: "All pixels outside golden zone must remain unchanged — preserve materials, textures, shadows."

---

## Validation Checklist

Before submitting a prompt to Gemini 2.5:

- [ ] **Case identified:** A (logo) / B (text) / C (both)
- [ ] **Construction type correct:** Light box for logo, channel letters for text
- [ ] **Color protocol matched:** Exact for logo, contextual for text
- [ ] **Lighting description technical:** LED placement, glow type specified
- [ ] **Mounting method clear:** Flush/stand-off/raceway
- [ ] **Golden zone emphasized:** Exclusive replacement area
- [ ] **Preservation mandated:** No changes outside golden zone
- [ ] **Result format specified:** Photorealistic 16:9
- [ ] **Awning exception handled:** If reference.id === "awning"

---

## Code Location Reference

### Main Files
```
lib/ai/variation-planner.ts    - Prompt builder logic
lib/ai/provider.ts             - Gemini system instruction
lib/references.ts              - Reference style definitions
types/index.ts                 - Type definitions
```

### Key Functions
```typescript
// Generate variation specs with prompts
planVariations(references, count, brandText, brandMode)

// Build individual prompt (called by planDeterministic)
buildPrompt({ brandText, reference, mount, lightMode, brandMode })

// Get lighting description
getLightingDescription(lightMode, isAwning)

// Get construction type strings
getConstructionType(brandMode, isAwning)
```

---

## Example Invocation

```typescript
import { planVariations } from '@/lib/ai/variation-planner'

const references = [REFERENCE_STYLES[2]] // Back Lit Sign
const count = 3
const brandText = "URBAN BITES"
const brandMode = "text-only"

const specs = await planVariations(references, count, brandText, brandMode)

// specs[0].prompt will contain:
// "This is a premium architectural signage visualization...
//  CASE B: TEXT ONLY
//  Render the business name "URBAN BITES"...
//  Business names/letters are rendered as Individual 3D Channel Letters..."
```

---

## Workflow Summary

1. **User uploads** storefront image and optionally logo
2. **User selects** reference style (lighting/mounting type)
3. **System determines** brand mode (logo-only/text-only/logo-and-text)
4. **planVariations** generates 1/3/6 variation specs
5. **buildPrompt** creates architectural prompt for each spec
6. **Helper functions** inject lighting and construction details
7. **API route** sends prompt + images to Gemini 2.5
8. **Gemini generates** photorealistic signage visualization
9. **System composites** result back onto original image (if Gemini provider)

---

## Integration Points

### From Frontend
```typescript
// components/generate-flow.tsx sends:
{
  storefrontFile: File,
  brandAssetFile?: File,
  brandText?: string,
  selectedReferences: ReferenceStyle[],
  variationCount: 1 | 3 | 6,
  selectedProvider: "gemini-2.5" | "fal" | etc.
}
```

### To Gemini API
```typescript
// lib/ai/provider.ts → generateWithGemini()
ai.models.generateContent({
  model: "gemini-2.5-flash-image",
  contents: [{
    role: "user",
    parts: [
      { text: fullPrompt },           // From buildPrompt()
      { inlineData: storefrontImage }, // Image 1
      { inlineData: logoImage }        // Image 2 (if provided)
    ]
  }],
  config: {
    responseModalities: ["TEXT", "IMAGE"],
    systemInstruction: SIGN_SYSTEM_INSTRUCTION
  }
})
```

---

## Tips for Optimal Results

1. **Golden Zone Accuracy:** Paint the replacement area precisely; AI follows this mask
2. **High-Quality Inputs:** Use well-lit, high-resolution storefront photos
3. **Logo Clarity:** Provide clean logo files (vector exports or high-res PNGs)
4. **Context Matters:** Better results when building facade is clear and well-lit
5. **Reference Selection:** Choose reference that matches desired aesthetic and lighting
6. **Variation Count:** Use 3 or 6 for exploring multiple design approaches

---

## Further Reading

- **PROMPT_ARCHITECTURE.md** - Comprehensive system documentation
- **EXAMPLE_PROMPTS.md** - Real generated prompts with explanations
- **lib/references.ts** - Available reference style definitions
- **types/index.ts** - Type definitions and data structures
