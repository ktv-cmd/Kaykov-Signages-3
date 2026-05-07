# Font and Color Selection Feature for Text-Only Mode

## Overview
Added client-facing font and color selection controls for text-only signage mode, allowing users to choose from 3 professional font styles and a full range of colors for their business name.

---

## Feature Components

### 1. Font Style Selection
Three professional font options optimized for architectural signage:

| Font ID | Name | Description | Use Cases |
|---------|------|-------------|-----------|
| `modern-sans` | Modern Sans | Geometric, clean lines, contemporary feel (Futura, Avant Garde, Gotham) | Tech companies, modern retail, startups |
| `classic-serif` | Classic Serif | Traditional, elegant, timeless (Trajan, Times Roman, Garamond) | Law offices, restaurants, professional services |
| `bold-condensed` | Bold Condensed | Industrial, impactful, space-efficient (Impact, Univers, Trade Gothic) | Gyms, automotive, industrial businesses |

### 2. Color Selection
Two methods for choosing letter color:

#### A. Color Presets (8 options)
Professional signage colors with hex codes:

| Color Name | Hex Code | Material Reference | Best For |
|------------|----------|-------------------|----------|
| Silver | `#C0C0C0` | Brushed aluminum | Modern, high-tech, professional |
| Black | `#1C1C1C` | Matte black finish | Elegant, bold, contemporary |
| Bronze | `#CD7F32` | Brushed bronze | Traditional, upscale, warm |
| Gold | `#D4AF37` | Polished brass | Luxury, jewelry, premium |
| White | `#FFFFFF` | Painted white | Clean, minimal, medical |
| Navy | `#1E3A8A` | Painted navy blue | Corporate, nautical, trustworthy |
| Burgundy | `#7C2D37` | Painted burgundy | Wine bars, restaurants, elegant |
| Forest | `#14532D` | Painted forest green | Organic, outdoor, eco-friendly |

#### B. Custom Color Picker
- HTML5 color input for unlimited color options
- Displays selected color hex code
- Real-time color preview

---

## User Interface

### Visual Design
```
┌─────────────────────────────────────────┐
│ Font Style                              │
├───────────┬───────────┬─────────────────┤
│    Aa     │    Aa     │       Aa        │
│ Modern    │ Classic   │     Bold        │
│  Sans     │  Serif    │  Condensed      │
└───────────┴───────────┴─────────────────┘

Letter Color
┌────┬────┬────┬────┐
│ ⬜ │ ⬛ │ 🟫 │ 🟡 │ Silver / Black / Bronze / Gold
├────┼────┼────┼────┤
│ ⚪ │ 🔵 │ 🍷 │ 🌲 │ White / Navy / Burgundy / Forest
└────┴────┴────┴────┘

Custom Color
[🎨] #CD7F32  ← Color picker + hex display
```

### Conditional Display
- Only appears when:
  1. User selects "Type name" mode
  2. User enters text in the business name field
- Hidden when:
  - "Upload logo" mode is selected
  - "Logo + name" mode is selected
  - Business name field is empty

---

## Technical Implementation

### Type Definitions (`types/index.ts`)
```typescript
export type FontStyle = "modern-sans" | "classic-serif" | "bold-condensed"

export interface TextStyling {
  fontStyle: FontStyle
  color: string  // hex color
}

// Added to FlowState:
textStyling?: TextStyling
```

### State Management (`lib/flow-store.ts`)
```typescript
interface FlowStore extends FlowState {
  setTextStyling: (styling: TextStyling) => void
}

// Implementation:
setTextStyling: (textStyling) => set({ textStyling })
```

### UI Component (`components/steps/step-upload.tsx`)
New `TextStylingSelector` component:
- Font style buttons with visual previews
- 8 color preset buttons with swatches
- Custom color picker with hex display
- Conditional rendering based on brand mode

### Prompt Generation (`lib/ai/variation-planner.ts`)

#### Font Descriptions
```typescript
function getFontDescription(fontStyle?: FontStyle): string {
  "modern-sans": "Modern sans-serif (geometric, clean lines, contemporary). Similar to Futura, Avant Garde, Gotham."
  "classic-serif": "Classic serif (traditional, elegant, timeless). Similar to Trajan, Times Roman, Garamond."
  "bold-condensed": "Bold condensed sans-serif (industrial, impactful). Similar to Impact, Univers Condensed."
}
```

#### Color Application
When `textStyling` is provided:
```
Letter color: #CD7F32 (client-selected). 
Apply this exact color to the letter faces and returns.
```

When `textStyling` is NOT provided (fallback):
```
Analyze building facade materials... Select letter finish that complements:
brushed aluminum (#A9A9A9), polished stainless (#C0C0C0), matte black (#1C1C1C), etc.
```

### API Integration (`app/api/generate/route.ts`)
```typescript
// Parse from form data
const textStylingRaw = formData.get("textStyling") as string | null
const textStyling: TextStyling | undefined = textStylingRaw ? JSON.parse(textStylingRaw) : undefined

// Pass to variation planner
const specs = await planVariations(references, variationCount, resolvedBrandText, brandMode, textStyling)
```

---

## Example Usage

