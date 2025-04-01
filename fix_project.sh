#!/bin/bash

echo "🔧 Starting comprehensive project fix..."

# Step 1: Backup current package.json
echo "📦 Creating backup of package.json..."
cp package.json package.json.bak

# Step 2: Clean environment
echo "🧹 Cleaning environment..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
npm cache clean --force

# Step 3: Reset Next.js configuration
echo "⚙️ Resetting Next.js configuration..."
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

# Step 4: Update package.json with fixed versions
echo "📝 Updating package.json with fixed versions..."
node -e '
const fs = require("fs");
const pkg = require("./package.json");

// Core dependencies
pkg.dependencies = {
  "next": "13.5.4",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "@react-three/fiber": "8.9.2",
  "@react-three/drei": "9.88.17",
  "three": "0.152.2",
  "framer-motion": "^10.16.4",
  "@radix-ui/react-label": "^2.0.2",
  "clsx": "^2.0.0",
  "tailwind-merge": "^1.14.0",
  ...pkg.dependencies
};

// Development dependencies
pkg.devDependencies = {
  "@types/node": "^20.8.2",
  "@types/react": "^18.2.24",
  "@types/react-dom": "^18.2.8",
  "@types/three": "0.152.1",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.31",
  "tailwindcss": "^3.3.3",
  "typescript": "^5.2.2",
  ...pkg.devDependencies
};

// Add overrides for security
pkg.overrides = {
  "next": "13.5.4",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "@babel/traverse": "^7.23.2",
  "postcss": "^8.4.31",
  "follow-redirects": "^1.15.4"
};

fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
'

# Step 5: Create .npmrc
echo "⚙️ Creating .npmrc..."
cat > .npmrc << 'EOF'
legacy-peer-deps=true
strict-peer-dependencies=false
auto-install-peers=true
registry=https://registry.npmjs.org/
EOF

# Step 6: Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Step 7: Run security fixes
echo "🛡️ Running security fixes..."
npm audit fix --force

# Step 8: Build project
echo "🏗️ Building project..."
npm run build

echo "✅ Project fix complete!"
echo "🚀 You can now run: npm run dev"
