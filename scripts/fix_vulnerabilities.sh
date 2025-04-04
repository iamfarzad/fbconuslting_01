#!/bin/bash

echo "🔒 Fixing security vulnerabilities..."

# Back up package.json before making changes
cp package.json package.json.security.bak

# Run audit fix with force to fix all vulnerabilities
echo "🔧 Running npm audit fix --force..."
npm audit fix --force

# Add security overrides to package.json if needed
echo "🛡️ Adding security overrides to package.json..."
node -e '
const fs = require("fs");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

// Add overrides to fix specific vulnerabilities
pkg.overrides = {
  ...pkg.overrides,
  "@babel/traverse": "^7.23.2",
  "postcss": "^8.4.31",
  "semver": "^7.5.3",
  "follow-redirects": "^1.15.4"
};

// Add resolutions as well for Yarn compatibility
pkg.resolutions = pkg.overrides;

fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
'

# Reinstall dependencies with fixed versions
echo "📦 Reinstalling dependencies with fixed versions..."
npm install --legacy-peer-deps

# Run a final security audit
echo "🔍 Running final security audit..."
npm audit

echo "✅ Security vulnerabilities addressed!"
echo "🚀 You can now run: npm run dev"
