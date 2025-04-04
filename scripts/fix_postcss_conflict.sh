#!/bin/bash

echo "🔧 Fixing dependency conflicts..."

# Backup package.json
echo "📦 Creating backup of package.json..."
cp package.json package.json.backup

# Remove conflicting dependencies from package.json
echo "🔍 Removing conflicting overrides and dependencies..."
node -e '
const fs = require("fs");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

// Clean up overrides and resolutions
if (pkg.overrides) {
  delete pkg.overrides.postcss;
}

if (pkg.resolutions) {
  delete pkg.resolutions.postcss;
}

// Write the updated package.json
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
'

# Clean dependencies and reinstall
echo "🧹 Cleaning dependencies and reinstalling..."
rm -rf node_modules
rm -f package-lock.json

# Install dependencies without postcss override
echo "📦 Reinstalling dependencies..."
npm install --legacy-peer-deps

echo "✅ Dependencies conflicts fixed!"
echo "🚀 You can now run: npm run dev"
