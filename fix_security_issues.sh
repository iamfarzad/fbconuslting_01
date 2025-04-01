#!/bin/bash

echo "🔒 Fixing security vulnerabilities..."

# Backup package.json
echo "📦 Backing up package.json..."
cp package.json package.json.backup

# Update package.json to force latest secure versions
echo "📝 Updating dependencies to secure versions..."
node -e '
const fs = require("fs");
const package = require("./package.json");

// Force secure versions
package.resolutions = {
  ...package.resolutions,
  "next": "13.5.4",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "postcss": "^8.4.31",
  "follow-redirects": "^1.15.4",
  "@babel/traverse": "^7.23.2"
};

// Add overrides for security
package.overrides = {
  ...package.overrides,
  "next": "13.5.4",
  "postcss": "^8.4.31",
  "follow-redirects": "^1.15.4",
  "@babel/traverse": "^7.23.2"
};

fs.writeFileSync("package.json", JSON.stringify(package, null, 2));
'

# Clean npm cache
echo "🧹 Cleaning npm cache..."
npm cache clean --force

# Remove node_modules and package-lock.json
echo "🗑️ Removing old dependencies..."
rm -rf node_modules
rm -f package-lock.json

# Install dependencies with forced resolutions
echo "📦 Installing dependencies with security fixes..."
npm install --legacy-peer-deps

# Run security audit fix
echo "🛡️ Running security audit fix..."
npm audit fix --force

# Verify security status
echo "✅ Verifying security status..."
npm audit

echo "🔐 Security fixes complete!"
echo "🚀 You can now start the development server with: npm run dev"
