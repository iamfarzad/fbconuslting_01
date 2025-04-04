#!/bin/bash

# Set colors for better readability
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Removing Babel configurations and enabling SWC compiler ===${NC}\n"

# 1. Remove all Babel configuration files
echo -e "${YELLOW}Removing all Babel configuration files...${NC}"
files_to_remove=$(find . -name "babel.config.*" -o -name ".babelrc*" -type f)

if [ -z "$files_to_remove" ]; then
  echo -e "${GREEN}No Babel configuration files found.${NC}"
else
  echo -e "Found the following Babel files to remove:"
  for file in $files_to_remove; do
    echo -e "  ${RED}$file${NC}"
  done
  
  echo -e "${YELLOW}Removing files...${NC}"
  find . -name "babel.config.*" -o -name ".babelrc*" -type f -delete
  echo -e "${GREEN}✓ All Babel configuration files removed.${NC}"
fi

# 2. Update next.config.js to ensure SWC is enabled
echo -e "\n${YELLOW}Updating next.config.js to ensure SWC is enabled...${NC}"

if [ -f "next.config.js" ]; then
  # Create a temporary file with SWC explicitly enabled
  cat > next.config.js.new << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // Enable SWC compiler
    styledComponents: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@tensorflow/tfjs', 'sharp'],
  },
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'source.unsplash.com'],
  },
  webpack: (config) => {
    // Add support for importing .glb files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[hash].[ext]',
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
EOL

  # Replace the original file
  mv next.config.js.new next.config.js
  echo -e "${GREEN}✓ Updated next.config.js with SWC enabled.${NC}"
else
  echo -e "${RED}next.config.js not found. Creating a new one...${NC}"
  
  # Create a new next.config.js file
  cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // Enable SWC compiler
    styledComponents: true,
  },
};

module.exports = nextConfig;
EOL
  echo -e "${GREEN}✓ Created new next.config.js with SWC enabled.${NC}"
fi

# 3. Clean up node_modules/.cache to ensure no Babel cache remains
echo -e "\n${YELLOW}Cleaning up build cache...${NC}"
if [ -d "node_modules/.cache" ]; then
  rm -rf node_modules/.cache
  echo -e "${GREEN}✓ Build cache cleaned.${NC}"
else
  echo -e "${GREEN}No cache directory found.${NC}"
fi

# 4. Clean Next.js build cache
echo -e "\n${YELLOW}Cleaning Next.js build cache...${NC}"
if [ -d ".next" ]; then
  rm -rf .next
  echo -e "${GREEN}✓ Next.js build cache cleaned.${NC}"
else
  echo -e "${GREEN}No .next directory found.${NC}"
fi

echo -e "\n${GREEN}=== Babel has been removed and SWC compiler is now enabled ===${NC}"
echo -e "${YELLOW}You should now run:${NC}"
echo -e "  npm run dev"
echo -e "to start your application with the SWC compiler."
