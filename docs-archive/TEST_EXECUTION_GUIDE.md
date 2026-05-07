# Test Execution Guide
## Step-by-Step Manual Testing Protocol

**Purpose**: Execute all 12 test cases systematically with proper documentation  
**Estimated Time**: 4-7 hours total  
**Prerequisites**: Dev server running, test assets prepared, browser open

---

## Setup Complete ✅

The following has been prepared:

1. ✅ Test directories created:
   - `/test-storefronts/` - For storefront images
   - `/test-logos/` - For logo files
   - `/test-results/` - For outputs and validation docs

2. ✅ Test manifest created: `test-manifest.json`

3. ✅ Validation template created: `test-results/validation-template.md`

4. ✅ Automation script created: `run-test-validation.sh`

5. ✅ Testing instructions documented: `TESTING_INSTRUCTIONS.md`

---

## Phase 1: Core Cases (START HERE)

### Test 1.1: VALERIA Navy Blue ⭐ PRIORITY TEST

**This test validates the most critical fixes**: color enforcement, font enforcement, golden zone erasure, and 3D geometry.

#### Setup Steps:

**1. Prepare Storefront Image**
- Use a red brick facade image
- Save to: `test-storefronts/red-brick-facade.jpg`
- Image should show clear facade texture for restoration testing

**2. Navigate to Application**
```
Browser: http://localhost:3000/generate
```

**3. Upload & Configure (Step 1: Upload)**
```
✅ Upload storefront: test-storefronts/red-brick-facade.jpg
✅ Click "Type name" button
✅ Enter brand text: "VALERIA"
✅ Select font style: "Classic Serif" 
✅ Select color: Navy (#1E3A8A)
✅ Select reference: "Back Lit Sign"
✅ Click "Continue to Placement"
```

**4. Paint Golden Zone (Step 2: Placement)**
```
✅ Use brush tool to paint a golden rectangle above the storefront door/window
✅ Make zone slightly LARGER than needed for "VALERIA" text
   (This tests surface restoration for exposed areas)
✅ Click "Continue"
```

**5. Generate (Step 4: Generate)**
```
✅ Variation count should be 1 (default)
✅ Click "Generate My Sign"
✅ Wait for generation (8-15 seconds)
```

**6. Monitor Terminal**
```bash
# In another terminal window:
tail -f ~/.cursor/projects/Users-kaykovmedia-Desktop-webs-sign-ai/terminals/763128.txt

# Look for:
# [generate] ── PROMPT (variation 1) ────────────────────
# Brand mode : text-only
# Provider   : gemini-2.5
```

**7. Extract and Validate Prompt**

When generation completes, check terminal for these keywords:

**MUST HAVE (Power-Words)**:
- [ ] "EXTRUDED VOLUMETRIC LETTERFORMS"
- [ ] "6-faced mesh"
- [ ] "Z-axis: 3.5 inches (89mm)"  
- [ ] "Metallic 0.95, Roughness 0.35, Anisotropy 0.6"
- [ ] "CRITICAL COLOR REQUIREMENT: MUST BE #1E3A8A"
- [ ] "RAY-TRACED"
- [ ] "VOLUMETRIC SCENE RECONSTRUCTION"

**MUST NOT HAVE (Banned Words)**:
- [ ] "generative fill" → Should be "volumetric reconstruction"
- [ ] "replace pixels" → Should be "insert mesh"
- [ ] "glow" as effect → Should be "subsurface scattering" or "inverse-square falloff"

**Copy full prompt to**: `test-results/test-1.1/prompt.txt`

**8. Validate Generated Image**

Take screenshot of result, save to: `test-results/test-1.1/output.png`

**Run 4-Point Checklist**:

✅/❌ **Side-Wall Test (3D Proof)**
```
Question: Can you see the thickness of any letter in "VALERIA"?

Method:
1. Zoom into letters V, A, L, E, R, I, A
2. Look for visible side-walls (return planes)
3. Check for foreshortening due to camera angle

Pass: At least one letter shows visible side/return plane
Fail: All letters appear perfectly flat (2D decal)

Your Result: ___________
Notes: ___________
```

