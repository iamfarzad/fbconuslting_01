#!/bin/bash

echo "🔧 Converting Next.js configuration..."

# Check if next.config.ts exists
if [ -f next.config.ts ]; then
    echo "📝 Found next.config.ts, converting to next.config.js..."
    
    # Create next.config.js with proper content
    cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
EOF

    # Remove the TypeScript version
    echo "🗑️ Removing next.config.ts..."
    rm next.config.ts
    
    echo "✅ Successfully converted Next.js configuration to JavaScript format"
else
    echo "❌ next.config.ts not found"
fi

echo "🔄 Please restart your Next.js development server"
