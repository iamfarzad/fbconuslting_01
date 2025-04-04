#!/bin/bash

# Update dependencies
npm install lucide-react@^0.358.0 autoprefixer@^10.4.16

# Clean the cache
npm cache clean --force

# Remove package-lock.json and node_modules
rm -rf package-lock.json node_modules

# Reinstall all dependencies
npm install

# Run build to verify everything works
npm run build