✅/❌ **Zero Gold Policy (Mask Removal)**
```
Question: Any yellow/golden pixels visible?

Method:
1. Use browser eyedropper extension
2. Sample pixels around letters, between letters, in background
3. Check for #FFD740 or similar yellows (#F5D742, #FFE74D, etc.)

Pass: 0% golden pixels detected
Fail: Yellow glow, borders, or artifacts present

Your Result: ___________
% Golden: ___________
Sampled Colors: ___________
```

✅/❌ **Surface Continuity (Texture Restoration)**
```
Question: What's visible in exposed areas around letters?

Method:
1. Since golden zone was larger than "VALERIA" text
2. Check areas to left/right of text
3. Check areas above/below text

Pass: Red brick texture visible (matches facade)
Fail: Golden color remains, mismatched texture, blank areas

Your Result: ___________
Texture Type: ___________
Match Quality: Excellent / Good / Poor
```

✅/❌ **Shadow Authenticity (Depth Proof)**
```
Question: Do shadows show depth gradation?

Method:
1. Examine shadows cast by letters on wall
2. Look for variation in shadow darkness
3. Check for sharp core + soft edges

Pass: Multi-plane shadows (dark core + soft penumbra)
Fail: Uniform blur like Photoshop drop-shadow

Your Result: ___________
Shadow Type: ___________
Gradation: Clear / Subtle / None
```

**9. Additional Validation**

**Color Accuracy**:
```
Expected: #1E3A8A (Navy Blue)
Method: Use eyedropper on letter faces
Actual: ___________
Match: Exact / Close / Different
```

**Typography**:
```
Expected: Classic serif (Trajan/Times Roman style)
Observed: ___________
Serifs visible: Yes / No
Match: Accurate / Approximate / Wrong
```

**Boundary Compliance**:
```
All letters fit within original golden zone: Yes / No
Any overflow: Yes / No (describe)
```

**10. Run Automation Script**

```bash
./run-test-validation.sh test-1.1 test-results/test-1.1/output.png
```

This will:
- Extract terminal logs
- Check for power-words
- Check for banned words
- Generate validation checklist

**11. Document Results**

Copy `test-results/validation-template.md` to `test-results/test-1.1/validation.md` and fill in all sections.

**12. Score Test**

Calculate total score: ___/45

Determine status:
- ≥36/45 (80%+) AND 4-point pass → ✅ **PASS**
- 27-35/45 (60-79%) OR 3/4 pass → ⚠️ **PARTIAL PASS**
- <27/45 (<60%) OR ≤2/4 pass → ❌ **FAIL**

---

### Test 2.1: Logo Only (Kaykov Logo)

**Purpose**: Validate lightbox construction and color integrity

#### Setup Steps:

**1. Prepare Assets**
- Storefront: Stucco/light colored facade
- Logo: Already available at `public/kaykov-logo.png`

**2. Navigate**: http://localhost:3000/generate

**3. Upload & Configure**
```
✅ Upload storefront
✅ Click "Upload logo" button
✅ Upload: public/kaykov-logo.png
✅ DO NOT enter brand text (leave empty)
✅ Select reference: "Front Lit Sign"
✅ Click "Continue to Placement"
```

**4. Paint Golden Zone**
```
✅ Paint golden zone sized for logo (square or rectangular)
✅ Click "Continue"
```

**5. Generate**
```
✅ Variation count: 1
✅ Click "Generate My Sign"
```

**6. Validate Prompt**

Check for:
- [ ] "VOLUMETRIC CABINET LIGHTBOX"
- [ ] "Logo-shaped box primitive"
- [ ] "Use EXACT HEX/Pantone colors from Image 2"
- [ ] "NON-NEGOTIABLE brand identity"

**7. Validate Output**

Run 4-point checklist plus:
- [ ] ONE unified cabinet (not individual letters)
- [ ] Exact logo colors from PNG file
- [ ] Cabinet return edges visible
- [ ] Logo silhouette accurate

**8. Document**
```bash
./run-test-validation.sh test-2.1 test-results/test-2.1/output.png
```

---

### Test 3.1: Logo + Name (KAYKOV MEDIA)

**Purpose**: Validate dual component construction

#### Setup Steps:

**1. Navigate**: http://localhost:3000/generate

