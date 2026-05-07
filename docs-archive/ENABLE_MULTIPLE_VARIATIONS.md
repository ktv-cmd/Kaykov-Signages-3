# Enable Multiple Image Generations (2-3 Variations)

**Current Status**: System supports 1, 3, or 6 variations, but the variations step is **hidden**  
**Goal**: Enable users to choose 2 or 3 images per generation

---

## Current System Capabilities

Your system already has a complete variation system built in:

### Variation Counts Available:
- ✅ **1 design** - Single focused result
- ✅ **3 designs** - Three style-consistent variations
- ✅ **6 designs** - Six curated options

### What Varies Between Designs:
- Letter depth (shallow → deep)
- Edge profile (sharp, beveled, rounded)
- Mounting style (flush, stand-off, raceway)
- Backing plate on/off
- Subtle material differences

**Note**: Lighting is fixed by the chosen reference style

---

## How It Currently Works

### Flow Structure:
```
Upload → Placement → [Variations - HIDDEN] → Generate → [Select] → Download
```

### Current Behavior:
1. Variations step is **skipped** (Line 83 in `flow-store.ts`)
2. Default is **1 variation** (Line 68 in `flow-store.ts`)
3. Select step only shows if variationCount > 1

---

## Option 1: Enable Variations Step (Recommended)

This allows users to choose 1, 3, or 6 variations.

### Step 1: Update Flow Store

**File**: `lib/flow-store.ts`

**Change Lines 83-85** (goNext function):
```typescript
// BEFORE (variations step skipped):
if (currentStep === "placement") {
  nextStep = "generate"
}

// AFTER (enable variations step):
if (currentStep === "placement") {
  nextStep = "variations"  // ← Changed from "generate" to "variations"
}
```

**Change Lines 100-103** (goBack function):
```typescript
// BEFORE:
if (currentStep === "generate") {
  previousStep = "placement"
}

// AFTER:
if (currentStep === "generate") {
  previousStep = "variations"  // ← Changed from "placement" to "variations"
}
```

### Step 2: Update Generate Flow UI

**File**: `components/generate-flow.tsx`

**Change Line 31**:
```typescript
// BEFORE (variations step hidden in UI):
const visibleSteps = allSteps.filter(
  (s) => !(s === "variations" || (s === "select" && variationCount === 1))
)

// AFTER (show variations step):
const visibleSteps = allSteps.filter(
  (s) => !(s === "select" && variationCount === 1)
)
```

### Result:
```
Upload → Placement → Variations (Choose 1/3/6) → Generate → [Select if >1] → Download
```

Users will see this screen:

```
┌────────────────────────────────────────────┐
│  How many design options?                  │
│                                            │
│  ○ 1 design                                │
│    One focused result                      │
│                                            │
│  ○ 3 designs                               │
│    Three style-consistent variations       │
│                                            │
│  ○ 6 designs                               │
│    Six curated options                     │
│                                            │
│  [Continue]                                │
└────────────────────────────────────────────┘
```

---

## Option 2: Add "2 Variations" Option

If you want exactly 2 variations (not 3), you need to add it.

### Step 1: Update Type Definition

**File**: `types/index.ts`

Find:
```typescript
export type VariationCount = 1 | 3 | 6
```

Change to:
```typescript
export type VariationCount = 1 | 2 | 3 | 6
```

### Step 2: Add Option to UI

**File**: `components/steps/step-variations.tsx`

**Add to OPTIONS array (Line 7-23)**:
```typescript
const OPTIONS: { count: VariationCount; label: string; sublabel: string }[] = [
  {
    count: 1,
    label: "1 design",
    sublabel: "One focused result based on your selected style",
  },
  {
    count: 2,  // ← NEW
    label: "2 designs",
    sublabel: "Two variations with different depth or mounting styles",
  },
  {
    count: 3,
    label: "3 designs",
    sublabel: "Three style-consistent variations — subtle depth, material, and edge differences",
  },
  {
    count: 6,
    label: "6 designs",
    sublabel: "Six curated options for broader exploration — all anchored to your chosen style",
  },
]
```

### Step 3: Update Variation Planner Logic

**File**: `lib/ai/variation-planner.ts`

