#!/bin/bash
echo "🔍 Testing Google Apps Script Connection..."
echo ""

URL="https://script.google.com/macros/s/AKfycbxlWBMIWgVL5rsW9D-BUnCSyu4Wi4GWrMhLKZb4PAEQzJP0bSYFZtkyddTrZcDbP212pA/exec"

echo "1. Testing doGet (connection test)..."
echo "-----------------------------------"
response=$(curl -s -L "${URL}?test=1")
echo "Response: $response"
echo ""

echo "2. Testing doPost (form submission)..."
echo "-----------------------------------"
test_data='{"name":"Test User","phone":"+17184784200","email":"test@example.com","serviceType":"3D Signs","message":"Test from script"}'
response=$(curl -s -L -X POST "${URL}" \
  -H "Content-Type: application/json" \
  -d "$test_data")
echo "Response: $response"
echo ""

echo "✅ Test completed!"
echo "Check the responses above for success/error messages."
