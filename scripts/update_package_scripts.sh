#!/bin/bash

echo "📝 Updating package.json scripts..."

# Update package.json scripts
node -e '
const fs = require("fs");
const pkg = require("../package.json");

// Update scripts
pkg.scripts = {
  ...pkg.scripts,
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "clean": "rm -rf .next node_modules",
  "setup": "npm install && npm run build",
  "test": "jest"
};

fs.writeFileSync("../package.json", JSON.stringify(pkg, null, 2));
'

echo "✅ Package scripts updated!"
echo "🚀 You can now run: npm run setup"