**2. Upload & Configure**
```
✅ Upload storefront (stone/neutral facade)
✅ Click "Logo + name" button
✅ Upload logo: public/kaykov-logo.png
✅ Enter brand text: "KAYKOV MEDIA"
✅ DO NOT select font/color (let it auto-harmonize with logo)
✅ Select reference: "Front & Back Lit"
✅ Click "Continue"
```

**3. Paint Golden Zone**
```
✅ Paint wide rectangular golden zone (room for logo + name horizontally)
✅ Click "Continue"
```

**4. Generate & Validate**

Check for:
- [ ] "DUAL COMPONENT IDENTITY"
- [ ] "LOGO COMPONENT: Volumetric Cabinet Lightbox"
- [ ] "NAME COMPONENT: Extruded Volumetric Letterforms"
- [ ] "Match or complement logo's color scheme"

Validate output:
- [ ] Logo visible (lightbox)
- [ ] Name visible (channel letters)
- [ ] Both have 3.5" depth
- [ ] Colors harmonize
- [ ] Balanced layout (logo left, name right or below)

**5. Document**
```bash
./run-test-validation.sh test-3.1 test-results/test-3.1/output.png
```

---

### Test 4.1: Awning + Name (BISTRO)

**Purpose**: Validate awning logic overrides 3D extrusion

#### Setup Steps:

**1. Navigate**: http://localhost:3000/generate

**2. Upload & Configure**
```
✅ Upload storefront (brick facade)
✅ Click "Type name"
✅ Enter brand text: "BISTRO"
✅ Select font/color (optional)
✅ Select reference: "Awning Sign" ⭐ CRITICAL
✅ Click "Continue"
```

**3. Paint Golden Zone**
```
✅ Paint wide horizontal golden zone (for awning)
✅ Click "Continue"
```

**4. Generate & Validate**

Check prompt for:
- [ ] "NOT volumetric channel letters"
- [ ] "NOT extruded lightbox"
- [ ] "FLAT graphics"
- [ ] "Sunbrella fabric"
- [ ] "NO internal LED illumination"

Validate output:
- [ ] NO 3D extruded letters (should be flat)
- [ ] Fabric texture visible (woven canvas)
- [ ] Aluminum frame visible
- [ ] Text appears printed/vinyl on fabric
- [ ] Natural fabric draping
- [ ] Broad shadow on wall

**5. Document**
```bash
./run-test-validation.sh test-4.1 test-results/test-4.1/output.png
```

---

## After Phase 1 Complete

### Calculate Phase 1 Results

```
Test 1.1 (VALERIA): ___/45 points, Status: PASS/PARTIAL/FAIL
Test 2.1 (Logo): ___/45 points, Status: PASS/PARTIAL/FAIL
Test 3.1 (Logo+Name): ___/45 points, Status: PASS/PARTIAL/FAIL
Test 4.1 (Awning): ___/45 points, Status: PASS/PARTIAL/FAIL

Phase 1 Pass Rate: ___% (___/4 tests passed)
```

### Decision Point

**If Phase 1 pass rate < 50%**:
- ⚠️ **STOP TESTING**
- ⚠️ **ANALYZE FAILURES**
- ⚠️ **CONSIDER ROLLBACK**
- Review failure patterns before continuing

**If Phase 1 pass rate ≥ 50%**:
- ✅ **CONTINUE TO PHASE 2**
- Document issues found
- Note areas for refinement

---

## Phase 2: Boundary & Edge Cases

### Test 1.2: Auto Color Selection (CAFE PARIS)

**Purpose**: Test facade analysis when no client color provided

**Key Difference**: DO NOT select font/color in upload step

```
Steps:
1. Upload wood facade storefront
2. Type name: "CAFE PARIS"
3. Leave font/color UNSELECTED (test auto-selection)
4. Select: "Front Lit Sign"
5. Paint golden zone
6. Generate

Validate:
- Color is facade-complementary (aluminum, bronze, black)
- Color is NOT golden yellow (#FFD740)
- Professional typography selected
```

---

### Test 1.3: Long Name (THE METROPOLITAN BISTRO)

**Purpose**: Test boundary constraint and scaling

**Key Validation**: Full text fits within medium-sized golden zone

