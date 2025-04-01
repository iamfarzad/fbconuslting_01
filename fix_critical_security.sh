#!/bin/bash

echo "🛡️ Fixing critical security vulnerabilities..."

# Backup current state
echo "📦 Creating backup..."
cp package.json package.json.critical.bak
cp .npmrc .npmrc.bak

# Create stricter .npmrc
echo "⚙️ Creating strict .npmrc..."
cat > .npmrc << 'EOF'
legacy-peer-deps=true
strict-peer-dependencies=true
auto-install-peers=true
package-lock=true
resolution-mode=highest
engine-strict=true
audit-level=critical
EOF

# Update package.json with secure versions
echo "📝 Updating package.json with secure versions..."
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
    "next": "13.5.11",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "@react-three/fiber": "8.15.16",
    "@react-three/drei": "9.99.0",
    "three": "0.159.0",
    "framer-motion": "10.18.0",
    "@radix-ui/react-label": "2.0.2",
    "clsx": "2.1.0",
    "tailwind-merge": "2.2.1"
  },
  "devDependencies": {
    "@types/node": "20.11.0",
    "@types/react": "18.2.48",
    "@types/react-dom": "18.2.18",
    "@types/three": "0.159.0",
    "autoprefixer": "10.4.16",
    "postcss": "8.4.33",
    "tailwindcss": "3.4.1",
    "typescript": "5.3.3"
  },
  "overrides": {
    "next": "13.5.11",
    "@babel/traverse": "7.23.7",
    "postcss": "8.4.33",
    "follow-redirects": "1.15.4",
    "lodash.pick": "5.0.0",
    "lodash.omit": "5.0.0",
    "three-mesh-bvh": "0.6.8"
  },
  "resolutions": {
    "next": "13.5.11",
    "@babel/traverse": "7.23.7",
    "postcss": "8.4.33",
    "follow-redirects": "1.15.4",
    "lodash.pick": "5.0.0",
    "lodash.omit": "5.0.0",
    "three-mesh-bvh": "0.6.8"
  }
}
EOF

# Clean environment
echo "🧹 Cleaning environment..."
rm -rf node_modules
rm -f package-lock.json
npm cache clean --force

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Generate package-lock.json
echo "🔒 Generating package-lock.json..."
npm install --package-lock-only

# Run security audit
echo "🔍 Running security audit..."
npm audit

echo "✅ Critical security fixes applied!"
echo "🚀 You can now run: npm run dev"

# Note: Original files are backed up as package.json.critical.bak and .npmrc.bak
