# Golden Zone Boundary Constraint Fix

## Problem Identified

The generated sign text "VALERIA" was extending beyond the golden marked zone boundaries, overlapping into areas that should remain unchanged.

**Visual Issue:**
```
┌─────────────────────────────────┐
│ Building Facade                 │
│   ┌──────────────┐              │
│   │ Golden Zone  │              │
│   └──────────────┘              │
│   V A L E R I A ← extends past  │
│       ↑ overflow                │
└─────────────────────────────────┘
```

## Root Cause

The prompt instructions told Gemini to:
- "Remove and replace pixels in the golden zone"
- "Generate a sign in that exact space"

BUT it **did not explicitly state** that the sign must FIT WITHIN the zone boundaries. Gemini interpreted "in that exact space" as a general location rather than a strict size constraint.

## Changes Made

### 1. System Instruction (`lib/ai/provider.ts`)

**Updated Golden Zone Rule (lines 93-98):**

**Before:**
```
THE GOLDEN ZONE RULE:
1. Image 1 contains gold/yellow highlighted area — MASK for pixels to REMOVE and REPLACE
2. This is NOT an overlay. Remove these pixels, generate physically mounted sign
3. All pixels outside golden zone remain untouched
4. Golden overlay is placement guide. Remove it; NOT a brand color.
```

**After:**
```
THE GOLDEN ZONE RULE:
1. Image 1 contains gold/yellow highlighted area — MASK for pixels to REMOVE and REPLACE
2. This is NOT an overlay. Remove these pixels, generate physically mounted sign
3. ✨ CRITICAL BOUNDARY CONSTRAINT: Sign MUST FIT COMPLETELY WITHIN golden zone 
   boundaries. NO letters, elements, or shadows should extend beyond golden edges. 
   Scale the sign to fit within these boundaries.
4. All pixels outside golden zone remain untouched
5. Golden overlay is placement guide. Remove it; NOT a brand color.
```

### 2. User Prompt - Base Instructions (`lib/ai/variation-planner.ts` lines 163-177)

**Added Explicit Size Constraint:**
```typescript
const baseInstructions = [
  `Image 1 shows the building with GOLD HIGHLIGHTED ZONE — MASK...`,
  `Remove highlighted pixels and generate sign in that exact space.`,
  `Golden yellow is placement guide — remove completely. NOT a brand color.`,
  ``,
  `✨ CRITICAL SIZE CONSTRAINT: The sign MUST FIT COMPLETELY WITHIN the golden 
  zone boundaries. Scale letters/elements to fit within the marked area. 
  NO part of the sign (letters, edges, shadows) should extend beyond golden 
  zone edges. If text is too long, reduce letter size or tighten spacing to 
  fit within boundaries.`,
  ``,
  `All pixels outside golden zone remain UNTOUCHED...`,
]
```

### 3. User Prompt - Text-Only Primary Requirements (lines 200-208)

**Added Brand-Name-Specific Sizing:**
```typescript
const primaryRequirements = [
  `PRIMARY OBJECTIVE: Render "${brandText}" as 3D channel letters in golden zone.`,
  ``,
  `✨ CRITICAL SIZING: The complete text "${brandText}" MUST FIT ENTIRELY within 
  the golden zone boundaries shown in Image 1. Scale the letters appropriately 
  so the full word fits. If "${brandText}" is long, reduce letter size or tighten 
  spacing to ensure it fits completely within marked area. NO letters should 
  extend beyond golden zone edges.`,
  ``,
  colorSpec,
  ``,
  `TYPOGRAPHY REQUIREMENT: ${fontDescription}...`,
]
```

## Key Improvements

### 1. **Triple Reinforcement**
The boundary constraint is now stated THREE times:
- System instruction (permanent)
- Base instructions (every prompt)
- Primary requirements for text-only (highest priority)

### 2. **Specific Scaling Guidance**
Not just "fit within" but also "HOW to fit":
- "Scale the letters appropriately"
- "Reduce letter size"
- "Tighten spacing"

### 3. **Explicit NO Extension Rule**
- "NO letters should extend beyond golden zone edges"
- "NO part of the sign (letters, edges, shadows) should extend beyond"

### 4. **Brand-Name-Aware**
The constraint mentions the actual brand name:
```
The complete text "VALERIA" MUST FIT ENTIRELY within the golden zone boundaries
```

This makes it concrete rather than abstract.

## How It Works

### Before Fix:
```
Prompt: "Generate sign in the golden zone"
Gemini: ✅ Signs exists in/near golden area
        ❌ But extends beyond boundaries
```

### After Fix:
```
Prompt: "Generate 'VALERIA' sign that MUST FIT COMPLETELY WITHIN golden zone.
         Scale letters to fit. NO letters extend beyond edges."
Gemini: ✅ Sign exists in golden area
        ✅ Sign is scaled to fit within boundaries
        ✅ No overflow beyond edges
```

## Testing Scenarios

### Scenario 1: Short Business Name
- **Name**: "CAFE"
- **Expected**: 4 large letters comfortably within golden zone
- **Constraint**: Should not artificially shrink if space allows

### Scenario 2: Medium Business Name
- **Name**: "VALERIA"
- **Expected**: 7 letters scaled to fit golden zone width
- **Constraint**: All letters visible and readable

### Scenario 3: Long Business Name
- **Name**: "RESTAURANT GIOVANNI"
- **Expected**: Smaller letters OR tighter spacing to fit
- **Constraint**: Complete text within boundaries, still readable

### Scenario 4: Very Long Name
- **Name**: "THE METROPOLITAN BISTRO & WINE BAR"
- **Expected**: Significantly smaller letters or multi-line layout
- **Constraint**: If too long for single line, consider stacking

## Verification

After regenerating with "VALERIA":

1. **Check Left Edge**: First letter 'V' should not extend left of golden zone
2. **Check Right Edge**: Last letter 'A' should not extend right of golden zone
3. **Check Top/Bottom**: Letter heights should respect vertical boundaries
4. **Check Shadows**: Even dimensional shadows should stay within or minimally beyond

## Edge Cases Handled

### Long Text Handling
```typescript
If text is too long, reduce letter size or tighten spacing to fit within boundaries.
```

This tells Gemini it has TWO options:
1. Make letters smaller
2. Reduce spacing between letters

### Multi-Word Names
For names like "CAFE PARIS", Gemini can:
- Stack vertically ("CAFE" over "PARIS")
- Reduce size to fit horizontally
- Combine approaches

### Shadow Constraints
```
NO part of the sign (letters, edges, shadows) should extend beyond
```

Even 3D dimensional shadows are constrained.

## Rollback Plan

If this causes signs to be too small or cramped:

```bash
git checkout lib/ai/provider.ts
git checkout lib/ai/variation-planner.ts
```

Alternative: Soften language from "MUST FIT" to "should generally fit" and remove "NO letters extend" to give Gemini slight overflow tolerance.

## Related Issues

- If golden zone is too small for readable text, consider:
  1. Larger golden zone in step-placement
  2. Shorter business name
  3. Abbreviated version (e.g., "METROPOLITAN" → "METRO")

- If letters are too small to read:
  1. Increase golden zone size
  2. Use condensed font style
  3. Multi-line layout
