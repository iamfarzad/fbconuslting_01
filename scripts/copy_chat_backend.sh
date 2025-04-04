#!/bin/bash

SOURCE_DIR="/Users/farzad/vscode/fbcounsulting_v2"
TARGET_DIR="/Users/farzad/vscode/fbconsulting_01"

echo "🤖 Copying Gemini Chat Backend from fbcounsulting_v2..."

# Create necessary directories
mkdir -p "${TARGET_DIR}/src/app/api/chat"
mkdir -p "${TARGET_DIR}/src/lib/chat"
mkdir -p "${TARGET_DIR}/src/types/chat"
mkdir -p "${TARGET_DIR}/src/hooks/chat"

# Copy chat API routes
echo "📋 Copying chat API routes..."
cp -r "${SOURCE_DIR}/src/app/api/chat/"* "${TARGET_DIR}/src/app/api/chat/"
cp -r "${SOURCE_DIR}/app/api/chat/"* "${TARGET_DIR}/src/app/api/chat/" 2>/dev/null

# Copy utility functions used by chat backend
echo "🔧 Copying chat utility functions..."
cp -r "${SOURCE_DIR}/src/lib/chat/"* "${TARGET_DIR}/src/lib/chat/" 2>/dev/null
cp -r "${SOURCE_DIR}/lib/chat/"* "${TARGET_DIR}/src/lib/chat/" 2>/dev/null

# Copy chat types
echo "📝 Copying chat types..."
cp -r "${SOURCE_DIR}/src/types/chat.ts" "${TARGET_DIR}/src/types/chat/" 2>/dev/null
cp -r "${SOURCE_DIR}/types/chat.ts" "${TARGET_DIR}/src/types/chat/" 2>/dev/null

# Copy chat hooks if they exist
echo "🪝 Copying chat hooks..."
cp -r "${SOURCE_DIR}/src/hooks/useChat.ts" "${TARGET_DIR}/src/hooks/chat/" 2>/dev/null
cp -r "${SOURCE_DIR}/hooks/useChat.ts" "${TARGET_DIR}/src/hooks/chat/" 2>/dev/null

# Check if we need to update package.json with any new dependencies
echo "📦 Checking for required dependencies..."
GEMINI_DEP=$(grep -o "\"@google/generative-ai\": \"[^\"]+" "${SOURCE_DIR}/package.json" | head -1)

if [ -n "$GEMINI_DEP" ]; then
  echo "Found dependency: $GEMINI_DEP"
  
  # Check if dependency already exists in target package.json
  if ! grep -q "$GEMINI_DEP" "${TARGET_DIR}/package.json"; then
    echo "Adding @google/generative-ai dependency to package.json"
    sed -i '' "s/\"dependencies\": {/\"dependencies\": {\n    $GEMINI_DEP,/g" "${TARGET_DIR}/package.json"
  else
    echo "@google/generative-ai dependency already exists in package.json"
  fi
fi

echo "✅ Gemini Chat Backend copied successfully!"
echo "🚀 Run 'npm install' to install any new dependencies, then 'npm run dev' to start the development server."
