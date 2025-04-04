#!/bin/bash

echo "🔧 Creating minimal working Next.js app..."

# 1. Create minimal src/app structure 
echo "📁 Creating minimal app structure..."
mkdir -p src/app

# 2. Create minimal page.tsx and layout.tsx
echo "📝 Creating app files..."

cat > src/app/page.tsx << 'EOL'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to FB Consulting</h1>
      <p className="mt-4 text-xl">AI solutions for modern businesses</p>
    </main>
  );
}
EOL

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

# 3. Create minimal CSS file
mkdir -p src/styles
cat > src/styles/globals.css << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

# 4. Run the app
echo "✅ Minimal app created!"
echo "🚀 You can now run: npm run dev"
