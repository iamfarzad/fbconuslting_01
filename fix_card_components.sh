#!/bin/bash

echo "🎴 Fixing card component errors..."

# Create card components directory
mkdir -p src/components/ui/card

# Create base card components
cat > src/components/ui/card/index.tsx << 'EOF'
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
EOF

# Update EnhancedTestimonialCard to use proper imports
cat > src/components/testimonials/EnhancedTestimonialCard.tsx << 'EOF'
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface TestimonialProps {
  author: {
    name: string;
    title?: string;
    image?: string;
  };
  content: string;
  rating?: number;
  className?: string;
}

export const EnhancedTestimonialCard: React.FC<TestimonialProps> = ({
  author,
  content,
  rating,
  className = ''
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col bg-white/50 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="pt-6 pb-2 flex-grow">
          {rating && (
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          )}
          <p className="text-gray-700">{content}</p>
        </CardContent>
        <CardFooter className="border-t border-primary/10 pt-4">
          <div className="flex items-center space-x-4">
            {author.image && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={author.image}
                  alt={author.name}
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h4 className="font-medium text-gray-900">{author.name}</h4>
              {author.title && (
                <p className="text-sm text-gray-500">{author.title}</p>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
EOF

# Create MotionCard component
cat > src/components/ui/motion-card.tsx << 'EOF'
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { cn } from "@/lib/utils"

const MotionCard = motion(Card)

export interface MotionCardProps extends React.ComponentProps<typeof Card> {
  whileHover?: any
  whileTap?: any
  initial?: any
  animate?: any
  transition?: any
  variants?: any
}

const CustomMotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MotionCard
        ref={ref}
        className={cn("overflow-hidden", className)}
        {...props}
      >
        {children}
      </MotionCard>
    )
  }
)
CustomMotionCard.displayName = "CustomMotionCard"

export {
  CustomMotionCard as MotionCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
}
EOF

# Add cn utility function if it doesn't exist
mkdir -p src/lib
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF

echo "✅ Card components fixes complete!"
echo "🔄 Please rebuild your project to apply changes"
