#!/bin/bash

# Build script for SiteGround deployment
# This script will build your React/Vite project and create a zip file for upload

set -e  # Exit on error

echo "🚀 Starting production build for SiteGround deployment..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed or not in PATH."
    echo ""
    echo "Please install Node.js first:"
    echo "  1. Visit https://nodejs.org/ and download the LTS version"
    echo "  2. Or install via Homebrew: brew install node"
    echo "  3. Or use nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo ""
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed or not in PATH."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo ""

# Build the project
echo "🔨 Building for production..."
npm run build
echo ""

# Check if out folder exists
if [ ! -d "out" ]; then
    echo "❌ Build failed: out folder not found"
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "📁 Build output location: ./out"
echo ""

# Create zip file
ZIP_NAME="kaykov-media-siteground-$(date +%Y%m%d-%H%M%S).zip"
echo "📦 Creating zip file: $ZIP_NAME"
cd out
zip -r "../$ZIP_NAME" . -q
cd ..
echo ""

echo "✅ Zip file created: $ZIP_NAME"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📤 DEPLOYMENT INSTRUCTIONS FOR SITEGROUND:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Upload the zip file '$ZIP_NAME' to your SiteGround hosting"
echo "2. Extract the zip file contents to your public_html folder"
echo "3. Make sure all files from the out folder are in public_html"
echo "4. Your website should be live at your domain!"
echo ""
echo "📂 Upload folder: out/ (or extract $ZIP_NAME to public_html)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

