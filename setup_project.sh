#!/bin/bash

echo "🚀 Starting project setup..."

# Run dependency fixes
./fix_dependencies.sh

# Setup environment variables
./setup_env.sh

# Fix remaining TypeScript issues
./fix_remaining_issues.sh

# Fix Jest setup
./fix_jest_setup.sh

# Make sure next.config.js is correct
cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com'],
  },
  experimental: {
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

echo "✅ Setup complete! You can now run 'npm run dev' to start the development server."