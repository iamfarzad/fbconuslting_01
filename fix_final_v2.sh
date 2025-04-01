#!/bin/bash

echo "🛡️ Final dependency fix attempt..."

# Step 1: Create temporary package.json with Next.js 15
echo "📝 Creating temporary minimal package.json..."
cat > package.json.tmp << 'EOF'
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
    "next": "15.1.1",
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

# Step 2: Clean environment
echo "🧹 Cleaning environment..."
rm -rf node_modules package-lock.json
npm cache clean --force
rm -f .npmrc

# Step 3: Configure npm
echo "⚙️ Configuring npm..."
npm config set registry https://registry.npmjs.org/
npm config set fetch-retries 5
npm config set fetch-retry-factor 2
npm config set fetch-retry-mintimeout 10000
npm config set fetch-retry-maxtimeout 60000

# Step 4: Create .npmrc
echo "📝 Creating .npmrc..."
cat > .npmrc << 'EOF'
registry=https://registry.npmjs.org/
engine-strict=true
legacy-peer-deps=true
auto-install-peers=true
strict-peer-dependencies=false
resolution-mode=highest
EOF

# Step 5: Install core dependencies
echo "📦 Installing core dependencies..."
mv package.json package.json.old
mv package.json.tmp package.json
npm install

# Step 6: Install remaining dependencies
echo "📦 Installing additional dependencies..."
npm install --save \
  @react-three/fiber@8.15.16 \
  @react-three/drei@9.99.0 \
  three@0.159.0 \
  framer-motion@10.18.0 \
  @radix-ui/react-label@2.0.2 \
  clsx@2.1.0 \
  tailwind-merge@2.2.1

# Step 7: Install dev dependencies
echo "🛠️ Installing dev dependencies..."
npm install --save-dev \
  @types/three@0.159.0 \
  autoprefixer@10.4.16 \
  postcss@8.4.33 \
  tailwindcss@3.4.1

# Step 8: Add security overrides
echo "🔒 Adding security overrides..."
node -e '
const fs = require("fs");
const pkg = require("./package.json");

pkg.overrides = {
  ...pkg.overrides,
  "next": "15.1.1",
  "@babel/traverse": "7.23.7",
  "postcss": "8.4.33",
  "follow-redirects": "1.15.4",
  "three-mesh-bvh": "0.6.8"
};

pkg.resolutions = pkg.overrides;

fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
'

# Step 9: Final dependency resolution
echo "🔨 Final dependency resolution..."
npm install --package-lock-only
npm ci --legacy-peer-deps

# Step 10: Security audit
echo "🔍 Running security audit..."
npm audit

echo "✅ Setup complete!"
echo "🚀 You can now run: npm run dev"
