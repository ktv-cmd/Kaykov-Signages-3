# Testing Instructions - Architectural Signage System

## Quick Start

This document provides step-by-step instructions for executing the complete test suite defined in the test plan.

---

## Prerequisites

### 1. Development Environment
```bash
# Ensure dev server is running
npm run dev

# Server should be accessible at http://localhost:3000
```

### 2. Test Assets Required

#### Storefront Images (Need to Prepare):
- [ ] Red brick facade image (for VALERIA test)
- [ ] Wood facade image (for CAFE PARIS test)
- [ ] Stucco facade image (for logo tests)
- [ ] Stone/concrete facade (for logo+name test)

**Note**: Save these in `test-storefronts/` directory

#### Logo Files (Already Available):
- [x] `public/kaykov-logo.png`
- [x] `public/kaykov-media-logo.png`
- [x] `public/Logo Kaykov Media_C.PNG`

#### Tools Needed:
- [ ] Browser with eyedropper extension (for color validation)
- [ ] Screenshot tool
- [ ] Terminal access (for prompt log inspection)

---

## Test Execution Workflow

### For Each Test Case:

#### Step 1: Navigate to Application
```
1. Open browser: http://localhost:3000
2. Start new flow
```

#### Step 2: Upload Assets (Step 1: Upload)
```
1. Upload storefront image
2. (Optional) Upload logo file OR enter brand text
3. (Optional) Select font style and color
4. Select reference style
5. Click Continue
```

#### Step 3: Paint Golden Zone (Step 2: Placement)
```
1. Use brush tool to paint golden zone on storefront
2. Ensure zone is appropriate size for test
3. Click Continue
```

#### Step 4: Generate (Step 4: Generate)
```
1. Select variation count (1, 3, or 6)
2. Click Generate
3. Wait for generation to complete
```

#### Step 5: Inspect Terminal Logs
```bash
# Open terminal where dev server is running
# Look for logged prompt

# Check for power-words:
grep "EXTRUDED VOLUMETRIC" <terminal_output>
grep "CRITICAL COLOR" <terminal_output>
grep "Z-axis: 3.5 inches" <terminal_output>

# Check NO banned words:
! grep "generative fill" <terminal_output>
! grep "replace pixels" <terminal_output>
```

#### Step 6: Validate Generated Image

**Run 4-Point Checklist:**

1. **Side-Wall Test**
   - [ ] Can you see thickness/side of any letter/logo?
   - [ ] Return planes visible due to viewing angle?
   - **Result**: PASS / FAIL
   - **Notes**: _____

2. **Zero Gold Policy**
   - [ ] Use eyedropper to check for golden pixels
   - [ ] Look for yellow glow, borders, artifacts
   - **Result**: PASS / FAIL
   - **% Golden Pixels**: _____

3. **Surface Continuity**
   - [ ] Check areas around/between sign elements
   - [ ] Is restored building texture visible?
   - **Result**: PASS / FAIL
   - **Texture Quality**: _____

4. **Shadow Authenticity**
   - [ ] Do shadows show depth gradation?
   - [ ] Dark core + soft penumbra visible?
   - **Result**: PASS / FAIL
   - **Shadow Characteristics**: _____

#### Step 7: Document Results
```
1. Take screenshot of generated image
2. Save to: test-results/test-{ID}-output.png
3. Record validation results in test log
4. Note any additional observations
```

---

## Phase 1: Core Cases (PRIORITY)

### Test 1.1: VALERIA Navy Blue Test
**Purpose**: Validate color/font enforcement and 3D geometry

**Inputs**:
- Storefront: Red brick facade with golden zone
- Brand Text: `VALERIA`
- Font: Classic Serif
- Color: `#1E3A8A` (Navy Blue)
- Reference: Back Lit Sign
- Variation Count: 1

