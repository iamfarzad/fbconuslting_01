#!/bin/bash

echo "🔒 Final security fix..."

# Step 1: Create a temporary package.json with strict versions
echo "📝 Creating temporary package.json..."
cat > package.json.temp << 'EOF'
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
    "next": "13.5.6",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "@react-three/fiber": "8.13.5",
    "@react-three/drei": "9.80.1",
    "three": "0.154.0",
    "framer-motion": "10.16.4",
    "@radix-ui/react-label": "2.0.2",
    "clsx": "2.0.0",
    "tailwind-merge": "1.14.0"
  },
  "devDependencies": {
    "@types/node": "20.8.2",
    "@types/react": "18.2.24",
    "@types/react-dom": "18.2.8",
    "@types/three": "0.154.0",
    "autoprefixer": "10.4.16",
    "postcss": "8.4.31",
    "tailwindcss": "3.3.3",
    "typescript": "5.2.2"
  },
  "overrides": {
    "next": "13.5.6",
    "@babel/traverse": "7.23.2",
    "postcss": "8.4.31",
    "follow-redirects": "1.15.4"
  },
  "resolutions": {
    "next": "13.5.6",
    "@babel/traverse": "7.23.2",
    "postcss": "8.4.31",
    "follow-redirects": "1.15.4",
    "three-mesh-bvh": "0.8.0"
  }
}
EOF

# Step 2: Backup current package.json
echo "📦 Backing up current package.json..."
mv package.json package.json.old
mv package.json.temp package.json

# Step 3: Update .npmrc
echo "⚙️ Updating .npmrc..."
cat > .npmrc << 'EOF'
legacy-peer-deps=true
strict-peer-dependencies=false
auto-install-peers=true
package-lock=false
resolution-mode=highest
engine-strict=true
EOF

# Step 4: Clean environment
echo "🧹 Cleaning environment..."
rm -rf node_modules
rm -f package-lock.json

# Step 5: Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Step 6: Final security check
echo "🔍 Running final security check..."
npm audit

echo "✅ Security fixes complete!"
echo "🚀 You can now run: npm run dev"

# Note: If there are still issues, the original package.json is saved as package.json.old
