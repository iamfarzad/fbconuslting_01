#!/bin/bash

# Install UI dependencies
npm install lucide-react@^0.358.0 \
          @tailwindcss/typography@^0.5.10 \
          next-themes@^0.2.1 \
          framer-motion@^10.18.0

# Install dev dependencies
npm install --save-dev \
          @types/react@^18.2.0 \
          @types/node@^18.11.18

# Clear Next.js cache and modules
rm -rf .next node_modules/.cache

# Reinstall all dependencies
npm install

echo "Dependencies installed successfully!"
