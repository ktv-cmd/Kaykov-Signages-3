# Testing Framework - Quick Start

**Status**: ✅ Ready for Execution  
**Deployment Verified**: 13/13 checks passed  
**Start Here**: This document

---

## 🚀 Quick Start (5 minutes)

### 1. Verify System
```bash
cd "/Users/kaykovmedia/Desktop/webs/sign ai "
./verify-prompt-changes.sh
```
**Expected**: "13/13 checks passed ✅ DEPLOYMENT VERIFIED"

### 2. Read Execution Guide
Open: [`TEST_EXECUTION_GUIDE.md`](TEST_EXECUTION_GUIDE.md)  
Go to: **Phase 1: Core Cases** → **Test 1.1: VALERIA Navy Blue**

### 3. Prepare First Test Asset
Save a red brick facade image to: `test-storefronts/red-brick.jpg`

### 4. Execute Test 1.1
1. Navigate: http://localhost:3000/generate
2. Follow step-by-step instructions in execution guide
3. Takes 20-30 minutes (including validation)

---

## 📚 Documentation Index

### Essential (Start Here)
| File | Purpose | When to Use |
|------|---------|-------------|
| **This file** | Quick navigation | Start here |
| [`TEST_EXECUTION_GUIDE.md`](TEST_EXECUTION_GUIDE.md) | Step-by-step instructions | **Primary guide for testing** |
| [`TEST_FRAMEWORK_READY.md`](TEST_FRAMEWORK_READY.md) | Readiness check | Before starting tests |

### Reference
| File | Purpose | When to Use |
|------|---------|-------------|
| [`TESTING_INSTRUCTIONS.md`](TESTING_INSTRUCTIONS.md) | Quick start overview | Alternative quick guide |
| [`test-manifest.json`](test-manifest.json) | Test case definitions | Reference for test inputs |
| [`test-results/validation-template.md`](test-results/validation-template.md) | Documentation template | After each test |

### Status Reports
| File | Purpose | When to Use |
|------|---------|-------------|
| [`TEST_IMPLEMENTATION_STATUS.md`](TEST_IMPLEMENTATION_STATUS.md) | Current status | Check what's done |
| [`TESTING_PLAN_IMPLEMENTATION_COMPLETE.md`](TESTING_PLAN_IMPLEMENTATION_COMPLETE.md) | Executive summary | Full overview |

---

## 🔧 Automation Scripts

### Verify Deployment
```bash
./verify-prompt-changes.sh
```
**Purpose**: Confirms power-words are active in code  
**Expected**: 13/13 checks passed  
**When**: Before starting any tests

### Validate Test
```bash
./run-test-validation.sh test-{ID} <screenshot-path>

# Example:
./run-test-validation.sh test-1.1 test-results/test-1.1/output.png
```
**Purpose**: Extracts logs, checks prompt for power-words  
**When**: After each test generation

---

## ✅ Test Cases Summary

