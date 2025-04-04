#!/bin/bash

echo "🧹 Deep cleaning project environment..."

# Remove all build artifacts
rm -rf .next
rm -rf node_modules

# Remove ALL Babel configurations thoroughly
find . -name "babel.config.*" -type f -delete
find . -name ".babelrc*" -type f -delete
rm -f babel.config.js .babelrc

# Check for remaining Babel configs
if find . -name "babel.config.*" -o -name ".babelrc*" | grep -q .; then
  echo "⚠️ Warning: Some Babel configs remain. Locations:"
  find . -name "babel.config.*" -o -name ".babelrc*"
else
  echo "✅ All Babel configs removed."
fi

# Fresh install of dependencies
echo "📦 Reinstalling dependencies..."
npm install

# Install missing animation dependency
echo "📦 Installing tailwindcss-animate..."
npm install tailwindcss-animate

# Install React Three Fiber for 3D components if needed
if grep -q "@react-three" src/components/loaders/Logo3DLoader.tsx 2>/dev/null; then
  echo "📦 Installing React Three Fiber..."
  npm install @react-three/fiber @react-three/drei three
fi

# Verify next.config.js has SWC enabled
if grep -q "swcMinify: true" next.config.js; then
  echo "✅ SWC is enabled in next.config.js"
else
  echo "⚠️ SWC may not be enabled in next.config.js. Please check."
fi

echo "🚀 Environment cleaned and ready. Run 'npm run dev' to start."