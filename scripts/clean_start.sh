#!/bin/bash

echo "🧹 Cleaning up and preparing for a fresh UI-only start..."

# Clear any Next.js cache
rm -rf .next

# Remove any environment-specific files that might cause conflicts
rm -f .env.local

# Remove backup and temporary files
echo "🗑️ Removing backup and temporary files..."
find . -name "*.bak" -o -name "*.backup" -o -name "*.removed" -o -name "*.temp" -o -name "*.old" | xargs rm -f

# Remove Babel configuration files
echo "🗑️ Removing Babel configuration files..."
rm -f babel.config.js babel.config.js.* .babelrc*

# Install only required packages for the frontend
npm install

# Start the development server in a clean state
echo "🚀 Starting development server with UI components only..."
npm run dev
