#!/bin/bash

echo "🔧 Converting configuration file extensions..."

# Convert ESLint config
if [ -f eslint.config.mjs ]; then
    echo "📝 Converting ESLint configuration..."
    mv eslint.config.mjs .eslintrc.js
    cat > .eslintrc.js << 'EOF'
/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/no-unescaped-entities': 'off',
  }
}
EOF
fi

# Convert PostCSS config
if [ -f postcss.config.mjs ]; then
    echo "📝 Converting PostCSS configuration..."
    mv postcss.config.mjs postcss.config.js
    cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
  }
}
EOF
fi

# Convert env.mjs if it exists
if [ -f env.mjs ]; then
    echo "📝 Converting environment configuration..."
    mv env.mjs env.js
    cat > env.js << 'EOF'
module.exports = {
  // Your environment configuration here
}
EOF
fi

echo "✅ Configuration files converted successfully!"
echo "🔄 Please restart your development server"