```
Steps:
1. Upload brick facade
2. Type name: "THE METROPOLITAN BISTRO"
3. Font: Modern Sans, Color: Silver (#C0C0C0)
4. Select: "No Light – 3D Outdoor"
5. Paint MEDIUM golden zone (intentionally not huge)
6. Generate

Validate:
- Full text fits within zone boundaries
- Letters scaled appropriately
- Still readable despite size reduction
- No overflow beyond edges
```

---

### Test 3.2: Vertical Layout (METROPOLITAN RESTAURANT)

**Purpose**: Test vertical stacking for long logo+name

**Key Validation**: Logo above name, both centered

```
Steps:
1. Upload brick facade
2. Upload wide logo file
3. Type name: "METROPOLITAN RESTAURANT"
4. Select: "Front Lit Sign"
5. Paint NARROW golden zone (forces vertical)
6. Generate

Validate:
- Logo positioned above name (vertical stack)
- Both centered or left-aligned
- Appropriate spacing between components
- Both fit within zone
```

---

## Phase 3: Lighting Variations

### Test 2.2: Logo Back-Lit (Halo Physics)

**Purpose**: Validate ray-traced backlighting

```
Steps:
1. Upload dark red brick facade
2. Upload logo: public/kaykov-media-logo.png
3. Select: "Back Lit Sign"
4. Paint golden zone
5. Generate

Validate:
- Light wash visible on wall BEHIND logo
- NO face glow (logo face is solid)
- Inverse-square falloff (brighter near logo, fades)
- Light interacts with brick texture (grout lines visible)
```

---

### Additional Lighting Tests

**Test: Front-Lit Only**
- Use "Front Lit Sign" reference
- Validate: Internal glow, subsurface scattering, edge glow

**Test: No-Light**
- Use "No Light – 3D Outdoor" reference
- Validate: Relies on geometric depth, sun-cast shadows, no LED

---

## Phase 4: Multi-Variation

### Test 5.1: 3 Variations (CAFE)

**Purpose**: Test variation planner diversity

```
Steps:
1. Upload brick facade
2. Type name: "CAFE"
3. Font: Bold Condensed, Color: Red (#DC2626)
4. Select: "Front Lit Sign"
5. Paint golden zone
6. Set VARIATION COUNT: 3 ⭐ CRITICAL
7. Generate

Validate:
- 3 distinct images generated
- All use same red color
- All use bold condensed font
- Variations differ in: depth, edges, mounting
- All pass 4-point checklist
```

---

### Test 5.2: 6 Variations (RESTAURANT)

**Purpose**: Test maximum variation count

```
Steps:
1. Upload facade
2. Type name: "RESTAURANT"
3. Select: "Back Lit Sign"
4. Paint golden zone
5. Set VARIATION COUNT: 6 ⭐ CRITICAL
6. Generate

Validate:
- 6 distinct images generated
- Wider range of depth profiles (flat, shallow, medium×2, deep×2)
- All pass 4-point checklist
- Controlled variation (not random)
```

---

## Validation Workflow (For Each Test)

### Step 1: Immediate Post-Generation

```bash
# Run automation script
./run-test-validation.sh test-{ID} test-results/test-{ID}/output.png

# This extracts:
# - Terminal logs → test-results/test-{ID}/terminal-log.txt
# - Power-word check → printed to console
# - Banned word check → printed to console
```

### Step 2: Visual Inspection

Take screenshots:
1. **Full output**: `test-{ID}/output.png`
2. **Close-up detail**: `test-{ID}/detail.png` (zoom into letters/logo)
3. **Shadow detail**: `test-{ID}/shadows.png` (zoom into shadow areas)

### Step 3: Run 4-Point Checklist

Use eyedropper, zoom tools, and visual inspection to complete all 4 tests.

### Step 4: Document Results

```bash
# Copy template
cp test-results/validation-template.md test-results/test-{ID}/validation.md

# Fill in all sections:
# - Test configuration
# - Prompt analysis
# - 4-point validation results
# - Additional metrics
# - Overall score (/45)
# - Issues and recommendations
```

### Step 5: Calculate Score

```
4-Point Checklist: 4×5 = 20 points max
Additional Metrics: 5×5 = 25 points max
Total: 45 points

Pass Threshold: ≥36/45 (80%)
```

---

