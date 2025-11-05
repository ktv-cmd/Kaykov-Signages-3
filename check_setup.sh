#!/bin/bash

echo "╔══════════════════════════════════════════════════════╗"
echo "║  Google Apps Script Integration Test                ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

URL="https://script.google.com/macros/s/AKfycbxlWBMIWgVL5rsW9D-BUnCSyu4Wi4GWrMhLKZb4PAEQzJP0bSYFZtkyddTrZcDbP212pA/exec"

echo "📋 Testing Script URL: $URL"
echo ""

# Test 1: doGet
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST 1: Connection Test (doGet)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
response1=$(curl -s -L "${URL}?test=1" 2>&1)

if echo "$response1" | grep -q "Script function not found"; then
    echo "❌ ERROR: Script function 'doGet' not found"
    echo "   → Code needs to be updated in Google Apps Script"
    echo "   → Make sure you copied ALL code from GOOGLE_APPS_SCRIPT_CODE.js"
elif echo "$response1" | grep -q "status.*ok"; then
    echo "✅ SUCCESS: Script is accessible"
    echo "$response1" | python3 -m json.tool 2>/dev/null || echo "$response1"
else
    echo "⚠️  WARNING: Unexpected response"
    echo "$response1" | head -5
fi
echo ""

# Test 2: doPost
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST 2: Form Submission Test (doPost)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

test_data='{
  "name": "Auto Test User",
  "phone": "+17184784200",
  "email": "autotest@example.com",
  "serviceType": "3D Signs",
  "message": "Automatic test from check_setup.sh script"
}'

response2=$(curl -s -L -X POST "${URL}" \
  -H "Content-Type: application/json" \
  -d "$test_data" 2>&1)

if echo "$response2" | grep -q '"success".*true'; then
    echo "✅ SUCCESS: Form submission worked"
    echo "$response2" | python3 -m json.tool 2>/dev/null || echo "$response2" | head -20
    
    if echo "$response2" | grep -q '"emailSent".*true'; then
        echo ""
        echo "✅ Email was sent successfully!"
    elif echo "$response2" | grep -q '"emailSent".*false'; then
        echo ""
        echo "⚠️  WARNING: Data saved but email was NOT sent"
        echo "   → Check logs in Google Apps Script Executions"
        echo "   → Make sure testEmail() was run and permissions granted"
    fi
elif echo "$response2" | grep -q "Page Not Found"; then
    echo "❌ ERROR: Page not found"
    echo "   → Web App may not be deployed"
    echo "   → Check Deploy → Manage deployments"
else
    echo "⚠️  Response received:"
    echo "$response2" | head -10
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 NEXT STEPS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Check email: ktv@kaykovmedia.com (and Spam folder)"
echo "2. Check Google Sheets for test data"
echo "3. Check Google Apps Script Executions for detailed logs"
echo ""
