# Add this to your fix_dependencies.sh script after the dependency installations

# Convert next.config.ts to next.config.js
echo "🔄 Converting Next.js config file to supported format..."
cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

module.exports = nextConfig;
EOL

# Optionally remove the unsupported .ts config file
rm next.config.ts

echo "✅ Next.js configuration file converted to supported format"#!/bin/bash

echo "📦 Fixing dependency versions..."

# Create temporary package.json backup
cp package.json package.json.backup

# Update React and ReactDOM versions to match testing library requirements
echo "🔄 Updating React version..."
npm install react@18.2.0 react-dom@18.2.0 --save --legacy-peer-deps

# Install testing dependencies with correct versions
echo "🧪 Installing testing dependencies..."
npm install --save-dev \
  @testing-library/jest-dom@6.1.2 \
  @testing-library/react@14.0.0 \
  @testing-library/user-event@14.4.3 \
  jest@29.6.4 \
  jest-environment-jsdom@29.6.4 \
  jest-canvas-mock@2.5.2 \
  @types/testing-library__jest-dom@5.14.9 \
  --legacy-peer-deps

# Update Next.js version to be compatible with React 18
echo "📝 Updating Next.js version..."
npm install next@13.5.4 --save --legacy-peer-deps

# Install additional required dependencies
echo "➕ Installing additional dependencies..."
npm install --save \
  clsx@2.0.0 \
  tailwind-merge@1.14.0 \
  framer-motion@10.16.4 \
  @radix-ui/react-label@2.0.2 \
  --legacy-peer-deps

# Restore package.json scripts section
echo "🔄 Restoring package scripts..."
node -e '
const fs = require("fs");
const originalPackage = require("./package.json.backup");
const currentPackage = require("./package.json");

currentPackage.scripts = originalPackage.scripts;
fs.writeFileSync("package.json", JSON.stringify(currentPackage, null, 2));
'

# Remove backup
rm package.json.backup

echo "✅ Dependencies updated successfully!"
echo "🔄 Please run 'npm install' to ensure all dependencies are properly installed"
echo "⚠️ Note: Some warnings about peer dependencies may appear but can be ignored"