## Quick Validation Checklist (Print This)

For each test, mark these boxes:

**Prompt Validation** (from terminal):
- [ ] Contains "EXTRUDED VOLUMETRIC LETTERFORMS"
- [ ] Contains "Z-axis: 3.5 inches (89mm)"
- [ ] Contains PBR parameters (Metallic 0.95, etc.)
- [ ] Contains "RAY-TRACED" or "Ray-traced"
- [ ] NO "generative fill"
- [ ] NO "replace pixels"

**Visual Validation** (from generated image):
- [ ] Side-wall test: Visible depth on ≥1 element
- [ ] Zero gold: 0% yellow pixels (#FFD740)
- [ ] Surface continuity: Restored texture visible
- [ ] Shadow authenticity: Multi-plane gradation
- [ ] Color accuracy: Matches specification
- [ ] Typography: Matches specification
- [ ] Boundary: Fits within golden zone
- [ ] Material: Realistic PBR properties
- [ ] Lighting: Physically accurate

**Overall**: ___/9 checks passed → PASS / PARTIAL / FAIL

---

## Time Management

### Per Test (Estimated):
- Setup & upload: 2-3 minutes
- Golden zone painting: 1-2 minutes
- Generation wait: 8-15 seconds
- Validation: 10-15 minutes
- Documentation: 5-10 minutes

**Total per test**: 20-30 minutes

### Phase Timing:
- **Phase 1** (4 tests): 1.5-2 hours
- **Phase 2** (3 tests): 1-1.5 hours
- **Phase 3** (3 tests): 1-1.5 hours
- **Phase 4** (2 tests): 40-60 minutes

---

## Test Asset Preparation

### Storefront Images Needed:

Save these to `test-storefronts/`:

1. **red-brick-facade.jpg**
   - Red brick wall with clear mortar lines
   - Good lighting, no existing signage
   - Clear facade area for golden zone

2. **wood-facade.jpg**
   - Natural wood siding or panels
   - Brown/tan tones
   - Clear area for signage

3. **stucco-facade.jpg**
   - Light colored stucco (white, beige, light gray)
   - Smooth or textured finish
   - Clean area for logo placement

4. **stone-facade.jpg**
   - Stone or concrete blocks
   - Neutral gray/beige color
   - Professional appearance

**Where to get**:
- Use existing project storefronts (if available)
- Stock photo sites (Unsplash, Pexels)
- AI-generate test facades
- Use same facade for multiple tests (acceptable)

### Logo Files (Already Available):
- ✅ `public/kaykov-logo.png`
- ✅ `public/kaykov-media-logo.png`
- ✅ `public/Logo Kaykov Media_C.PNG`

---

## Troubleshooting

### Issue: Generation Fails (503 Error)
```
Solution: Gemini high demand
Action: Wait 2-5 minutes, try again
Or: Switch provider to fal.ai in generate step
```

### Issue: Cannot See Terminal Logs
```
Solution: Terminal file location
Path: ~/.cursor/projects/Users-kaykovmedia-Desktop-webs-sign-ai/terminals/763128.txt
Command: tail -f <path>
```

### Issue: Golden Zone Not Painting
```
Solution: Brush tool not activated
Action: Click brush icon, adjust brush size, ensure canvas loaded
```

### Issue: Can't Upload Test Images
```
Solution: File path or permissions
Action: Use absolute paths, check file exists
```

---

## Success Indicators (Quick Check)

After Test 1.1 (VALERIA), if you see:

✅ **Good signs** (keep testing):
- Navy blue letters (exact #1E3A8A)
- At least subtle depth visible on one letter
- No yellow artifacts
- Red brick visible around text
- Shadows have some gradation

❌ **Bad signs** (stop and analyze):
- Wrong colors (not navy)
- Perfectly flat letters (no depth)
- Yellow glow everywhere
- Golden zone still visible
- Uniform shadow blur

---

## Next Steps After All Testing

1. Aggregate all test results
2. Calculate overall pass rate
3. Identify pattern in failures
4. Create `TEST_RESULTS_SUMMARY.md`
5. Make decision: Keep / Iterate / Rollback

---

**Start with Test 1.1 (VALERIA)** - This is the most important test.
**Good luck!** 🚀
