#!/bin/bash

echo "🔧 Fixing Babel configuration issues..."

# Remove all babel configuration files with more thorough pattern matching
echo "🗑️ Removing existing Babel configuration files..."
find . -name "babel.config.*" -type f -delete
find . -name ".babelrc*" -type f -delete
rm -f babel.config.js babel.config.js.* .babelrc* babel.config.js.bak babel.config.js.removed

# Remove any cached Babel files in node_modules
echo "🧹 Cleaning up Babel cache..."
rm -rf node_modules/.cache/babel-loader

# Install necessary Babel dependencies
echo "📦 Installing Babel dependencies..."
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime
npm install --save @babel/runtime

# Create minimal Next.js-compatible .babelrc
echo "✏️ Creating minimal .babelrc..."
cat > .babelrc << 'EOF'
{
  "presets": ["next/babel"],
  "plugins": []
}
EOF

# Clear Next.js cache
echo "🧹 Clearing Next.js build cache..."
rm -rf .next

# Verify removal was successful
if [ -f "babel.config.js" ]; then
  echo "⚠️ Warning: babel.config.js still exists. Manual removal may be required."
else
  echo "✅ babel.config.js successfully removed."
fi

if [ -f ".babelrc" ]; then
  echo "✅ New minimal .babelrc created."
else
  echo "⚠️ Warning: Failed to create .babelrc. Manual creation may be required."
fi

echo "✅ Babel configuration issues fixed. Run 'npm run dev' to start the development server."
