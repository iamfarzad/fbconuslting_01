#!/bin/bash

echo "🔧 Removing Babel completely to enable SWC..."

# Remove all babel configuration files
echo "🗑️ Removing ALL Babel configuration files..."
find . -name "babel.config.*" -type f -delete
find . -name ".babelrc*" -type f -delete
rm -f babel.config.js babel.config.js.* .babelrc*

# Remove any cached Babel files in node_modules
echo "🧹 Cleaning up Babel cache..."
rm -rf node_modules/.cache/babel-loader

# Clear Next.js cache
echo "🧹 Clearing Next.js build cache..."
rm -rf .next

# Verify removal was successful
if [ -f "babel.config.js" ] || [ -f ".babelrc" ]; then
  echo "⚠️ Warning: Babel config files still exist. Manual removal required."
  find . -name "babel.config.*" -o -name ".babelrc*"
else
  echo "✅ All Babel configuration files successfully removed."
fi

# Ensure next.config.js has SWC enabled
if [ -f "next.config.js" ]; then
  # Check if SWC is already enabled
  if grep -q "swcMinify: true" next.config.js; then
    echo "✅ SWC already enabled in next.config.js."
  else
    echo "⚠️ Please ensure your next.config.js has SWC enabled."
    echo "Add these lines to your nextConfig object:"
    echo "  swcMinify: true,"
    echo "  compiler: {"
    echo "    styledComponents: true,"
    echo "  },"
  fi
fi

echo "✅ Ready for SWC compilation. Run 'npm run dev' to start the development server."