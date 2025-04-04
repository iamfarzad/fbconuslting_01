#!/bin/bash

echo "🔧 Fixing TypeScript configuration and dependencies..."

# Step 1: Install missing type definitions
echo "📦 Installing type definitions..."
npm install --save-dev \
  @types/jest@29.5.12 \
  @types/node@20.11.24 \
  @types/react@18.2.61 \
  @types/react-dom@18.2.19 \
  @types/three@0.161.2 \
  @types/uuid@9.0.8

# Step 2: Update tsconfig.json
echo "⚙️ Updating TypeScript configuration..."
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
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
    },
    "baseUrl": ".",
    "downlevelIteration": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# Step 3: Update motion components types
echo "🎨 Creating type definitions for motion components..."
cat > src/types/motion.d.ts << 'EOF'
import { HTMLMotionProps, MotionProps } from "framer-motion"

declare module "framer-motion" {
  export interface MotionComponentProps extends MotionProps {
    className?: string
    children?: React.ReactNode
    [key: string]: any
  }
  
  export interface HTMLMotionProps<T> extends MotionComponentProps {
    as?: React.ElementType
  }
}
EOF

# Step 4: Fix import aliases
echo "🔄 Creating type declarations for missing modules..."
mkdir -p src/@types

cat > src/@types/declarations.d.ts << 'EOF'
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';

declare module 'uuid';
declare module 'next-themes';
declare module 'sonner';
declare module 'dotted-map';
declare module '@copilotkit/react-core';
declare module '@vercel/analytics/react';
declare module 'cmdk';
declare module 'vaul';
declare module 'input-otp';
EOF

# Step 5: Clean TypeScript cache
echo "🧹 Cleaning TypeScript cache..."
rm -rf .next/cache/typescript

echo "✅ TypeScript fixes applied!"
echo "🚀 Try building again with: npm run build"
