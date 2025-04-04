#!/bin/bash

echo "🔍 Verifying essential files..."

# Check and create next.config.js if missing
if [ ! -f next.config.js ]; then
    echo "⚠️ next.config.js is missing. Creating it now..."
    cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'source.unsplash.com'],
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
    echo "✅ next.config.js created"
fi

# Check and create minimal app structure if missing
if [ ! -d src/app ]; then
    echo "⚠️ src/app directory is missing. Creating minimal app structure..."
    mkdir -p src/app src/styles
    
    # Create minimal page.tsx
    cat > src/app/page.tsx << 'EOL'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-center">Welcome to FB Consulting</h1>
      <p className="mt-4 text-xl text-center">AI solutions for modern businesses</p>
    </main>
  );
}
EOL

    # Create minimal layout.tsx
    cat > src/app/layout.tsx << 'EOL'
import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FB Consulting',
  description: 'AI consulting services and solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
EOL

    # Create minimal globals.css
    cat > src/styles/globals.css << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL
    echo "✅ Minimal app structure created"
fi

# Check if tsconfig.json exists
if [ ! -f tsconfig.json ]; then
    echo "⚠️ tsconfig.json is missing. Creating it now..."
    cat > tsconfig.json << 'EOL'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOL
    echo "✅ tsconfig.json created"
fi

# Check if package.json exists
if [ ! -f package.json ]; then
    echo "⚠️ package.json is missing. Creating minimal version..."
    cat > package.json << 'EOL'
{
  "name": "fbconsulting_01",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "13.4.19",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "typescript": "5.1.6",
    "@types/node": "20.4.5",
    "@types/react": "18.2.17",
    "@types/react-dom": "18.2.7",
    "tailwindcss": "3.3.3",
    "autoprefixer": "10.4.14",
    "postcss": "8.4.27"
  }
}
EOL
    echo "✅ package.json created"
fi

echo "✅ File verification complete"
echo "🚀 You can now run: npm install && npm run dev"
