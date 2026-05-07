# Color & Font Instruction Fix

## Problem Identified

Gemini was not following the client-selected color and font style instructions. The generated signs showed inconsistent styling despite clear specifications in the prompt.

### Root Cause

**Conflicting Instructions Between System Instruction and User Prompt:**

1. **System Instruction** (permanent, sent with every request):
   ```
   TEXT ONLY: Analyze building facade materials... 
   Select letter finishes that complement: brushed aluminum, polished stainless, matte black...
   ```

2. **User Prompt** (per-request):
   ```
   Letter color: #1E3A8A (client-selected). Apply this exact color...
   TYPOGRAPHY: Classic serif typeface...
   ```

Gemini was receiving contradictory guidance - the system instruction told it to "analyze and select" colors, while the user prompt said "use this exact color." The AI prioritized the broader system instruction over the specific user requirement.

## Changes Made

### 1. Updated System Instruction (`lib/ai/provider.ts`)

**Color Integrity Section (lines 122-127):**
```typescript
COLOR INTEGRITY:
- LOGO PROVIDED (Image 2): Use exact HEX/Pantone colors from logo file. 
  This is the brand's identity — color accuracy is non-negotiable.
  
- TEXT ONLY WITH CLIENT COLOR: If the prompt specifies an exact color 
  (e.g., "Letter color: #1E3A8A"), use that EXACT color on letter faces 
  and returns. This is a client selection — color accuracy is non-negotiable.
  
- TEXT ONLY WITHOUT CLIENT COLOR: If no specific color is provided, 
  analyze building facade materials and select complementary finishes.
  
- NEVER use the golden guide color (#FFD740) as a sign color.
```

**Added Typography Guidance (line 102):**
```typescript
- TYPOGRAPHY: If the prompt specifies a font style (e.g., "Classic serif 
  typeface similar to Trajan"), follow that EXACT typographic direction. 
  Letter proportions, serifs, and spacing must match the specified style family.
```

### 2. Strengthened User Prompt (`lib/ai/variation-planner.ts`)

**Restructured Prompt Priority:**
- Moved critical requirements (brand name, color, typography) to the TOP of the prompt
- Gemini processes information sequentially and prioritizes early content

**Enhanced Color Specification (line 194):**
```typescript
CRITICAL COLOR REQUIREMENT: Letter color MUST BE #1E3A8A (client-selected HEX). 
This is NON-NEGOTIABLE. Apply this EXACT color to all letter faces and returns. 
DO NOT modify, interpret, or adjust this color. 
DO NOT use facade-complementary colors. 
DO NOT use golden yellow (#FFD740). 
USE ONLY #1E3A8A.
```

**Enhanced Typography Specification (line 200):**
```typescript
TYPOGRAPHY REQUIREMENT: Classic serif typeface (traditional, elegant, timeless). 
Similar to Trajan, Times Roman, or Garamond. Well-proportioned with refined serifs. 
This typography style is CLIENT-SPECIFIED and MANDATORY. Letters must be proportional, 
well-spaced, with realistic kerning appropriate for fabricated dimensional letters.
```

**New Prompt Structure (lines 191-220):**
```typescript
if (brandMode === "text-only") {
  // PRIMARY REQUIREMENTS FIRST (highest priority)
  const primaryRequirements = [
    `PRIMARY OBJECTIVE: Render "${brandText}" as 3D channel letters`,
    colorSpec,
    `TYPOGRAPHY REQUIREMENT: ${fontDescription}`,
  ]
  
  // THEN base instructions (context)
  // THEN construction details (implementation)
  // THEN result description (validation)
}
```

## Key Improvements

### 1. **Eliminated Conflicts**
- System instruction now explicitly supports client-selected colors
- No contradictory guidance between system and user prompts

### 2. **Prioritized Critical Info**
- Brand name, color, and font specifications appear FIRST in the prompt
- Gemini sees these requirements before processing technical details

### 3. **Increased Emphasis**
- Changed from passive ("apply this color") to active commands ("MUST BE", "NON-NEGOTIABLE")
- Multiple repetitions of color value (#1E3A8A mentioned 3 times)
- Explicit "DO NOT" instructions for common failure modes

### 4. **Clear Hierarchy**
```
PRIMARY OBJECTIVE → Brand name
CRITICAL COLOR → Exact HEX
TYPOGRAPHY REQUIREMENT → Font style
─────────────────────────────────
Context (base instructions)
Construction details
Technical specifications
Result description
```

## Testing

To verify the fix works:

1. **Test with client color & font:**
   - Business name: "Valeria"
   - Color: #1E3A8A (Navy)
   - Font: Classic Serif
   - Expected: Navy blue classic serif letters

2. **Test without client selections:**
   - Business name: "Cafe Paris"
   - No color/font specified
   - Expected: Facade-complementary colors, appropriate typeface

3. **Check terminal logs:**
   ```bash
   # The logged prompt should now show:
   PRIMARY OBJECTIVE: Render the business name "Valeria" as 3D individual channel letters
   CRITICAL COLOR REQUIREMENT: Letter color MUST BE #1E3A8A...
   TYPOGRAPHY REQUIREMENT: Classic serif typeface... CLIENT-SPECIFIED and MANDATORY
   ```

## Expected Impact

- **Color Accuracy**: Gemini will use the exact client-selected HEX color
- **Font Consistency**: Typography will match the specified style family
- **Fewer Retries**: Reduced need to regenerate due to styling errors
- **Better Brand Compliance**: Signs match client brand guidelines

## Rollback Plan

If this causes issues, revert these two files:
```bash
git checkout lib/ai/provider.ts
git checkout lib/ai/variation-planner.ts
```

The previous version had softer language that gave Gemini more creative freedom but less accuracy for client specifications.
