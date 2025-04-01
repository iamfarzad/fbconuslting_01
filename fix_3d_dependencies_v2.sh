#!/bin/bash

echo "🎨 Fixing 3D component dependencies (v2)..."

# Remove conflicting packages
echo "🗑️ Removing conflicting packages..."
npm uninstall @react-three/fiber @react-three/drei three

# Install compatible versions
echo "📦 Installing compatible versions..."
npm install \
  @react-three/fiber@8.9.2 \
  @react-three/drei@9.88.17 \
  three@0.152.2 \
  @types/three@0.152.1 \
  --save \
  --legacy-peer-deps

# Update package.json to enforce compatible versions
echo "📝 Updating package.json dependencies..."
node -e '
const fs = require("fs");
const package = require("./package.json");

// Set specific versions
package.dependencies = {
  ...package.dependencies,
  "@react-three/fiber": "8.9.2",
  "@react-three/drei": "9.88.17",
  "three": "0.152.2",
};

package.devDependencies = {
  ...package.devDependencies,
  "@types/three": "0.152.1"
};

// Add overrides for React compatibility
package.overrides = {
  ...package.overrides,
  "react": "18.2.0",
  "react-dom": "18.2.0"
};

fs.writeFileSync("package.json", JSON.stringify(package, null, 2));
'

# Create .npmrc with overrides settings
echo "⚙️ Updating .npmrc configuration..."
cat > .npmrc << 'EOF'
legacy-peer-deps=true
strict-peer-dependencies=false
auto-install-peers=true
EOF

# Install dependencies again
echo "📦 Reinstalling all dependencies..."
npm install --legacy-peer-deps

echo "✅ 3D component dependencies fixed!"
echo "🚀 You can now run: npm run dev"
