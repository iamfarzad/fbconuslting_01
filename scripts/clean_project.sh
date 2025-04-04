#!/bin/bash

echo "🧹 Cleaning up project structure..."

# Remove any .bak files from the root directory
echo "🗑️ Removing backup files..."
find . -maxdepth 1 -name "*.bak*" -delete

# Remove any remaining fix_ scripts from root
echo "🗑️ Removing remaining script files from root..."
find . -maxdepth 1 -name "fix_*.sh" -delete

# Remove any temporary or unnecessary files
echo "🗑️ Removing temporary files..."
find . -name "*.tmp" -delete
find . -name "*.log" -delete

# Remove Node.js related caches if needed
echo "🗑️ Cleaning up cache files..."
rm -rf .next/cache
rm -rf node_modules/.cache

echo "✅ Project cleaned up successfully!"
echo "🔍 Checking structure..."

# Print summary of project structure
echo "📁 Project structure:"
find . -maxdepth 1 -type f | sort
echo ""
echo "📦 Number of files in scripts directory: $(find ./scripts -type f | wc -l)"
echo "📦 Number of files in src directory: $(find ./src -type f | wc -l)"

echo "🎉 Project structure is now clean and organized!"
echo "🚀 Run 'npm run dev' to start your development server."
