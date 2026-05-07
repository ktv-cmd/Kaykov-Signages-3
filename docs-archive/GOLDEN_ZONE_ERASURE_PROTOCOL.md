# Golden Zone Erasure Protocol
## Critical Update: Zero Gold Policy

**Implementation Date**: 2026-04-22  
**Priority**: CRITICAL - Fixes leftover golden artifacts in renders  
**Status**: ✅ DEPLOYED

---

## The Problem Identified

### Issue #1: Golden Residue
When the sign was smaller than the golden zone, **leftover golden pixels remained visible** in the final render, creating yellow artifacts around the sign.

### Issue #2: Ambiguous Mask Treatment
The prompt said "remove the golden overlay" but didn't specify:
- When to remove it (before or after sign insertion?)
- What to replace it with (building texture or nothing?)
- What happens if sign doesn't fill the entire zone?

### Issue #3: Mask vs Material Confusion
Gemini sometimes treated the golden highlight as:
- A texture to blend/fade away (wrong)
- A colored material for the sign (wrong)
- A mask to ignore after reading coordinates (correct but incomplete)

---

## The Solution: 3-Step Erasure Protocol

### NEW RULE: "The Golden Zone is a TEMPORARY MASK, not part of the final scene"

```
ZERO GOLDEN PIXELS may remain in output.
```

---

## Implementation: The 3-Step Sequence

### STEP 1: IDENTIFY MASK
```
Locate all gold/yellow pixels (#FFD740 ±10% tolerance) in Image 1.
This is the construction zone coordinate system.
```

### STEP 2: SURFACE RESTORATION (Critical New Step)
```
BEFORE inserting sign geometry, RECONSTRUCT the underlying building 
surface where gold was painted.

Analyze surrounding facade texture:
- Brick: pattern, color, mortar lines, weathering
- Wood: grain direction, knots, paint color
- Stucco: relief texture, color variation, cracks
- Stone: block pattern, joint spacing, surface texture

INPAINT/RESTORE that texture across the ENTIRE golden zone as if 
the mask never existed. The wall must look continuous and natural.
```

**Why This Matters**:
The golden mask is painted **ON TOP OF** the building facade. We need to "undo" that paint and reveal/reconstruct what's underneath before placing the sign.

### STEP 3: GEOMETRIC INSERTION
```
NOW insert the extruded 3D sign mesh ONTO this restored surface.
The sign acts as a physical structure BOLTED to the restored wall.
```

---

## Coverage Logic (The Critical Rule)

### Scenario A: Sign FILLS Golden Zone
```
┌─────────────────┐
│ GOLDEN ZONE     │  →  Sign geometry covers
│ [Sign fits here]│      entire restored area
└─────────────────┘
```
**Result**: No exposed restored texture (sign covers it all)

---

### Scenario B: Sign is SMALLER than Golden Zone ⚠️
```
┌──────────────────────┐
│ GOLDEN ZONE          │  →  Sign covers center
│   [Small Sign]       │      Exposed edges show
│                      │      RESTORED BRICK TEXTURE
└──────────────────────┘      (NOT gold!)
```
**Result**: Exposed areas show building facade texture, NOT gold

---

### Scenario C: Sign is LARGER than Golden Zone ❌
```
┌─────────────┐
│ GOLDEN ZONE │
│ [Huge Sign Overfl... │  →  ERROR: Scale down sign
                              to fit within boundaries
```
**Result**: Reject and scale down to fit

---

## Before/After Example

### ❌ BEFORE (Golden Residue Problem)
```
Input:  Building with LARGE golden rectangle
Sign:   Small "CAFE" text (30% of golden zone size)
Output: "CAFE" text surrounded by YELLOW BORDER artifacts
Issue:  70% of golden zone still visible as yellow glow
```

### ✅ AFTER (Erasure Protocol)
```
Input:  Building with LARGE golden rectangle
Step 1: Identify golden pixels (#FFD740)
Step 2: RESTORE red brick texture across entire golden zone
Step 3: INSERT small "CAFE" sign onto restored brick
Output: "CAFE" text on RED BRICK wall (no yellow artifacts)
Result: 0% golden pixels remain — restored brick visible around sign
```

---

## Technical Implementation

### System Instruction (`lib/ai/provider.ts` lines 93-108)

