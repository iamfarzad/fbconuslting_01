#!/bin/bash

echo "🔧 Converting Next.js configuration..."

# Check if next.config.ts exists
if [ -f next.config.ts ]; then
    echo "📄 Found next.config.ts, converting to next.config.js"
    # Convert TypeScript config to JavaScript
    mv next.config.ts next.config.ts.bak
    cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'source.unsplash.com'],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@tensorflow/tfjs', 'sharp'],
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
    echo "✅ Successfully converted next.config.ts to next.config.js"
else
    echo "❓ next.config.ts not found, checking if next.config.js exists..."
    
    # Check if next.config.js exists
    if [ -f next.config.js ]; then
        echo "✅ next.config.js already exists, checking content..."
        
        # Back up the existing file
        cp next.config.js next.config.js.bak
        
        # Update the file with the correct configuration
        cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'source.unsplash.com'],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@tensorflow/tfjs', 'sharp'],
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
        echo "✅ next.config.js has been updated with the correct configuration"
    else
        echo "❌ Neither next.config.ts nor next.config.js found, creating new file..."
        
        # Create a new next.config.js
        cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'source.unsplash.com'],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@tensorflow/tfjs', 'sharp'],
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
        echo "✅ Created new next.config.js with the correct configuration"
    fi
fi

# Install file-loader if it's not already installed
if ! npm list file-loader > /dev/null 2>&1; then
    echo "📦 Installing file-loader for .glb file support..."
    npm install --save-dev file-loader
fi

echo "🔄 Please restart your Next.js development server"
