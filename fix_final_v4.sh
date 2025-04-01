#!/bin/bash

echo "🛡️ Final dependency fix (v4)..."

# Step 1: Backup current state
echo "📦 Backing up current state..."
cp package.json package.json.bak.v4
[ -f .npmrc ] && cp .npmrc .npmrc.bak.v4

# Step 2: Clean environment
echo "🧹 Cleaning environment..."
rm -rf node_modules package-lock.json
rm -f .npmrc

# Step 3: Create minimal package.json
echo "📝 Creating minimal package.json..."
cat > package.json << 'EOF'
{
  "name": "fbconsulting_01",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.1.0",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}
EOF

# Step 4: Install core dependencies
echo "📦 Installing core dependencies..."
npm install

# Step 5: Add TypeScript
echo "🔧 Adding TypeScript..."
npm install --save-dev typescript @types/react @types/node @types/react-dom

# Step 6: Add UI dependencies
echo "🎨 Adding UI dependencies..."
npm install --save \
  framer-motion@10.18.0 \
  @radix-ui/react-label@2.0.2 \
  clsx@2.1.0 \
  tailwind-merge@2.2.1

# Step 7: Add Tailwind and PostCSS
echo "🎨 Installing Tailwind and PostCSS..."
npm install --save-dev tailwindcss@3.4.1
npm install --save-dev postcss@8.4.33 --force

# Step 8: Add 3D dependencies
echo "🎮 Installing 3D dependencies..."
npm install --save \
  three@0.159.0 \
  @react-three/fiber@8.15.16 \
  @react-three/drei@9.99.0 \
  @types/three@0.159.0

# Step 9: Configure npm
echo "⚙️ Configuring npm..."
cat > .npmrc << 'EOF'
registry=https://registry.npmjs.org/
engine-strict=true
legacy-peer-deps=true
strict-peer-dependencies=false
auto-install-peers=true
resolution-mode=highest
save-exact=true
EOF

# Step 10: Update package.json
echo "📝 Updating package.json..."
node -e '
const fs = require("fs");
const pkg = require("./package.json");

// Add peerDependencies
pkg.peerDependencies = {
  "react": "18.2.0",
  "react-dom": "18.2.0"
};

// Add security overrides
pkg.overrides = {
  "@babel/traverse": "7.23.7",
  "follow-redirects": "1.15.4",
  "three-mesh-bvh": "0.6.8"
};

fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
'

# Step 11: Final install and cleanup
echo "🧹 Final install and cleanup..."
rm -f package-lock.json
npm install --legacy-peer-deps --force

# Step 12: Run security audit
echo "🔍 Running security audit..."
npm audit

echo "✅ Setup complete!"
echo "🚀 You can now run: npm run dev"