**Expected**:
- ✅ Navy blue letters (exact #1E3A8A)
- ✅ Classic serif typography
- ✅ Visible side-walls on at least one letter
- ✅ Zero golden pixels
- ✅ Red brick visible around letters
- ✅ Multi-plane shadows

**Validation Keywords in Prompt**:
- "EXTRUDED VOLUMETRIC LETTERFORMS"
- "CRITICAL COLOR REQUIREMENT: MUST BE #1E3A8A"
- "6-faced mesh"
- "Z-axis: 3.5 inches (89mm)"

---

### Test 2.1: Logo Only (Kaykov Logo)
**Purpose**: Validate lightbox construction and color integrity

**Inputs**:
- Storefront: Stucco facade with golden zone
- Brand Asset: Upload `public/kaykov-logo.png`
- Brand Text: (leave empty)
- Reference: Front Lit Sign
- Variation Count: 1

**Expected**:
- ✅ ONE cabinet lightbox (not individual letters)
- ✅ Exact logo colors from PNG
- ✅ Cabinet return edges visible
- ✅ Logo silhouette accurate
- ✅ Translucent acrylic face + aluminum returns

**Validation Keywords in Prompt**:
- "VOLUMETRIC CABINET LIGHTBOX"
- "Logo-shaped box primitive"
- "Use EXACT HEX/Pantone colors from Image 2"

---

### Test 3.1: Logo + Name (Kaykov Media)
**Purpose**: Validate dual component construction

**Inputs**:
- Storefront: Stone facade with golden zone
- Brand Asset: Upload `public/kaykov-logo.png`
- Brand Text: `KAYKOV MEDIA`
- Reference: Front & Back Lit
- Variation Count: 1

**Expected**:
- ✅ Logo as lightbox + Name as channel letters
- ✅ Both visible and distinct
- ✅ Same Z-depth (3.5 inches)
- ✅ Colors harmonize
- ✅ Balanced layout

**Validation Keywords in Prompt**:
- "DUAL COMPONENT IDENTITY"
- "LOGO COMPONENT: Volumetric Cabinet Lightbox"
- "NAME COMPONENT: Extruded Volumetric Letterforms"

---

### Test 4.1: Awning + Name
**Purpose**: Validate awning logic overrides 3D extrusion

**Inputs**:
- Storefront: Brick facade
- Brand Text: `BISTRO`
- Reference: **Awning Sign**
- Variation Count: 1

**Expected**:
- ✅ NO 3D extrusion (no volumetric letters)
- ✅ Fabric texture visible (woven canvas)
- ✅ Aluminum frame visible
- ✅ Flat graphics (printed/vinyl)
- ✅ Natural fabric draping
- ✅ Broad shadow on wall

**Validation Keywords in Prompt**:
- "NOT volumetric channel letters"
- "FLAT graphics"
- "Sunbrella fabric"
- "NO internal LED illumination"

---

## Phase 2: Boundary & Edge Cases

### Test 1.3: Long Name (THE METROPOLITAN BISTRO)
**Purpose**: Validate scaling/fitting logic

**Key Validation**: Full text fits within golden zone (scaled or tightened spacing)

---

### Test 3.2: Logo + Name Vertical Layout
**Purpose**: Validate vertical stacking

**Key Validation**: Logo above name, both centered, appropriate spacing

---

### Test 1.2: Auto Color Selection
**Purpose**: Validate facade analysis

**Key Validation**: AI selects facade-complementary color (NOT golden yellow)

---

## Phase 3: Lighting Variations

### Test 2.2: Logo Back-Lit (Halo)
**Purpose**: Validate ray-traced backlighting

**Key Validation**:
- ✅ Light wash on wall BEHIND logo
- ✅ NO face glow (logo face is solid)
- ✅ Inverse-square falloff visible
- ✅ Light interacts with brick texture

---

## Phase 4: Multi-Variation

### Test 5.1: 3 Variations (CAFE)
**Purpose**: Validate variation planner diversity

**Key Validation**:
- ✅ 3 distinct images generated
- ✅ Variations differ in depth/edge/mounting
- ✅ All use same color and typography

### Test 5.2: 6 Variations (RESTAURANT)
**Purpose**: Validate maximum variation count

**Key Validation**:
- ✅ 6 distinct images
- ✅ Wider range of variations
- ✅ All pass 4-point checklist

---

## Scoring & Documentation

### Test Result Template

```markdown
## Test {ID}: {Name}

**Date**: {date}
**Tester**: {name}

### Inputs
- Storefront: {description}
- Brand Text: {text}
- Brand Asset: {file}
- Text Styling: Font={font}, Color={color}
- Reference: {reference name}
- Variation Count: {count}

### Generated Prompt (Key Excerpts)
```
[Paste relevant sections from terminal]
```

### Validation Results

#### 4-Point Checklist
1. **Side-Wall Test**: ✅ PASS / ❌ FAIL
   - Notes: {observations}

2. **Zero Gold Policy**: ✅ PASS / ❌ FAIL
   - % Golden Pixels: {percentage}

3. **Surface Continuity**: ✅ PASS / ❌ FAIL
   - Texture Quality: {assessment}

4. **Shadow Authenticity**: ✅ PASS / ❌ FAIL
   - Shadow Characteristics: {description}

#### Additional Validation
- Color Accuracy: {assessment}
- Typography Fidelity: {assessment}
- Boundary Compliance: {assessment}
- Material Realism: {assessment}
- Lighting Physics: {assessment}

### Screenshots
- Input: test-results/test-{ID}-input.png
- Output: test-results/test-{ID}-output.png
- Close-up: test-results/test-{ID}-detail.png

### Overall Result
**PASS** / **FAIL** / **PARTIAL PASS**

### Issues Found
1. {issue description}
2. {issue description}

### Recommendations
1. {recommendation}
2. {recommendation}
```

---

## Success Criteria Reference

### Must Pass (Blocking):
- All tests pass Zero Gold Policy
- All tests show at least subtle side-wall visibility
- Client colors reproduced exactly
- No banned vocabulary in prompts

### Should Pass (Quality):
- 80%+ tests show clear multi-plane shadows
- 80%+ tests show proper texture restoration
- Metal surfaces show anisotropic highlights
- Awning tests show fabric texture

### Nice to Have:
- Clear return planes on most letters
- Wall texture interaction in lighting
- Perfect perspective alignment
- Fresnel edge effects

---

## Rollback Decision Matrix

| Pass Rate | Decision |
|-----------|----------|
| <30% | **ROLLBACK** - Major regression |
| 30-70% | **ITERATE** - Tune prompts, retest |
| >70% | **KEEP** - Monitor and enhance |

**Specific Rollback Triggers**:
- 50%+ fail zero gold policy → **ROLLBACK**
- 50%+ show NO side-walls → **ROLLBACK**
- Client colors ignored → **ROLLBACK**
- Awning shows 3D extrusion → **ROLLBACK**

---

## Timeline

- **Phase 1** (4 tests): 1-2 hours
- **Phase 2** (3 tests): 45-90 minutes
- **Phase 3** (3 tests): 45-90 minutes
- **Phase 4** (2 tests): 30-60 minutes
- **Documentation**: Ongoing

**Total**: 4-7 hours for complete suite

---

## Quick Tips

1. **Terminal Logs**: Keep terminal visible while testing to monitor prompts
2. **Screenshots**: Take screenshots immediately after generation
3. **Eyedropper**: Use browser eyedropper extension for color validation
4. **Comparison**: Keep reference images open for side-by-side comparison
5. **Notes**: Document observations immediately while fresh

---

## After Testing

Create `TEST_RESULTS_SUMMARY.md` with:
- Overall pass/fail rates
- Visual examples (best/worst results)
- Pattern analysis (common failures)
- Recommendations for refinement
- Decision: Keep, Iterate, or Rollback
