# Safety Validation Rules

## Overview

These validation rules ensure that prompt generation never produces invalid or undesirable sign configurations. They act as **safety gates** before prompt generation.

**Location**: `lib/ai/variation-planner.ts` → `planDeterministic()` function

---

## Rule 1: NEON PROHIBITION ⛔

### Purpose
Neon signs are explicitly forbidden due to safety, energy efficiency, and modern signage standards.

### Implementation
```typescript
// 1. NEON CHECK: Neon is forbidden - overwrite to "No-lit"
if (reference.lightingType === "neon" || reference.compatibleLightModes.includes("neon" as any)) {
  console.warn('[SAFETY] Neon lighting detected - overriding to no-light mode')
  reference = {
    ...reference,
    lightingType: "front",
    compatibleLightModes: ["front"]
  }
}
```

### Behavior
- **Check**: Scans `reference.lightingType` and `reference.compatibleLightModes` for "neon"
- **Action**: Overrides to front-lit (non-illuminated) mode
- **Log**: Warns in console for debugging
- **Result**: No neon signs can be generated

### Why Front-Lit Override?
- Front-lit is the safest default
- Most compatible with all sign types
- Won't break prompt generation

---

## Rule 2: COLOR VALIDATION ✅

### Purpose
Ensures every sign has a valid color, preventing undefined or null color values.

### Implementation
```typescript
// 2. COLOR VALIDATION: Ensure valid color with fallback
const finalColor = textStyling?.color || "#C0C0C0" // Default: brushed silver (most common)
const validatedTextStyling: TextStyling = {
  fontStyle: textStyling?.fontStyle || "modern-sans",
  color: finalColor
}
```

### Behavior
- **Check**: `textStyling?.color` exists?
- **Fallback**: `#C0C0C0` (brushed silver/chrome)
- **Result**: Always has a valid hex color

### Default Color Choice
**#C0C0C0 (Brushed Silver/Chrome)**
- Most common professional sign finish
- Works with any building facade
- Neutral, elegant appearance
- Industry standard

### Fallback Chain
```
User Selection → #C0C0C0 → Always Valid Color
```

---

## Rule 3: AWNING OVERRIDE 🏕️

### Purpose
Awnings have special physical constraints - they cannot have external spotlights or neon.

### Implementation
```typescript
// 3. AWNING OVERRIDE: Awnings MUST be internally lit (no external lights)
const isAwning = reference.id === "awning"
if (isAwning) {
  console.log('[SAFETY] Awning detected - forcing internal/natural lighting mode')
  reference = {
    ...reference,
    lightingType: "front", // Internal glow (will be overridden in prompt to natural light)
    compatibleLightModes: ["front"] // Single mode for awnings
  }
}
```

### Behavior
- **Check**: Is `reference.id === "awning"`?
- **Action**: Forces single lighting mode
- **Result**: Awning prompts use natural daylight only

### Why This Matters
Awnings are **fabric structures**:
- ❌ Cannot have LED channel letters
- ❌ Cannot have halo backlighting
- ❌ Cannot have spotlight illumination
- ✅ Can have printed graphics only
- ✅ May have external gooseneck lamps (not part of sign)

### Prompt Override
In `buildPrompt()`, awnings get special instructions:
```
AWNING LIGHTING: Realistic natural daylight only. 
NO glow, NO neon, NO artificial lighting effects.
```

---

## Rule 4: LOGO ASSET CHECK 📦

### Purpose
Ensures text styling is only applied when text is present in the sign.

### Implementation
```typescript
// 4. LOGO ASSET CHECK: Use validated styling
const effectiveTextStyling = brandMode === "text-only" || brandMode === "logo-and-text" 
  ? validatedTextStyling 
  : undefined
```

### Behavior

| Brand Mode | Has Text? | Text Styling Applied? |
|------------|-----------|----------------------|
| `text-only` | ✅ Yes | ✅ Yes |
| `logo-and-text` | ✅ Yes | ✅ Yes |
| `logo-only` | ❌ No | ❌ No (not needed) |

### Why This Matters
- **Logo-only**: No text → color/font styling irrelevant
- **Text-only**: Text → color/font applied from user selection or defaults
- **Logo + Text**: Text → color extracted from logo (or defaults)

### Data Flow
```
Logo-only     → effectiveTextStyling = undefined
Text-only     → effectiveTextStyling = validatedTextStyling
Logo + Text   → effectiveTextStyling = validatedTextStyling (with logo color)
```

---

## Complete Validation Flow

```
┌─────────────────────────────────────────────────────────────┐
│         INPUT: reference, brandMode, textStyling            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  RULE 1: Check for "neon"                                   │
│  → If found: Override to front-lit                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  RULE 2: Validate color                                     │
│  → If null/undefined: Use #C0C0C0 (silver)                  │
│  → Create validatedTextStyling                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  RULE 3: Check for awning                                   │
│  → If awning: Force front-lit mode (natural light)          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  RULE 4: Apply styling conditionally                        │
│  → text-only or logo-and-text: Use validatedTextStyling     │
│  → logo-only: Don't apply text styling                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│         OUTPUT: Safe, validated configuration               │
└─────────────────────────────────────────────────────────────┘
```

