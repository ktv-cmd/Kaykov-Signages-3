#!/bin/bash

# Automated Test Validation Script
# Usage: ./run-test-validation.sh <test-id> <output-image-path>

TEST_ID="$1"
OUTPUT_IMAGE="$2"

if [ -z "$TEST_ID" ] || [ -z "$OUTPUT_IMAGE" ]; then
    echo "Usage: ./run-test-validation.sh <test-id> <output-image-path>"
    echo "Example: ./run-test-validation.sh test-1.1 test-results/test-1.1/output.png"
    exit 1
fi

echo "============================================"
echo "Test Validation Automation"
echo "Test ID: $TEST_ID"
echo "Image: $OUTPUT_IMAGE"
echo "============================================"
echo ""

# Create result directory
TEST_DIR="test-results/$TEST_ID"
mkdir -p "$TEST_DIR"

# Check if image exists
if [ ! -f "$OUTPUT_IMAGE" ]; then
    echo "❌ ERROR: Output image not found: $OUTPUT_IMAGE"
    exit 1
fi

echo "✅ Output image found"
echo ""

# Extract terminal logs for this test
echo "📋 Extracting terminal logs..."
TERMINAL_FILE="$HOME/.cursor/projects/Users-kaykovmedia-Desktop-webs-sign-ai/terminals/763128.txt"

if [ -f "$TERMINAL_FILE" ]; then
    # Get last 200 lines (should capture latest generation)
    tail -n 200 "$TERMINAL_FILE" > "$TEST_DIR/terminal-log.txt"
    echo "✅ Terminal logs saved to $TEST_DIR/terminal-log.txt"
else
    echo "⚠️  Terminal file not found: $TERMINAL_FILE"
fi

echo ""
echo "🔍 Analyzing prompt for power-words..."
echo ""

# Check for power-words in terminal log
if [ -f "$TEST_DIR/terminal-log.txt" ]; then
    POWER_WORD_COUNT=0
    
    # Check for power-words
    if grep -q "EXTRUDED VOLUMETRIC" "$TEST_DIR/terminal-log.txt"; then
        echo "  ✅ Found: EXTRUDED VOLUMETRIC"
        ((POWER_WORD_COUNT++))
    else
        echo "  ❌ Missing: EXTRUDED VOLUMETRIC"
    fi
    
    if grep -q "6-faced mesh" "$TEST_DIR/terminal-log.txt"; then
        echo "  ✅ Found: 6-faced mesh"
        ((POWER_WORD_COUNT++))
    else
        echo "  ❌ Missing: 6-faced mesh"
    fi
    
    if grep -q "Z-axis.*89mm" "$TEST_DIR/terminal-log.txt"; then
        echo "  ✅ Found: Z-axis with 89mm specification"
        ((POWER_WORD_COUNT++))
    else
        echo "  ❌ Missing: Z-axis with 89mm"
    fi
    
    if grep -q "Metallic 0.95.*Roughness 0.35" "$TEST_DIR/terminal-log.txt"; then
        echo "  ✅ Found: PBR shader parameters (Metallic/Roughness)"
        ((POWER_WORD_COUNT++))
    else
        echo "  ❌ Missing: PBR shader parameters"
    fi
    
    if grep -q "RAY-TRACED\|Ray-traced" "$TEST_DIR/terminal-log.txt"; then
        echo "  ✅ Found: RAY-TRACED"
        ((POWER_WORD_COUNT++))
    else
        echo "  ❌ Missing: RAY-TRACED"
    fi
    
    echo ""
    echo "  Power-Word Score: $POWER_WORD_COUNT/5"
    
    # Check for banned words
    echo ""
    echo "🚫 Checking for banned words..."
    BANNED_FOUND=0
    
    if grep -q "generative fill" "$TEST_DIR/terminal-log.txt"; then
        echo "  ❌ BANNED WORD FOUND: 'generative fill'"
        ((BANNED_FOUND++))
    fi
    
    if grep -q "replace pixels" "$TEST_DIR/terminal-log.txt"; then
        echo "  ❌ BANNED WORD FOUND: 'replace pixels'"
        ((BANNED_FOUND++))
    fi
    
    if [ $BANNED_FOUND -eq 0 ]; then
        echo "  ✅ No banned words detected"
    fi
    
    echo ""
fi

echo "============================================"
echo "Manual Validation Required:"
echo "============================================"
echo ""
echo "Please perform the 4-Point Checklist manually:"
echo ""
echo "1. ✅/❌ Side-Wall Test (3D Proof)"
echo "   Question: Can you see the thickness of any letter/logo?"
echo ""
echo "2. ✅/❌ Zero Gold Policy (Mask Removal)"
echo "   Question: Any yellow/golden pixels visible?"
echo "   Use eyedropper to check for #FFD740 ±10%"
echo ""
echo "3. ✅/❌ Surface Continuity (Texture Restoration)"
echo "   Question: What's visible around/between sign elements?"
echo ""
echo "4. ✅/❌ Shadow Authenticity (Depth Proof)"
echo "   Question: Do shadows show depth gradation?"
echo ""
echo "============================================"
echo "Document results in: $TEST_DIR/validation.md"
echo "Use template from: test-results/validation-template.md"
echo "============================================"