### Scenario 1: Restaurant with Bronze Letters
**User Input:**
- Business Name: "BISTRO NOUVEAU"
- Font Style: Classic Serif
- Color: Bronze (#CD7F32)
- Sign Style: Back Lit

**Generated Prompt Excerpt:**
```
TYPOGRAPHY: Classic serif typeface (traditional, elegant, timeless). Similar to Trajan, 
Times Roman, or Garamond. Well-proportioned with refined serifs. Letters proportional, 
well-spaced, with realistic kerning for fabricated dimensional letters.

Letter color: #CD7F32 (client-selected). Apply this exact color to the letter faces 
and returns.
```

**Result:** Elegant serif letters in brushed bronze finish with halo backlighting

### Scenario 2: Gym with Bold Black Letters
**User Input:**
- Business Name: "IRON FORGE"
- Font Style: Bold Condensed
- Color: Black (#1C1C1C)
- Sign Style: Front Lit

**Generated Prompt Excerpt:**
```
TYPOGRAPHY: Bold condensed sans-serif (industrial, impactful, space-efficient). Similar 
to Impact, Univers Condensed, or Trade Gothic Bold. Tight letter spacing, strong presence.

Letter color: #1C1C1C (client-selected). Apply this exact color to the letter faces 
and returns.
```

**Result:** Bold condensed letters in matte black with front illumination

### Scenario 3: Tech Company with Modern Silver
**User Input:**
- Business Name: "APEX INNOVATIONS"
- Font Style: Modern Sans
- Color: Silver (#C0C0C0)
- Sign Style: No Light

**Generated Prompt Excerpt:**
```
TYPOGRAPHY: Modern sans-serif typeface (geometric, clean lines, contemporary feel). 
Similar to Futura, Avant Garde, or Gotham.

Letter color: #C0C0C0 (client-selected). Apply this exact color to the letter faces 
and returns.
```

**Result:** Geometric sans-serif letters in brushed aluminum, non-illuminated

---

## Benefits

### For Clients
1. ✅ **Visual Control** - See and select font styles before generation
2. ✅ **Color Certainty** - Choose exact brand colors or complementary finishes
3. ✅ **Ease of Use** - Simple presets + custom picker for flexibility
4. ✅ **Brand Alignment** - Match existing brand guidelines

### For Generation Quality
1. ✅ **Precise Instructions** - AI receives specific font and color directives
2. ✅ **Reduced Ambiguity** - Less guesswork in color selection
3. ✅ **Consistent Results** - Selected colors applied exactly as specified
4. ✅ **Professional Typography** - Font suggestions guide realistic signage choices

---

## Default Behavior

### When Text Styling is NOT Selected
If user doesn't interact with font/color selector:
- Font defaults to contextual selection based on reference style
- Color defaults to facade-complementary analysis
- System uses existing contextual AI logic

### When Text Styling IS Selected
- Font description includes specific typeface references
- Color is applied with "(client-selected)" annotation
- System prioritizes user choice over contextual analysis

---

## Future Enhancements

### Potential Additions
1. **Font Preview** - Show business name in selected font
2. **Material Finish Options** - Brushed vs polished, matte vs gloss
3. **Letter Size Control** - Small, medium, large options
4. **Spacing Adjustment** - Tight, normal, wide kerning
5. **Case Transformation** - All caps, title case, mixed case
6. **Brand Color Import** - Upload logo to extract colors
7. **Complementary Suggestions** - AI-suggested colors based on photo

---

## Files Modified

1. **types/index.ts** - Added `FontStyle` type and `TextStyling` interface
2. **lib/flow-store.ts** - Added `textStyling` state and `setTextStyling` action
3. **components/steps/step-upload.tsx** - Added `TextStylingSelector` component
4. **lib/ai/variation-planner.ts** - Added `getFontDescription()` and text styling logic
5. **app/api/generate/route.ts** - Parse and pass `textStyling` to variation planner
6. **components/steps/step-generate.tsx** - Send `textStyling` in FormData

---

## Testing

### Test Cases

#### 1. Font Selection
- ✅ Click "Type name" → Enter text → Font selector appears
- ✅ Select Modern Sans → Font description updated in prompt
- ✅ Select Classic Serif → Font description updated
- ✅ Select Bold Condensed → Font description updated

#### 2. Color Presets
- ✅ Click Silver → Color changes to #C0C0C0
- ✅ Click Black → Color changes to #1C1C1C
- ✅ Click Bronze → Color changes to #CD7F32
- ✅ All 8 presets work correctly

#### 3. Custom Color Picker
- ✅ Click color picker → Opens native color dialog
- ✅ Select custom color → Hex code updates
- ✅ Custom color applied to prompt

#### 4. Mode Switching
- ✅ Switch from "Type name" to "Upload logo" → Selector hides
- ✅ Switch back to "Type name" → Selector reappears with saved values
- ✅ Switch to "Logo + name" → Selector hides (logo mode)

#### 5. Generation
- ✅ Generate with Modern Sans + Silver → Correct prompt generated
- ✅ Generate with Classic Serif + Bronze → Correct prompt generated
- ✅ Generate without selecting font/color → Defaults to contextual

---

## Conclusion

The font and color selection feature provides clients with precise control over text-only signage appearance while maintaining the system's architectural accuracy. The 3-font + 8-color preset approach balances simplicity with flexibility, while the custom color picker accommodates specific brand requirements.

The feature integrates seamlessly with existing prompt generation logic, enhancing it with client-specified values when provided, and falling back to contextual AI analysis when not.
