#!/bin/bash

echo "🧪 Fixing test configuration and environment issues..."

# 1. Create jest configuration
echo "📝 Creating Jest configuration..."
cat > jest.config.js << 'EOF'
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
EOF

# 2. Update setupTests.js with all required imports
echo "🔄 Updating test setup..."
cat > src/test/setupTests.js << 'EOF'
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class IntersectionObserver {
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

// Mock ResizeObserver
class ResizeObserver {
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserver,
});
EOF

# 3. Create environment type definitions
echo "🌍 Creating environment type definitions..."
cat > src/types/env.d.ts << 'EOF'
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GEMINI_API_KEY: string;
    NEXT_PUBLIC_GA_TRACKING_ID: string;
    NEXT_PUBLIC_WS_BASE_URL: string;
    NEXT_PUBLIC_API_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
EOF

# 4. Update tsconfig to include test files
echo "⚙️ Updating TypeScript configuration..."
cat > tsconfig.json << 'EOF'
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
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "src/test/setupTests.js"
  ],
  "exclude": ["node_modules"]
}
EOF

# 5. Create example environment file
echo "🔒 Creating example environment file..."
cat > .env.example << 'EOF'
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_GA_TRACKING_ID=your-ga-tracking-id
NEXT_PUBLIC_WS_BASE_URL=wss://api.your-domain.com/ws
NEXT_PUBLIC_API_URL=https://api.your-domain.com
EOF

# 6. Install required testing dependencies
echo "📦 Installing testing dependencies..."
npm install --save-dev \
  @testing-library/jest-dom@6.1.2 \
  @testing-library/react@14.0.0 \
  @testing-library/user-event@14.4.3 \
  jest@29.6.4 \
  jest-environment-jsdom@29.6.4 \
  jest-canvas-mock@2.5.2 \
  @types/testing-library__jest-dom@5.14.9

# 7. Update package.json scripts
echo "📝 Updating package.json scripts..."
node -e '
const fs = require("fs");
const package = require("./package.json");
package.scripts = {
  ...package.scripts,
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
};
fs.writeFileSync("package.json", JSON.stringify(package, null, 2));
'

echo "✅ Test configuration and environment fixes complete!"
echo "🧪 Run 'npm test' to verify the setup"