**Find the depthMatrix, edgeMatrix, mountMatrix (Lines 96-112)**:

Add case for 2 variations:
```typescript
const depthMatrix = {
  1: [reference.depthStyle],
  2: ["shallow", "deep"],  // ← NEW
  3: ["shallow", "medium", "deep"],
  6: ["flat", "shallow", "medium", "medium", "deep", "deep"],
}[count]

const edgeMatrix = {
  1: ["sharp"],
  2: ["sharp", "rounded"],  // ← NEW
  3: ["sharp", "beveled", "rounded"],
  6: ["sharp", "sharp", "beveled", "beveled", "rounded", "rounded"],
}[count]

const mountMatrix = {
  1: [reference.mountingStyle],
  2: [reference.mountingStyle, "stand-off"],  // ← NEW
  3: [reference.mountingStyle, "stand-off", "flush"],
  6: ["flush", "stand-off", "raceway", "flush", "stand-off", "raceway"],
}[count]
```

---

## Option 3: Set Default to 3 Variations

If you want all users to always get 3 variations without choosing:

**File**: `lib/flow-store.ts`

**Change Line 68**:
```typescript
// BEFORE:
const initialState: FlowState = {
  currentStep: "upload",
  selectedReferences: [],
  variationCount: 1,  // ← Default is 1
  placement: DEFAULT_PLACEMENT,
}

// AFTER:
const initialState: FlowState = {
  currentStep: "upload",
  selectedReferences: [],
  variationCount: 3,  // ← Changed to 3
  placement: DEFAULT_PLACEMENT,
}
```

**Also change Line 83** to skip variations step:
```typescript
// Keep this to skip variations step:
if (currentStep === "placement") {
  nextStep = "generate"  // Skip directly to generate
}
```

**Result**: Users always get 3 variations, no choice screen shown.

---

## Recommended Implementation

I recommend **Option 1** (Enable Variations Step) because:

✅ Gives users control  
✅ System already built and tested  
✅ Only 4 lines of code to change  
✅ Clear UI already designed  
✅ Works with all existing logic  

---

## Quick Implementation (Option 1)

### File 1: `lib/flow-store.ts`

```typescript
// Line 83-85: Enable forward navigation to variations
if (currentStep === "placement") {
  nextStep = "variations"  // Changed from "generate"
}

// Line 100-103: Enable backward navigation from generate
if (currentStep === "generate") {
  previousStep = "variations"  // Changed from "placement"
}
```

### File 2: `components/generate-flow.tsx`

```typescript
// Line 31: Show variations step in UI
const visibleSteps = allSteps.filter(
  (s) => !(s === "select" && variationCount === 1)  // Removed "variations" from filter
)
```

**That's it!** 3 small changes enable the full variations system.

---

## Testing After Implementation

1. Navigate to `/generate`
2. Upload storefront and brand
3. Paint placement
4. **NEW**: You'll now see "How many design options?" screen
5. Choose 1, 3, or 6 designs
6. Generate
7. If you chose 3 or 6, you'll see a selection grid
8. Pick your favorite
9. Download

---

## Current Files Structure

```
lib/
  flow-store.ts          ← Flow navigation logic (CHANGE HERE)
  ai/
    variation-planner.ts ← Generates different prompts per variation

components/
  generate-flow.tsx      ← Main flow container (CHANGE HERE)
  steps/
    step-variations.tsx  ← Variations choice UI (already built)
    step-select.tsx      ← Selection grid (already built)

types/
  index.ts              ← VariationCount type (add 2 if needed)
```

---

## Summary

**Current State**:
- System supports 1/3/6 variations
- Variations step is hidden
- Default is 1 variation

**To Enable 2-3 Variations**:
- **Option 1** (Recommended): Enable variations step (3 changes)
- **Option 2**: Add "2 variations" option (add to type + UI)
- **Option 3**: Set default to 3, skip choice screen

**Recommendation**: Use Option 1 - it's the cleanest and gives users control.

---

## Next Steps

1. Choose your option (I recommend Option 1)
2. I'll implement the changes
3. Test the flow
4. Adjust UI text if needed

**Ready to implement?** Let me know which option you prefer!
