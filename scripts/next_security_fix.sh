#!/bin/bash

echo "🛡️ Applying Next.js security fix..."

# Step 1: Backup current package.json
echo "📦 Backing up package.json..."
cp package.json package.json.next.bak

# Step 2: Update Next.js to latest secure version
echo "🔄 Updating Next.js version..."
npm install next@14.2.26 --save --legacy-peer-deps

# Step 3: Add explicit security overrides
echo "🔒 Adding security overrides..."
node -e '
const fs = require("fs");
const pkg = require("./package.json");

// Update Next.js version
pkg.dependencies.next = "14.2.26";

// Ensure overrides are present
pkg.overrides = {
  ...pkg.overrides,
  "next": "14.2.26",
  "@babel/traverse": "7.23.7",
  "follow-redirects": "1.15.4"
};

// Add resolutions for Yarn compatibility
pkg.resolutions = pkg.overrides;

fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
'

# Step 4: Clean and reinstall
echo "🧹 Cleaning and reinstalling..."
rm -rf node_modules/.cache
npm install --legacy-peer-deps --force

# Step 5: Run security audit
echo "🔍 Running security audit..."
npm audit

echo "✅ Next.js security fix complete!"
echo "🚀 You can now run: npm run dev"

# Note: Original package.json is backed up as package.json.next.bak
