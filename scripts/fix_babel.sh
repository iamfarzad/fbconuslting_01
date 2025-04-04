#!/bin/bash

echo "🔧 Installing Babel dependencies..."

# Install required Babel packages
npm install --save-dev \
  @babel/core@^7.23.5 \
  @babel/preset-env@^7.23.5 \
  @babel/preset-react@^7.23.3 \
  @babel/preset-typescript@^7.23.3

echo "✅ Babel dependencies installed!"

# Fix babel.config.js
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

echo "✅ babel.config.js updated!"
echo "🧹 Cleaning up Next.js cache..."

# Clean .next directory
rm -rf .next

echo "🚀 Ready to run Next.js development server!"
echo "Run: npm run dev"