### Phase 1: Core Cases (PRIORITY)
1. **Test 1.1**: Name + Color (VALERIA #1E3A8A) ⭐ START HERE
2. **Test 2.1**: Logo Only (Kaykov logo)
3. **Test 3.1**: Logo + Name (KAYKOV MEDIA)
4. **Test 4.1**: Awning (BISTRO)

**Decision Point**: If Phase 1 ≥75% pass → Continue to Phase 2

### Phase 2: Boundary Cases
5. **Test 1.2**: Auto Color (CAFE PARIS)
6. **Test 1.3**: Long Name (THE METROPOLITAN BISTRO)
7. **Test 3.2**: Vertical Layout (METROPOLITAN RESTAURANT)

### Phase 3: Lighting Variations
8. **Test 2.2**: Logo Back-Lit (halo)
9. Front-Lit Only
10. No-Light

### Phase 4: Multi-Variation
11. **Test 5.1**: 3 Variations (CAFE)
12. **Test 5.2**: 6 Variations (RESTAURANT)

**Total**: 12 tests across 4 phases

---

## 📊 Validation Checklist

### 4-Point Test (20 points)
1. ✅ **Side-Wall Test**: Can you see thickness?
2. ✅ **Zero Gold Policy**: Any yellow pixels?
3. ✅ **Surface Continuity**: Texture restored?
4. ✅ **Shadow Authenticity**: Depth gradation?

### Additional Metrics (25 points)
- Color Accuracy
- Typography Fidelity
- Boundary Compliance
- Material Realism
- Lighting Physics

**Total**: 45 points per test  
**Pass**: ≥36/45 (80%)

---

## 🎯 Testing Options

### Option 1: Full Testing (Recommended)
- **Time**: 4-7 hours
- **Tests**: All 12 tests
- **Benefit**: Complete validation

### Option 2: Phase 1 Only (Fast Track)
- **Time**: 1.5-2 hours
- **Tests**: 4 core tests
- **Benefit**: Quick validation of critical features

### Option 3: Smoke Test (Ultra Fast)
- **Time**: 20-30 minutes
- **Tests**: Test 1.1 only
- **Benefit**: Immediate feedback

**Recommended**: Start with Option 3, then decide.

---

## 🗂️ Directory Structure

```
/test-storefronts/    [Add facade images here]
/test-logos/          [Logo files ready: public/kaykov-*.png]
/test-results/        [Test outputs go here]
  ├── test-{ID}/      [Create per test]
  │   ├── output.png
  │   ├── validation.md
  │   └── terminal-log.txt
  └── validation-template.md
```

---

## ⚡ Common Commands

```bash
# Verify deployment
./verify-prompt-changes.sh

# Check dev server
curl http://localhost:3000

# Validate a test
./run-test-validation.sh test-1.1 test-results/test-1.1/output.png

# View terminal logs
tail -f ~/.cursor/projects/Users-kaykovmedia-Desktop-webs-sign-ai/terminals/763128.txt
```

---

## 🚨 Troubleshooting

### Verification Fails (<13/13)
**Cause**: Code not deployed  
**Fix**: Check `lib/ai/provider.ts` and `lib/ai/variation-planner.ts`

### Generation Fails (503 Error)
**Cause**: Gemini high demand  
**Fix**: Wait 5-10 minutes, retry

### No Power-Words in Prompt
**Cause**: Old code cached  
**Fix**: Stop server, `rm -rf .next`, restart `npm run dev`

### Cannot See Terminal Logs
**Cause**: Wrong terminal file  
**Fix**: Check `~/.cursor/projects/Users-kaykovmedia-Desktop-webs-sign-ai/terminals/763128.txt`

---

## 🎬 Step-by-Step: Test 1.1 (VALERIA)

### Before Testing
1. ✅ Run `./verify-prompt-changes.sh` → Expect 13/13
2. ✅ Prepare red brick facade image
3. ✅ Open http://localhost:3000/generate

### During Testing
1. Upload storefront image
2. Click "Type name" → Enter "VALERIA"
3. Select: Font = Classic Serif, Color = #1E3A8A
4. Select reference: Back Lit Sign
5. Paint golden zone with brush tool
6. Click Generate (1 variation)
7. Wait 8-15 seconds

### After Generation
1. Take screenshot → Save to `test-results/test-1.1/output.png`
2. Run: `./run-test-validation.sh test-1.1 test-results/test-1.1/output.png`
3. Check terminal output for power-words
4. Perform 4-point visual validation:
   - Side-walls visible?
   - Zero gold pixels?
   - Brick texture restored?
   - Multi-plane shadows?
5. Copy template: `cp test-results/validation-template.md test-results/test-1.1/validation.md`
6. Fill in all validation sections
7. Calculate score: ___/45

### Decision
- **≥36/45 (PASS)**: Continue to Test 2.1
- **27-35/45 (PARTIAL)**: Note issues, continue
- **<27/45 (FAIL)**: STOP, analyze failure

---

## 📈 Success Criteria

### Must Pass (Blocking):
- Zero Gold Policy (all tests)
- Side-wall visibility (all tests)
- Exact client colors (Test 1.1)
- No banned words (all prompts)

### Should Pass (Quality):
- 80%+ multi-plane shadows
- 80%+ texture restoration
- Anisotropic highlights on metal
- Fabric texture on awnings

### Overall Target:
- **>70%**: Keep changes ✅
- **50-70%**: Iterate ⚠️
- **<50%**: Rollback ❌

---

## 📝 Expected Outcomes

### If Test 1.1 Passes (Optimistic):
- Navy blue letters (exact #1E3A8A)
- Classic serif typography
- Visible side-walls/depth
- Zero golden pixels
- Red brick around letters
- Multi-plane shadows
- **Score**: 36-42/45 (80-93%)

### If Test 1.1 Fails (Pessimistic):
- Wrong colors (not navy)
- Wrong font (not serif)
- Flat appearance (no depth)
- Yellow glow artifacts
- Uniform shadow blur
- **Score**: 15-25/45 (33-55%)

---

## 🔍 What to Look For

### Good Signs (Keep Testing):
- Navy blue letters
- Subtle depth on at least one letter
- No yellow anywhere
- Brick texture visible
- Shadow gradation

### Bad Signs (Stop & Analyze):
- Wrong colors
- Perfectly flat
- Yellow glow
- Golden zone still visible
- Uniform shadows

---

## 📚 Full Documentation List

**Testing Framework**:
- `README_TESTING.md` (This file) - Quick start
- `TEST_EXECUTION_GUIDE.md` - Detailed instructions (550+ lines)
- `TESTING_INSTRUCTIONS.md` - Quick reference (400+ lines)
- `TEST_FRAMEWORK_READY.md` - Readiness check (600+ lines)
- `TEST_IMPLEMENTATION_STATUS.md` - Status report (400+ lines)
- `TESTING_PLAN_IMPLEMENTATION_COMPLETE.md` - Executive summary (400+ lines)

**Configuration**:
- `test-manifest.json` - 12 test case definitions
- `verify-prompt-changes.sh` - Deployment verification (passed 13/13)
- `run-test-validation.sh` - Per-test validation automation

**Templates**:
- `test-results/README.md` - Results directory guide
- `test-results/validation-template.md` - Per-test documentation template

**Previous Work** (Reference):
- `SYSTEM_AUDIT_AND_PROMPT_LIBRARY.md` - Complete prompt library (620 lines)
- `GEMINI_TECHNICAL_DIAGNOSTIC_REPORT.md` - Neural path analysis
- `POWER_WORD_IMPLEMENTATION.md` - Vocabulary changes
- `3D_PROMPT_CHEAT_SHEET.md` - Quick reference
- `GOLDEN_ZONE_ERASURE_PROTOCOL.md` - Mask handling
- `DEPLOYMENT_SUMMARY.md` - Change log

**Total**: 3,000+ lines of documentation

---

## ⏱️ Time Estimates

| Activity | Time | Priority |
|----------|------|----------|
| Verify deployment | 1 min | High |
| Prepare test asset | 10 min | High |
| Execute Test 1.1 | 20-30 min | **CRITICAL** |
| Analyze Test 1.1 | 10 min | High |
| Complete Phase 1 | 1.5-2 hours | High |
| Complete Phases 2-4 | 2-4 hours | Medium |
| Final summary | 30-45 min | High |

**Total**: 4-7 hours for full testing  
**Minimum**: 20-30 min for smoke test (Test 1.1 only)

---

## ✨ What's Ready

✅ Test directories created  
✅ 12 test cases defined  
✅ 3,000+ lines documentation  
✅ 2 automation scripts (both executable)  
✅ Validation templates ready  
✅ 4-point checklist defined  
✅ Scoring system established  
✅ Deployment verified (13/13)  
✅ Dev server running  

---

## 🎯 Next Action

**1. Open**: [`TEST_EXECUTION_GUIDE.md`](TEST_EXECUTION_GUIDE.md)  
**2. Go to**: Phase 1 → Test 1.1: VALERIA Navy Blue  
**3. Execute**: Follow step-by-step instructions  
**4. Time**: 20-30 minutes  

---

## 💡 Pro Tips

1. **Test one at a time** - Don't rush
2. **Document immediately** - Fill validation form right after
3. **Take screenshots** - Capture everything
4. **Use eyedropper** - Verify colors numerically
5. **Check terminal** - Monitor prompts being generated
6. **Be objective** - Use scoring rubric consistently

---

## 🚀 Ready to Begin

**Status**: ALL SYSTEMS GO ✅

**Start**: [`TEST_EXECUTION_GUIDE.md`](TEST_EXECUTION_GUIDE.md) → Test 1.1

**Questions?** Check troubleshooting section or review full documentation.

**Good luck!** 🎉