---

## Examples

### Example 1: Neon Prevention
**Input**:
```typescript
reference = {
  id: "custom-neon",
  lightingType: "neon",
  compatibleLightModes: ["neon"]
}
```

**After Validation**:
```typescript
reference = {
  id: "custom-neon",
  lightingType: "front",      // ← Changed
  compatibleLightModes: ["front"]  // ← Changed
}
// Console: "[SAFETY] Neon lighting detected - overriding to no-light mode"
```

---

### Example 2: Color Fallback
**Input**:
```typescript
brandMode = "text-only"
textStyling = { fontStyle: "modern-sans", color: null }  // No color!
```

**After Validation**:
```typescript
validatedTextStyling = {
  fontStyle: "modern-sans",
  color: "#C0C0C0"  // ← Fallback applied
}
```

**Prompt Receives**:
```
CRITICAL COLOR REQUIREMENT: Letter color MUST BE #C0C0C0...
```

---

### Example 3: Awning Override
**Input**:
```typescript
reference = {
  id: "awning",
  lightingType: "both",
  compatibleLightModes: ["front", "back", "both"]
}
```

**After Validation**:
```typescript
reference = {
  id: "awning",
  lightingType: "front",      // ← Forced
  compatibleLightModes: ["front"]  // ← Single mode
}
// Console: "[SAFETY] Awning detected - forcing internal/natural lighting mode"
```

**Prompt Generated**:
```
AWNING LIGHTING: Realistic natural daylight only. 
NO glow, NO neon, NO artificial lighting effects.
```

---

### Example 4: Logo-Only (No Text Styling)
**Input**:
```typescript
brandMode = "logo-only"
textStyling = { fontStyle: "bold-condensed", color: "#FF5733" }
```

**After Validation**:
```typescript
effectiveTextStyling = undefined  // ← Not applied
```

**Prompt Generated**:
```
CASE A: LOGO ONLY
Image 2 contains the logo artwork. Use exact HEX/Pantone colors from Image 2.
// No font or color instructions for text (because there is no text)
```

---

## Console Logging

### Warning Logs
```
[SAFETY] Neon lighting detected - overriding to no-light mode
```
**When**: Neon is detected in reference
**Purpose**: Alert developers to potential configuration issues

### Info Logs
```
[SAFETY] Awning detected - forcing internal/natural lighting mode
```
**When**: Awning reference is used
**Purpose**: Confirm special awning handling is active

---

## Testing the Rules

### Test 1: Neon Rejection
```typescript
const reference = { lightingType: "neon", ... }
planDeterministic(reference, 1, "Test", "text-only")
// Expected: Console warning + override to front-lit
```

### Test 2: Color Fallback
```typescript
const textStyling = { fontStyle: "modern-sans", color: undefined }
planDeterministic(reference, 1, "Test", "text-only", textStyling)
// Expected: finalColor = "#C0C0C0"
```

### Test 3: Awning Special Case
```typescript
const awning = { id: "awning", ... }
planDeterministic(awning, 1, "Test", "text-only")
// Expected: Console log + single lighting mode
```

### Test 4: Logo-Only No Styling
```typescript
planDeterministic(reference, 1, "Test", "logo-only", textStyling)
// Expected: effectiveTextStyling = undefined
```

---

## Benefits

### 1. **Safety First** 🛡️
- Prevents invalid sign configurations
- No neon signs can slip through
- Awnings can't have impossible lighting

### 2. **Guaranteed Defaults** ✅
- Every text sign has a color
- Every text sign has a font
- No undefined/null errors

### 3. **Developer Experience** 🔧
- Console warnings for debugging
- Clear validation logic
- Easy to extend with new rules

### 4. **User Experience** 🎨
- Professional results even with incomplete input
- Sensible defaults (silver, modern sans)
- No broken sign generations

---

## Future Extensions

### Potential Additional Rules:

```typescript
// Rule 5: Material validation
if (lightMode === "back" && material === "metal") {
  // Metal can't be backlit - override
}

// Rule 6: Text length validation
if (brandText.length > 30) {
  console.warn('[SAFETY] Text too long - may not fit in golden zone')
}

// Rule 7: Color contrast validation
if (isLightBackground && isLightColor) {
  // Poor contrast - suggest darker color
}
```

---

## Summary

These **4 safety rules** ensure:

1. ✅ **No neon signs** (prohibited)
2. ✅ **Always valid colors** (fallback to silver)
3. ✅ **Awnings use natural light** (no artificial glow)
4. ✅ **Text styling only when needed** (logo-only doesn't need it)

**Result**: Bulletproof prompt generation that produces professional, realistic signage every time! 🎯
