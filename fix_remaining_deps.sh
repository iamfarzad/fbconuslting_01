#!/bin/bash

echo "🔧 Fixing remaining dependencies and TypeScript issues..."

# Step 1: Install missing core dependencies
echo "📦 Installing missing dependencies..."
npm install --save-dev autoprefixer@10.4.16
npm install lucide-react@0.330.0

# Step 2: Fix Next.js client/server components
echo "🔄 Adding 'use client' directives..."

# Add 'use client' to about/page.tsx
echo '"use client";

'"$(cat src/app/about/page.tsx)" > src/app/about/page.tsx

# Add 'use client' to contact/page.tsx
echo '"use client";

'"$(cat src/app/contact/page.tsx)" > src/app/contact/page.tsx

# Step 3: Fix next.config.js
echo "⚙️ Updating Next.js config..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig
EOF

# Step 4: Add PostCSS config
echo "⚙️ Adding PostCSS config..."
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Step 5: Clean and reinstall
echo "🧹 Cleaning and reinstalling..."
rm -rf .next
npm install

echo "✅ Fixes applied! Try building again with:"
echo "npm run build"
