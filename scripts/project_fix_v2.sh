#!/bin/bash

echo "🔧 Starting project fix (v2)..."

# Step 1: Backup current package.json
echo "📦 Creating backup of package.json..."
cp package.json package.json.bak

# Step 2: Clean environment
echo "🧹 Cleaning environment..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
npm cache clean --force

# Step 3: Create base package.json with minimal dependencies
echo "📝 Creating base package.json..."
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
    "next": "13.5.4",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@types/node": "20.8.2",
    "@types/react": "18.2.24",
    "@types/react-dom": "18.2.8",
    "typescript": "5.2.2"
  }
}
EOF

# Step 4: Install core dependencies first
echo "📦 Installing core dependencies..."
npm install --legacy-peer-deps

# Step 5: Add 3D dependencies
echo "🎨 Adding 3D dependencies..."
npm install @react-three/fiber@8.9.2 @react-three/drei@9.88.17 three@0.152.2 @types/three@0.152.1 --save --legacy-peer-deps

# Step 6: Add UI dependencies
echo "🎯 Adding UI dependencies..."
npm install framer-motion@10.16.4 @radix-ui/react-label@2.0.2 clsx@2.0.0 tailwind-merge@1.14.0 --save --legacy-peer-deps

# Step 7: Add dev dependencies
echo "🛠️ Adding dev dependencies..."
npm install -D autoprefixer@10.4.16 postcss@8.4.31 tailwindcss@3.3.3 --legacy-peer-deps

# Step 8: Create .npmrc
echo "⚙️ Creating .npmrc..."
cat > .npmrc << 'EOF'
legacy-peer-deps=true
strict-peer-dependencies=false
auto-install-peers=true
package-lock=false
EOF

# Step 9: Create minimal next.config.js
echo "⚙️ Creating next.config.js..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
EOF

# Step 10: Restore needed dependencies from backup
echo "📦 Restoring additional dependencies..."
node -e '
const fs = require("fs");
const current = require("./package.json");
const backup = require("./package.json.bak");

// Merge dependencies while keeping our fixed versions
const dependencies = {
  ...current.dependencies,
  ...Object.fromEntries(
    Object.entries(backup.dependencies).filter(([key]) => 
      !current.dependencies[key] && 
      !key.includes("@react-three") && 
      !key.includes("three") &&
      key !== "next" &&
      key !== "react" &&
      key !== "react-dom"
    )
  )
};

current.dependencies = dependencies;
fs.writeFileSync("package.json", JSON.stringify(current, null, 2));
'

# Step 11: Final install and security fixes
echo "🔒 Running final install and security fixes..."
npm install --legacy-peer-deps
npm audit fix --force

echo "✅ Project fix complete!"
echo "🚀 You can now run: npm run dev"
