#!/bin/bash
# Script to start the development server with correct Node.js path

cd "$(dirname "$0")"
export PATH="./node-v20.18.0-darwin-x64/bin:$PATH"

echo "Starting development server..."
echo "Website will be available at: http://localhost:8080"
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev




