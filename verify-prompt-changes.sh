#!/bin/bash

# Verify that power-word changes are actually in the code files
# Run this before starting tests to confirm deployment

echo "============================================"
echo "Power-Word Implementation Verification"
echo "============================================"
echo ""

PROVIDER_FILE="lib/ai/provider.ts"
PLANNER_FILE="lib/ai/variation-planner.ts"

echo "Checking: $PROVIDER_FILE"
echo ""

# Check System Instruction updates
echo "1. Checking System Instruction..."

if grep -q "3D Ray-Tracing Engine" "$PROVIDER_FILE"; then
    echo "   ✅ Role updated: '3D Ray-Tracing Engine' (was 'Architect')"
else
    echo "   ❌ Role NOT updated - still has old language"
fi

if grep -q "VOLUMETRIC VOID" "$PROVIDER_FILE"; then
    echo "   ✅ Golden Zone: 'VOLUMETRIC VOID' present"
else
    echo "   ❌ Golden Zone: Old 'MASK' language only"
fi

if grep -q "GEOMETRIC MESH INSERTION" "$PROVIDER_FILE"; then
    echo "   ✅ Construction: 'GEOMETRIC MESH INSERTION' present"
else
    echo "   ❌ Construction: Old 'replace' language"
fi

if grep -q "EXTRUDED VOLUMETRIC LETTERFORMS" "$PROVIDER_FILE"; then
    echo "   ✅ Geometry: 'EXTRUDED VOLUMETRIC LETTERFORMS' present"
else
    echo "   ❌ Geometry: Old '3D Channel Letters' only"
fi

if grep -q "RAY-TRACED" "$PROVIDER_FILE"; then
    echo "   ✅ Lighting: 'RAY-TRACED' present"
else
    echo "   ❌ Lighting: Old 'soft light spill' language"
fi

if grep -q "Metallic 0.95.*Roughness 0.35.*Anisotropy 0.6" "$PROVIDER_FILE"; then
    echo "   ✅ Materials: PBR parameters present (Metallic/Roughness/Anisotropy)"
else
    echo "   ❌ Materials: No numeric PBR parameters"
fi

if grep -q "SURFACE RESTORATION" "$PROVIDER_FILE"; then
    echo "   ✅ Erasure: SURFACE RESTORATION protocol present"
else
    echo "   ❌ Erasure: No surface restoration logic"
fi

if grep -q "ZERO GOLD POLICY" "$PROVIDER_FILE"; then
    echo "   ✅ Validation: ZERO GOLD POLICY present"
else
    echo "   ❌ Validation: No zero gold requirement"
fi

echo ""
echo "2. Checking for banned words..."

BANNED_COUNT=0

if grep -q "generative fill" "$PROVIDER_FILE"; then
    echo "   ❌ BANNED WORD FOUND: 'generative fill'"
    ((BANNED_COUNT++))
fi

if grep -q "replace the golden zone" "$PROVIDER_FILE"; then
    echo "   ❌ BANNED PHRASE FOUND: 'replace the golden zone'"
    ((BANNED_COUNT++))
fi

if [ $BANNED_COUNT -eq 0 ]; then
    echo "   ✅ No banned words in $PROVIDER_FILE"
fi

echo ""
echo "============================================"
echo "Checking: $PLANNER_FILE"
echo "============================================"
echo ""

if grep -q "VOLUMETRIC SCENE RECONSTRUCTION" "$PLANNER_FILE"; then
    echo "   ✅ User prompt: 'VOLUMETRIC SCENE RECONSTRUCTION' present"
else
    echo "   ❌ User prompt: Old language still present"
fi

if grep -q "GOLDEN ZONE ERASURE PROTOCOL" "$PLANNER_FILE"; then
    echo "   ✅ Erasure: 'GOLDEN ZONE ERASURE PROTOCOL' present"
else
    echo "   ❌ Erasure: No protocol defined"
fi

if grep -q "CRITICAL COLOR REQUIREMENT.*MUST BE" "$PLANNER_FILE"; then
    echo "   ✅ Color: 'CRITICAL COLOR REQUIREMENT: MUST BE' present"
else
    echo "   ❌ Color: Weak color enforcement"
fi

if grep -q "6-faced mesh" "$PLANNER_FILE"; then
    echo "   ✅ Geometry: '6-faced mesh' breakdown present"
else
    echo "   ❌ Geometry: No mesh face specification"
fi

if grep -q "ANISOTROPIC HIGHLIGHTS" "$PLANNER_FILE"; then
    echo "   ✅ Materials: 'ANISOTROPIC HIGHLIGHTS' present"
else
    echo "   ❌ Materials: No anisotropic specification"
fi

echo ""
echo "============================================"
echo "Summary"
echo "============================================"
echo ""

# Count checks
TOTAL_CHECKS=13
PASSED_CHECKS=$(grep -c "✅" <(bash "$0" 2>&1) || echo "0")

echo "Checks Passed: $PASSED_CHECKS/$TOTAL_CHECKS"
echo ""

if [ "$PASSED_CHECKS" -ge 11 ]; then
    echo "✅ DEPLOYMENT VERIFIED - Power-words are active"
    echo "   Safe to proceed with testing"
elif [ "$PASSED_CHECKS" -ge 8 ]; then
    echo "⚠️  PARTIAL DEPLOYMENT - Some power-words missing"
    echo "   Review files before testing"
else
    echo "❌ DEPLOYMENT FAILED - Power-words not properly deployed"
    echo "   DO NOT TEST - Fix deployment first"
fi

echo ""
echo "============================================"
