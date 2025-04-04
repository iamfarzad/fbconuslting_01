#!/bin/bash

echo "🔄 Starting chat backend integration..."

# Source directory (adjust path as needed)
SOURCE_DIR="/Users/farzad/vscode/fbcounsulting_v2"

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p src/app/api/chat
mkdir -p src/lib/chat
mkdir -p src/types/chat
mkdir -p src/hooks/chat

# Copy chat API routes
echo "📝 Copying chat API routes..."
cp -r "$SOURCE_DIR/app/api/chat/"* src/app/api/chat/

# Copy chat utilities
echo "📝 Copying chat utilities..."
cp -r "$SOURCE_DIR/lib/"* src/lib/chat/

# Copy chat types
echo "📝 Copying chat types..."
cp -r "$SOURCE_DIR/types/"* src/types/chat/

# Copy chat hooks (if they exist)
if [ -d "$SOURCE_DIR/hooks" ]; then
  echo "📝 Copying chat hooks..."
  cp -r "$SOURCE_DIR/hooks/"* src/hooks/chat/
fi

# Extract chat-related dependencies
echo "📦 Updating package.json with chat dependencies..."
node -e '
const sourcePackage = require("'$SOURCE_DIR'/package.json");
const targetPackage = require("./package.json");

const chatDependencies = {
  "@google/generative-ai": sourcePackage.dependencies["@google/generative-ai"],
};

const mergedDependencies = {
  ...targetPackage.dependencies,
  ...chatDependencies
};

targetPackage.dependencies = mergedDependencies;

require("fs").writeFileSync(
  "./package.json",
  JSON.stringify(targetPackage, null, 2)
);
'

echo "✅ Chat backend integration complete!"
echo "🔄 Run 'npm install' to install new dependencies"
