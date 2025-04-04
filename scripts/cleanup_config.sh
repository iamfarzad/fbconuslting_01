#!/bin/bash

echo "🧹 Cleaning up configuration files..."

# Remove backup files
echo "Removing backup files..."
rm -f *.bak* 
rm -f *.backup
rm -f *.removed
rm -f *.old

# Keep only necessary configuration files
echo "Keeping only necessary configuration files..."
mv babel.config.js babel.config.js.bak

echo "✅ Configuration files cleaned up"
