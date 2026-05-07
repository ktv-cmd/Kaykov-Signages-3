# Placement Parameter Analysis

## Question: Why do we need placement coordinates?

### Answer: **We DON'T need them for Gemini!**

---

## Current Usage Analysis

### What Gets Sent to Gemini 2.5

```typescript
// lib/ai/provider.ts - generateWithGemini()
const parts: Part[] = [{ text: params.prompt }]

// Image 1 — storefront with golden zone already painted
if (params.storefrontImageData) {
  parts.push({
    inlineData: {
      mimeType: params.storefrontImageData.mimeType,
      data: params.storefrontImageData.base64,
    },
  })
}

// Image 2 — brand logo (optional)
if (params.brandAssetImageData) {
  parts.push({ inlineData: { ... } })
}
```

**Sent to Gemini:**
- ✅ Text prompt (with all instructions)
- ✅ Image 1 (storefront with golden zone painted on it)
- ✅ Image 2 (logo, if provided)
- ❌ NO placement coordinates
- ❌ NO bounding box data
- ❌ NO centerX/centerY/width/height

**How Gemini Knows Where to Place Sign:**
- The **golden painted zone in the image** shows exactly where
- Prompt says: "GOLD HIGHLIGHTED ZONE — this is a MASK"
- Visual guide is enough - no coordinates needed

---

## Where Placement Coordinates ARE Used

### 1. fal.ai Inpainting (NOT GEMINI!)
```typescript
// lib/ai/provider.ts - generateWithFal()
if (params.storefrontFile && (params.placementBrushPng || params.placement)) {
  const fillRegionBuffer = params.placementBrushPng?.length
    ? await sharp(params.placementBrushPng).resize(...).toBuffer()
    : placement
      ? buildInpaintRegionPng(imgW, imgH, placement)  // ← Uses coordinates
      : buildInpaintRegionPng(imgW, imgH, { centerX: 0.5, ... })
}
```

**Purpose:** If `placementBrushFile` doesn't exist, build a rectangular mask from coordinates.

**BUT:** In your app, `placementBrushFile` is REQUIRED:
```typescript
// app/api/generate/route.ts
if (!placementBrushFile || placementBrushFile.size === 0) {
  return NextResponse.json(
    { error: "Paint where the sign should go on the building, then continue." },
    { status: 400 }
  )
}
```

**Conclusion:** Since `placementBrushFile` is always provided, the fallback coordinates are never used!

---

## What You're Actually Using

### For Gemini (Your Only Provider)

**What's Sent:**
1. ✅ **Storefront image** - with golden zone already painted on it
2. ✅ **Prompt text** - architectural instructions
3. ✅ **Logo image** - if provided

**What's NOT Sent:**
- ❌ Placement coordinates (centerX, centerY, width, height)
- ❌ Placement object
- ❌ Bounding box data

**How It Works:**
```
User paints golden zone → placementBrushFile (PNG)
     ↓
applyBrushGuideToStorefront() overlays gold on photo
     ↓
Gemini sees the golden zone VISUALLY in the image
     ↓
Prompt: "Replace GOLD HIGHLIGHTED ZONE"
     ↓
Gemini generates sign in that visual area
```

---

## The Redundancy

### Current Flow
```
Step 2: Placement
├─ User paints with brush → placementBrushFile (PNG) ✅ USED
└─ System calculates center/width → placement object ❌ NOT USED (for Gemini)
```

### What's Stored vs What's Used

| Data | Stored | Used by Gemini | Used by fal | Purpose |
|------|--------|----------------|-------------|---------|
| `placementBrushFile` | ✅ | ✅ | ✅ | Visual golden zone mask |
| `placement.centerX` | ✅ | ❌ | ✅ (fallback) | Coordinate-based mask |
| `placement.centerY` | ✅ | ❌ | ✅ (fallback) | Coordinate-based mask |
| `placement.width` | ✅ | ❌ | ✅ (fallback) | Coordinate-based mask |
| `placement.height` | ✅ | ❌ | ✅ (fallback) | Coordinate-based mask |

**Verdict:** 
- `placementBrushFile` (PNG) is **ESSENTIAL** ✅
- `placement` coordinates are **OPTIONAL** (only for fal.ai fallback) ⚠️

---

## Should We Remove It?

### Option 1: Keep It (Current State)
**Pros:**
- Backend flexibility if you ever want to support fal.ai
- Fallback if brush painting fails
- Already implemented and working

**Cons:**
- Extra data being calculated and stored
- Not used for your primary (only) provider
- Adds complexity

### Option 2: Remove Placement Coordinates
**Pros:**
- Cleaner code
- Less data to manage
- Faster since no coordinate calculation needed

**Cons:**
- Would need to re-add if supporting fal.ai later
- Breaks fal.ai provider integration

---

## Recommendation

### Since You're Using ONLY Gemini (Hardcoded):

**I recommend KEEPING the placement UI as-is but understanding:**

1. **The painting step is critical** - `placementBrushFile` is what Gemini uses
2. **The coordinates are decorative** - They show in the summary ("Center 47%, width 76%") but don't affect Gemini generation
3. **It's a harmless extra** - Doesn't slow down or break anything

### What Actually Matters for Gemini

```
ESSENTIAL:
✅ placementBrushFile (PNG mask)
✅ Painted golden zone in the image
✅ Prompt instructions to replace golden zone

UNUSED (for Gemini):
❌ placement.centerX
❌ placement.centerY  
❌ placement.width
❌ placement.height
❌ placement.rotation
```

---

## The Display Issue (Your Screenshot)

The "Center 47%, width 76%" you see is calculated from the painted area and displayed in the summary card. It's informational only.

**Where it appears:**
```typescript
// components/steps/step-generate.tsx - Summary card
<SummaryRow
  label="Placement"
  value={
    placement
      ? `Center ${Math.round(placement.centerX * 100)}%, width ${Math.round(placement.width * 100)}%`
      : "—"
  }
/>
```

### Options:

**Option A: Remove from summary**
- Hide the placement row entirely
- Client doesn't see coordinates

**Option B: Change label**
- "Placement: Custom painted area"
- "Sign area: Marked on building"
- Remove specific percentages

**Option C: Keep as-is**
- It's informational
- Doesn't hurt anything
- Shows system calculated the area

---

## Should I Remove the Placement Summary?

Let me know if you want me to:
1. ✅ Remove "Placement" row from summary card
2. ✅ Keep the painting step but hide coordinates
3. ✅ Simplify the display

Or keep it as-is since it's just informational and doesn't affect generation?
