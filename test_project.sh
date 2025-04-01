#!/bin/bash

echo "🔍 Testing project setup..."

# Step 1: Check dependencies
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
  echo "❌ node_modules not found. Running npm install..."
  npm install --legacy-peer-deps
else
  echo "✅ node_modules found"
fi

# Step 2: Check Next.js version
echo "🔄 Checking Next.js version..."
NEXT_VERSION=$(node -e "console.log(require('./package.json').dependencies.next)")
echo "📊 Next.js version: $NEXT_VERSION"

# Step 3: Check for security issues
echo "🔒 Running security audit..."
npm audit

# Step 4: Check TypeScript compilation
echo "📝 Checking TypeScript compilation..."
npx tsc --noEmit

# Step 5: Check if project can build
echo "🏗️ Testing build process..."
npm run build

echo "✅ Test complete!"
echo "🚀 You can now run: npm run dev"
