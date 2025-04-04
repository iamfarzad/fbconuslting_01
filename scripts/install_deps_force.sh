#!/bin/bash

echo "Removing existing node_modules..."
rm -rf node_modules

echo "Removing package-lock.json..."
rm -f package-lock.json

echo "Installing core dependencies..."
npm install --save \
  lucide-react@^0.358.0 \
  next-themes@^0.2.1 \
  framer-motion@^10.18.0 \
  @tailwindcss/typography@^0.5.10

echo "Installing development dependencies..."
npm install --save-dev \
  @types/react@^18.2.0 \
  @types/node@^18.11.18

echo "Clearing Next.js cache..."
rm -rf .next

echo "Running build to verify changes..."
npm run build

echo "Dependency installation complete!"
