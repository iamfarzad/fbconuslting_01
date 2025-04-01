#!/bin/bash

echo "🔧 Fixing Next.js version and security issues..."

# Remove global Next.js installation
echo "🗑️ Removing global Next.js..."
npm uninstall -g next

# Remove node_modules and package-lock.json
echo "🧹 Cleaning up node_modules..."
rm -rf node_modules
rm -f package-lock.json

# Update package.json to enforce specific versions
echo "📝 Updating package.json dependencies..."
node -e '
const fs = require("fs");
const package = require("./package.json");

// Set specific versions
package.dependencies = {
  ...package.dependencies,
  "next": "13.5.4",
  "react": "18.2.0",
  "react-dom": "18.2.0"
};

// Add resolutions to enforce versions
package.resolutions = {
  "next": "13.5.4",
  "react": "18.2.0",
  "react-dom": "18.2.0"
};

fs.writeFileSync("package.json", JSON.stringify(package, null, 2));
'

# Install dependencies with specific versions
echo "📦 Installing dependencies with correct versions..."
npm install --legacy-peer-deps

# Fix security vulnerabilities
echo "🔒 Fixing security vulnerabilities..."
npm audit fix --force

# Create .npmrc to enforce exact versions
echo "⚙️ Creating .npmrc configuration..."
cat > .npmrc << 'EOF'
save-exact=true
legacy-peer-deps=true
engine-strict=true
EOF

echo "✅ Next.js version and security fixes complete!"
echo "🚀 You can now start the development server with: npm run dev"
