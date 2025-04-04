#!/bin/bash

echo "🛡️ Final dependency fix (v3)..."

# Step 1: Backup current state
echo "📦 Backing up current state..."
cp package.json package.json.bak.v3
[ -f .npmrc ] && cp .npmrc .npmrc.bak.v3

# Step 2: Create minimal package.json
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
  },
  "devDependencies": {
    "@types/node": "20.11.0",
    "@types/react": "18.2.48",
    "@types/react-dom": "18.2.18",
    "typescript": "5.3.3"
  }
}
EOF

# Step 3: Clean environment
echo "🧹 Cleaning environment..."
rm -rf node_modules package-lock.json
rm -f .npmrc

# Step 4: Configure npm
echo "⚙️ Configuring npm..."
cat > .npmrc << 'EOF'
registry=https://registry.npmjs.org/
engine-strict=true
legacy-peer-deps=true
strict-peer-dependencies=false
auto-install-peers=true
EOF

# Step 5: Install core dependencies
echo "📦 Installing core Next.js dependencies..."
npm install

# Step 6: Add other dependencies one by one
echo "📦 Installing additional dependencies..."

# UI dependencies
npm install --save \
  framer-motion@10.18.0 \
  @radix-ui/react-label@2.0.2 \
  clsx@2.1.0 \
  tailwind-merge@2.2.1

# 3D dependencies
npm install --save \
  three@0.159.0 \
  @react-three/fiber@8.15.16 \
  @react-three/drei@9.99.0

# Dev dependencies
npm install --save-dev \
  @types/three@0.159.0 \
  autoprefixer@10.4.16 \
  postcss@8.4.33 \
  tailwindcss@3.4.1

# Step 7: Update package.json with security fixes
echo "🔒 Adding security overrides..."
node -e '
const fs = require("fs");
const pkg = require("./package.json");

// Add peerDependencies
pkg.peerDependencies = {
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
};

// Add overrides for security
pkg.overrides = {
  "@babel/traverse": "7.23.7",
  "postcss": "8.4.33",
  "follow-redirects": "1.15.4"
};

// Add resolutions for security
pkg.resolutions = pkg.overrides;

fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
'

# Step 8: Generate lock file
echo "🔒 Generating package lock..."
npm install --package-lock-only

# Step 9: Final install
echo "📦 Running final install..."
npm install --legacy-peer-deps

# Step 10: Run security audit
echo "🔍 Running security audit..."
npm audit

echo "✅ Setup complete!"
echo "🚀 You can now run: npm run dev"
