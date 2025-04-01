#!/bin/bash

echo "🔄 Reinstalling Next.js and dependencies..."

# First remove problematic cache folders
echo "🧹 Cleaning npm cache directories..."
rm -rf ~/.npm/_cacache
rm -rf ~/.npm/_logs

# Create fresh npm cache directory
echo "📁 Creating fresh npm cache..."
mkdir -p ~/.npm/_cacache

# Clear npm cache
echo "🧼 Clearing npm cache..."
npm cache clean --force

# Install Next.js globally
echo "🌐 Installing Next.js globally..."
npm install -g next

# Install core dependencies first
echo "📦 Installing core dependencies..."
npm install react@18.2.0 react-dom@18.2.0 next@13.5.4 --save --legacy-peer-deps

# Install other necessary dependencies
echo "📚 Installing additional dependencies..."
npm install \
  @types/node \
  @types/react \
  @types/react-dom \
  typescript \
  tailwindcss \
  autoprefixer \
  postcss \
  clsx \
  tailwind-merge \
  framer-motion \
  @radix-ui/react-label \
  --save-dev --legacy-peer-deps

# Verify Next.js installation
echo "✅ Verifying Next.js installation..."
next --version

echo "🚀 Setup complete! You can now run:"
echo "npm run dev"