```typescript
THE GOLDEN ZONE ERASURE PROTOCOL (Critical Mask Handling):
The gold/yellow highlight in Image 1 is a TEMPORARY PLACEMENT MASK. 
It marks construction area coordinates but is NOT part of the final scene. 
ZERO golden pixels may remain in output.

EXECUTION SEQUENCE:
1. IDENTIFY MASK: Locate all gold/yellow pixels (#FFD740 ±10% tolerance)
2. SURFACE RESTORATION: RECONSTRUCT underlying building surface where 
   gold was painted. Analyze surrounding facade texture and INPAINT/RESTORE 
   across entire golden zone as if mask never existed.
3. GEOMETRIC INSERTION: INSERT extruded 3D sign mesh ONTO restored surface. 
   Sign is BOLTED to restored wall.
4. COVERAGE LOGIC:
   - Sign FILLS zone → Sign covers restored surface
   - Sign SMALLER than zone → Exposed areas show RESTORED TEXTURE (not gold)
   - Sign LARGER than zone → ERROR: Scale down to fit
6. ZERO GOLD POLICY: Final output contains 0% gold/yellow pixels from mask.
```

### User Prompt (`lib/ai/variation-planner.ts` lines 164-174)

```typescript
GOLDEN ZONE ERASURE PROTOCOL:
Image 1 shows a GOLD HIGHLIGHTED MASK (#FFD740) marking construction 
coordinates. This mask is TEMPORARY and must be 100% REMOVED in final output.

STEP 1 - SURFACE RESTORATION: First, ERASE the golden mask and RECONSTRUCT 
the underlying building facade texture (brick pattern, mortar, wood grain, 
stucco, paint). Analyze surrounding wall texture and INPAINT across the 
entire golden zone as if the mask never existed. The wall must look 
continuous and natural.

STEP 2 - GEOMETRIC INSERTION: Now INSERT extruded 3D sign mesh ONTO this 
restored surface. The sign is BOLTED to the restored wall.

STEP 3 - COVERAGE VALIDATION: If sign is SMALLER than original golden zone, 
exposed areas must show RESTORED BUILDING TEXTURE (brick/wood/stone), NOT gold. 
Zero golden pixels may remain visible.
```

---

## Validation Checklist

### Output Must Pass All 4 Tests:

#### ✅ Test #1: Side-Wall Test (3D Proof)
**Question**: Can you see the thickness of any letter?  
**Pass**: At least one letter shows visible side-wall (return plane)  
**Fail**: All letters appear perfectly flat

