#!/bin/bash
# Script to build and start preview server

cd "$(dirname "$0")"
export PATH="./node-v20.18.0-darwin-x64/bin:$PATH"

echo "Building project..."
npm run build

echo ""
echo "Starting preview server..."
echo "Website will be available at: http://localhost:4173"
echo "Press Ctrl+C to stop the server"
echo ""

npm run preview




