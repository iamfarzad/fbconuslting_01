#!/bin/bash

echo "🚀 Running TypeScript fixes..."

# Install missing dependencies
echo "📦 Installing dependencies..."
npm install --save \
  @radix-ui/react-primitive \
  @types/node \
  @types/react \
  @types/react-dom \
  typescript@latest

# Create types directory if it doesn't exist
mkdir -p src/types/ui

# Update imports
echo "🔄 Updating imports..."
find src -type f -name "*.ts" -o -name "*.tsx" | while read -r file; do
  # Convert relative paths to absolute with @/ alias
  sed -i.bak 's|from "\.\./|from "@/|g' "$file"
  sed -i.bak 's|from "\./|from "@/|g' "$file"
done

# Clean up backup files
find . -name "*.bak" -type f -delete

# Add index.ts for UI component types
echo "📝 Creating UI component type barrel..."
cat > src/types/ui/index.ts << 'EOL'
export * from '../button';
export * from '../chat';
export * from '../modules';

export type ComponentBase = {
  className?: string;
  children?: React.ReactNode;
}
EOL

# Run TypeScript check
echo "🔍 Running type check..."
npx tsc --noEmit

# Run verification scripts
echo "✅ Running verification..."
chmod +x scripts/verify_localization.sh scripts/verify_components.sh
npm run verify:all

echo "Done! Check the output above for any remaining issues."
