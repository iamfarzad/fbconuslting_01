#!/bin/bash

echo "Installing required dependencies..."
npm install lucide-react@^0.358.0 \
          @tailwindcss/typography@^0.5.10 \
          next-themes@^0.2.1

echo "Clearing Next.js cache..."
rm -rf .next

echo "Running build to verify changes..."
npm run build

echo "Setup complete! The course feature system is now ready."
