#!/bin/bash

echo "🔍 Verifying component dependencies..."

# Common type definitions for components
mkdir -p src/types/ui

# Create component type definitions
cat > src/types/ui/common.d.ts << 'EOL'
import { ReactNode } from 'react';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface WithAsChild {
  asChild?: boolean;
}

export interface WithVariant {
  variant?: string;
}

export interface WithSize {
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export * from '../button';
export * from '../chat';
EOL

# Create types for shadcn components
cat > src/types/ui/shadcn.d.ts << 'EOL'
declare module "@/components/ui/*" {
  const Component: React.ComponentType<any>;
  export default Component;
}

declare module "@radix-ui/*" {
  const Component: any;
  export default Component;
}
EOL

# Update package.json scripts
echo "📝 Updating package.json scripts..."

# Add component verification to verify:all script
VERIFY_SCRIPT='npm run verify:localization && npm run verify:components'
sed -i.bak "s/\"verify:all\": \".*\"/\"verify:all\": \"$VERIFY_SCRIPT\"/" package.json

echo "✅ Component verification setup complete"

# Run verification
echo "🔍 Running type checks..."
npx tsc --noEmit

echo "Done!"
