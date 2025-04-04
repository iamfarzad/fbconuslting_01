#!/bin/bash

echo "🔧 Fixing design and runtime issues..."

# Step 1: Fix layout.tsx import
echo "Fixing layout.tsx import..."
sed -i'.bak' 's/from "next";/from "next";/g' src/app/layout.tsx

# Step 2: Replace react-router-dom with Next.js navigation
echo "Replacing react-router-dom with Next.js navigation..."
find src -type f -name "*.tsx" -exec sed -i'.bak' 's|import.*from "react-router-dom"|import { useRouter } from "next/navigation"|g' {} \;
find src -type f -name "*.tsx" -exec sed -i'.bak' 's|useNavigate|useRouter|g' {} \;
find src -type f -name "*.tsx" -exec sed -i'.bak' 's|navigate(\(.*\))|router.push(\1)|g' {} \;

# Step 3: Fix EnhancedTestimonialCard.tsx
echo "Fixing EnhancedTestimonialCard.tsx..."
mkdir -p src/components/testimonials
cat > src/components/testimonials/EnhancedTestimonialCard.tsx << 'EOF'
"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Author {
  name: string;
  image?: string;
  title?: string;
}

interface TestimonialProps {
  content: string;
  author?: Author;
  className?: string;
}

export function EnhancedTestimonialCard({ content, author, className }: TestimonialProps) {
  return (
    <Card className={cn("relative overflow-hidden p-6", className)}>
      <div className="relative z-20 space-y-4">
        <blockquote className="text-lg leading-relaxed">
          "{content}"
        </blockquote>
        {author && (
          <figcaption className="flex items-center space-x-4">
            {author.image && (
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <img
                  src={author.image}
                  alt={author.name}
                  className="object-cover"
                />
              </div>
            )}
            <div className="text-sm">
              <div className="font-medium">{author.name}</div>
              {author.title && (
                <div className="text-gray-600 dark:text-gray-400">{author.title}</div>
              )}
            </div>
          </figcaption>
        )}
      </div>
    </Card>
  );
}
EOF

# Step 4: Fix services page export
echo "Fixing services page export..."
mkdir -p src/app/services
cat > src/app/services/page.tsx << 'EOF'
import { Metadata } from "next";
import { ServiceDetails } from "@/components/services/ServiceDetails";

export const metadata: Metadata = {
  title: "Services | FB Consulting",
  description: "Explore our range of consulting services",
};

export default function ServicesPage() {
  return <ServiceDetails />;
}
EOF

# Step 5: Remove react-router-dom from dependencies
echo "Removing react-router-dom..."
npm remove react-router-dom

# Step 6: Update globals.css with original styles
echo "Updating global styles..."
mkdir -p src/app
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
 
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
 
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
 
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
 
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
 
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
 
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
 
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
 
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
 
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
EOF

# Step 7: Clean up backup files
echo "Cleaning up backup files..."
find . -type f -name "*.bak" -delete

# Step 8: Clean up and reinstall dependencies
echo "Cleaning up and reinstalling dependencies..."
rm -rf .next
rm -rf node_modules
npm install

echo "✅ Design and runtime fixes applied!"
echo "🚀 Try building and running the project with:"
echo "npm run build && npm start"
