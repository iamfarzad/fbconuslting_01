#!/bin/bash

echo "🎨 Fixing 3D component dependencies..."

# Remove conflicting packages
echo "🗑️ Removing conflicting packages..."
npm uninstall @react-three/fiber @react-three/drei three

# Install compatible versions
echo "📦 Installing compatible versions..."
npm install \
  @react-three/fiber@8.15.16 \
  @react-three/drei@8.15.16 \
  three@0.156.1 \
  --save \
  --legacy-peer-deps

# Update package.json to enforce compatible versions
echo "📝 Updating package.json resolutions..."
node -e '
const fs = require("fs");
const package = require("./package.json");

// Add resolutions for 3D packages
package.resolutions = {
  ...package.resolutions,
  "@react-three/fiber": "8.15.16",
  "@react-three/drei": "8.15.16",
  "three": "0.156.1",
  "react": "18.2.0",
  "react-dom": "18.2.0"
};

fs.writeFileSync("package.json", JSON.stringify(package, null, 2));
'

# Install remaining dependencies
echo "📦 Reinstalling dependencies..."
npm install --legacy-peer-deps

echo "✅ 3D component dependencies fixed!"
echo "🚀 You can now run: npm run dev"
