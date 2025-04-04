#!/bin/bash

# Make sure all scripts are executable
chmod +x scripts/*.sh

# Install required dependencies
npm install lucide-react@^0.358.0 \
          @tailwindcss/typography@^0.5.10 \
          next-themes@^0.2.1 \
          @types/react@^18.2.0 \
          framer-motion@^10.18.0

# Clear Next.js cache to ensure clean builds
rm -rf .next

# Run typescript checks
echo "Running type checks..."
npm run lint

echo "Dependencies installed and configured successfully!"
