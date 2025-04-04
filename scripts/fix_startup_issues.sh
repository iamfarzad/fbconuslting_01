#!/bin/bash

echo "🔧 Fixing startup issues..."

# 1. Fix Next.js config
echo "📝 Updating Next.js config..."
cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'source.unsplash.com'],
  },
  experimental: {
    // serverActions is now enabled by default in Next.js 14
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

# 2. Install Babel dependencies
echo "📦 Installing Babel dependencies..."
npm install --save-dev \
  @babel/core@^7.23.5 \
  @babel/preset-env@^7.23.5 \
  @babel/preset-react@^7.23.3 \
  @babel/preset-typescript@^7.23.3 \
  file-loader@^6.2.0

# 3. Fix babel.config.js
echo "📝 Updating babel.config.js..."
cat > babel.config.js << 'EOL'
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
EOL

# 4. Clean .next directory
echo "🧹 Cleaning Next.js cache..."
rm -rf .next

# 5. Add proper types directory structure if missing
echo "📁 Ensuring types directory exists..."
mkdir -p src/types/chat
mkdir -p src/types/literature

# 6. Update package.json scripts if needed
echo "📝 Updating package.json scripts..."
node -e '
const fs = require("fs");
const path = require("path");
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json")));

// Update scripts
pkg.scripts = {
  ...pkg.scripts,
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "clean": "rm -rf .next node_modules",
  "setup": "npm install && npm run build",
  "test": "jest"
};

fs.writeFileSync(path.join(process.cwd(), "package.json"), JSON.stringify(pkg, null, 2));
'

echo "✅ Startup issues fixed!"
echo "🚀 You can now run: npm run dev"