#### ✅ Test #2: Zero Gold Policy (Mask Removal)
**Question**: Are there any yellow/golden pixels visible?  
**Pass**: 0% golden pixels (#FFD740 ±10%) in final render  
**Fail**: Yellow glow, border, or artifacts around/behind sign

#### ✅ Test #3: Surface Continuity (Texture Restoration)
**Question**: If sign is smaller than golden zone, what fills exposed areas?  
**Pass**: Restored building facade texture (brick/wood/stone) matching surroundings  
**Fail**: Golden color, blank space, or mismatched texture

#### ✅ Test #4: Shadow Authenticity (Depth Proof)
**Question**: Do shadows show depth gradation?  
**Pass**: Multi-plane shadows (dark core + soft penumbra)  
**Fail**: Uniform blur like Photoshop drop-shadow

---

## Why Surface Restoration Matters

### Analogy: Construction Site Logic

**Imagine you're a real sign installer:**

1. **Arrive at site**: Someone painted a golden rectangle on the brick wall (marking where sign should go)
2. **Prepare surface**: First, you REMOVE/SCRUB OFF the golden paint to expose clean brick
3. **Install sign**: Then you BOLT the metal sign structure onto the clean brick
4. **Final result**: Sign mounted on brick. No golden paint visible anywhere.

**The AI must follow the same logic.**

### What Was Happening Before:
```
AI saw golden mask as "this area needs a sign"
AI placed sign texture over golden area
AI left golden pixels visible around/behind sign
Result: Looked like Photoshop layer overlay (not physical installation)
```

### What Happens Now:
```
AI identifies golden mask as temporary construction guide
AI "removes the paint" by reconstructing brick texture underneath
AI "bolts the sign" by inserting 3D geometry onto restored brick
Result: Looks like real fabricator installed physical sign on building
```

---

## Edge Cases Handled

### Case #1: Very Small Sign in Large Golden Zone
**Example**: "CAFE" text in golden zone meant for "METROPOLITAN RESTAURANT"

**Before**: Yellow border around small "CAFE" text  
**After**: "CAFE" text on restored brick, no yellow anywhere

---

### Case #2: Multi-Word Sign with Spacing
**Example**: "CAFE    PARIS" (lots of spacing between words)

**Before**: Yellow visible between words  
**After**: Restored brick visible between words (matches wall)

---

### Case #3: Logo Symbol Smaller than Zone
**Example**: Small circular logo in large rectangular golden zone

**Before**: Yellow rectangle outline around small circular logo  
**After**: Small circular logo on restored brick, rectangular restoration seamless

---

### Case #4: Ornate Typography with Negative Space
**Example**: Script font with lots of space between flourishes

**Before**: Yellow glow filling negative spaces  
**After**: Restored brick visible through negative spaces (natural look)

---

## Prompt Language Comparison

### ❌ OLD (Ambiguous)
```
"Remove the golden overlay — it is purely a placement guide."
```
**Problem**: Doesn't say WHEN to remove it or WHAT to replace it with

### ✅ NEW (Explicit Protocol)
```
"STEP 1: ERASE golden mask and RECONSTRUCT underlying brick texture.
 STEP 2: INSERT sign onto restored surface.
 STEP 3: Verify 0% golden pixels remain (either covered by sign OR 
         showing restored brick texture)."
```
**Solution**: Clear sequence with specific replacement texture

---

## Testing Protocol

### Test Image: "VALERIA" on Red Storefront

**Setup**:
1. Red brick/painted facade
2. Large golden zone (wider than needed for "VALERIA")
3. Navy blue letters (#1E3A8A)

**Expected Output**:
- ✅ Navy "VALERIA" letters with visible thickness
- ✅ Red wall visible to left/right of letters (restored from under golden mask)
- ✅ ZERO golden/yellow pixels anywhere in image
- ✅ Smooth transition between letters and restored red wall
- ✅ Multi-plane shadows on red wall (not on gold)

**Failure Indicators**:
- ❌ Yellow glow around letters
- ❌ Golden border at edges of original mask
- ❌ Yellow visible between letters
- ❌ Sign looks like it's floating on yellow background

---

## Advanced: Texture Analysis Requirements

To properly restore building surface, Gemini must:

### For Brick Facades:
- Identify brick color (average RGB from surrounding bricks)
- Detect brick pattern (running bond, stack bond, herringbone)
- Measure mortar line width and color
- Match weathering (efflorescence, staining patterns)

### For Wood Facades:
- Detect grain direction (horizontal siding, vertical boards)
- Match wood color and aging (fading, graying)
- Preserve knots, cracks, nail holes
- Match paint/stain finish (matte, satin, weathered)

### For Stucco Facades:
- Detect texture relief depth (smooth, Spanish lace, dash)
- Match color variation (not uniform — has subtle mottling)
- Preserve existing cracks or patches
- Match sheen (matte stucco vs painted surface)

### For Stone/Concrete:
- Identify block size and pattern
- Match joint spacing and recessing
- Detect color variation between blocks
- Preserve surface texture (rough, smooth, honed)

---

## Implementation Priority

### Phase 1: ✅ COMPLETE (This Update)
- Added SURFACE RESTORATION step to system instruction
- Added 3-step ERASURE PROTOCOL to user prompts
- Added ZERO GOLD POLICY validation requirement
- Added COVERAGE LOGIC for small-sign scenarios

### Phase 2: Future Enhancements
- Add explicit texture analysis instructions for each facade type
- Add "texture sampling radius" (how far to look for reference pattern)
- Add "seam blending" instructions for restoration boundaries
- Add color calibration (ensure restored texture matches adjacent areas)

---

## Rollback Plan

If texture restoration causes issues:

```bash
git checkout lib/ai/provider.ts
git checkout lib/ai/variation-planner.ts
```

**When to Rollback**:
- If restored texture looks obviously wrong (color mismatch, wrong pattern)
- If sign quality degrades significantly
- If processing time increases excessively

**When to Keep**:
- If golden artifacts are eliminated (even if restoration isn't perfect)
- If overall realism improves
- If texture restoration is reasonable (doesn't need to be perfect)

---

## Key Insight: Order Matters

**WRONG ORDER** (What was happening):
```
1. Insert sign into golden zone
2. Try to remove gold around sign
3. Result: Gold remnants leak through/around sign edges
```

**CORRECT ORDER** (What happens now):
```
1. Restore building surface (erase gold completely)
2. Insert sign onto clean restored surface
3. Result: Sign sits on proper building texture, no gold anywhere
```

---

## Summary

**The Golden Rule**: The golden mask is TEMPORARY scaffolding. Like construction tape, it must be COMPLETELY REMOVED before the job is finished.

**The Fix**: Added explicit 3-step protocol:
1. Identify mask coordinates
2. Restore underlying surface texture
3. Insert sign geometry

**The Result**: 0% golden pixels in final output — either covered by sign or showing restored building facade.

**Test It**: Generate "VALERIA" and check for ANY yellow artifacts. If found = protocol needs refinement. If none = protocol working.
