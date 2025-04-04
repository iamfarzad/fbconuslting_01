#!/bin/bash

echo "🧹 Cleaning project..."

# Remove Next.js cache
echo "🗑️ Removing Next.js cache..."
rm -rf .next

# Remove node_modules
echo "🗑️ Removing node_modules..."
rm -rf node_modules

# Remove package-lock.json
echo "🗑️ Removing package-lock.json..."
rm -f package-lock.json

# Clear npm cache
echo "🧼 Clearing npm cache..."
npm cache clean --force

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build the project
echo "🏗️ Building project..."
npm run build

echo "✅ Clean and rebuild complete!"
echo "🚀 You can now start the development server with: npm run dev"
