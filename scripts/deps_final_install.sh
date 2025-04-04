#!/bin/bash

echo "🔧 Starting final dependency fixes..."

# Step 1: Fix package.json
echo "📝 Creating fixed package.json..."
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
  "resolutions": {
    "next": "13.5.4",
    "@babel/traverse": "7.23.2",
    "postcss": "8.4.31",
    "follow-redirects": "1.15.4"
  }
}
EOF

# Step 2: Clean environment
echo "🧹 Cleaning environment..."
rm -rf node_modules
rm -f package-lock.json

# Step 3: Create .npmrc with strict settings
echo "⚙️ Creating .npmrc..."
cat > .npmrc << 'EOF'
legacy-peer-deps=true
strict-peer-dependencies=false
auto-install-peers=true
resolution-mode=highest
engine-strict=true
EOF

# Step 4: Install dependencies with package-lock
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps --package-lock-only
npm ci --legacy-peer-deps

# Step 5: Run security fixes
echo "🔒 Running security fixes..."
npm audit fix --force

echo "✅ Dependencies fixed successfully!"
echo "🚀 You can now run: npm run dev"
