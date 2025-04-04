#!/bin/bash

echo "🔧 Starting advanced TypeScript error fixes..."

# Update LiteratureItem type to include source property
echo "📝 Updating LiteratureItem type to include source..."
cat > src/types/literature/index.ts << 'EOF'
export interface LiteratureItem {
  id: string | number;
  title: string;
  authors: string | string[];
  year: string | number;
  abstract: string;
  link: string;
  category: string;
  tags: string[];
  source?: string;
}
EOF

# Create missing dependencies for Gemini integration
echo "📦 Installing missing dependencies..."
npm install uuid @testing-library/react @testing-library/jest-dom jest-environment-jsdom lucide-react react-day-picker date-fns --save --legacy-peer-deps

# Create API config file
echo "⚙️ Creating API config..."
mkdir -p src/config
cat > src/config/apiConfig.ts << 'EOF'
const API_CONFIG = {
  gemini: {
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
    baseUrl: 'https://generativelanguage.googleapis.com',
    version: 'v1',
    model: 'gemini-pro',
  },
  openai: {
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
    model: 'gpt-3.5-turbo',
  },
};

export default API_CONFIG;
EOF

# Create Gemini API integration
echo "🔌 Creating Gemini adapter..."
mkdir -p src/services/copilot
cat > src/services/copilot/googleGenAIAdapter.ts << 'EOF'
import API_CONFIG from '@/config/apiConfig';

export async function testGoogleGenAIConnection(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_CONFIG.gemini.baseUrl}/${API_CONFIG.gemini.version}/models`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    
    if (response.ok) {
      return true;
    } else {
      console.error('Failed to connect to Google Generative AI:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Error testing Google Generative AI connection:', error);
    return false;
  }
}

export async function generateResponse(prompt: string, apiKey = API_CONFIG.gemini.apiKey) {
  try {
    const response = await fetch(
      `${API_CONFIG.gemini.baseUrl}/${API_CONFIG.gemini.version}/models/${API_CONFIG.gemini.model}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}
EOF

# Create Gemini API hook
mkdir -p src/hooks
cat > src/hooks/useGeminiAPI.ts << 'EOF'
import { useState, useEffect } from 'react';

export const useGeminiAPI = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);

  // Load API key from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('gemini-api-key');
      if (savedKey) {
        setApiKey(savedKey);
      }
    }
  }, []);

  // Save API key to localStorage when it changes
  const saveApiKey = (key: string) => {
    setApiKey(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini-api-key', key);
    }
  };

  return {
    apiKey,
    setApiKey: saveApiKey,
  };
};
EOF

# Create SearchButton component
mkdir -p src/components/ui/search
cat > src/components/ui/search/SearchButton.tsx << 'EOF'
import React from "react";

export const SearchButton = () => {
  return (
    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </button>
  );
};
EOF

# Create shadcn components
mkdir -p src/components/ui/card
cat > src/components/ui/card.tsx << 'EOF'
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

# Create skeleton component
mkdir -p src/components/ui
cat > src/components/ui/skeleton.tsx << 'EOF'
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
EOF

# Create utils file with cn function
mkdir -p src/lib
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF

# Create progress component
mkdir -p src/components/ui
cat > src/components/ui/progress.tsx << 'EOF'
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
EOF

# Create StepsList component
mkdir -p src/components/courses
cat > src/components/courses/StepsList.tsx << 'EOF'
import React from 'react';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface StepsListProps {
  steps: Step[];
  onSelectStep?: (stepId: string) => void;
  currentStepId?: string;
}

const StepsList: React.FC<StepsListProps> = ({ 
  steps, 
  onSelectStep,
  currentStepId 
}) => {
  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div 
          key={step.id}
          className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors ${
            currentStepId === step.id ? 'border-primary bg-primary/5' : 'border-gray-200'
          }`}
          onClick={() => onSelectStep?.(step.id)}
        >
          <h3 className="font-medium">{step.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
        </div>
      ))}
    </div>
  );
};

export default StepsList;
EOF

# Create mock for toast component
mkdir -p src/components/ui/toast
cat > src/components/ui/toast/index.ts << 'EOF'
export function toast(options: { 
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}) {
  console.log('Toast:', options);
  // In a real implementation, this would show a toast notification
  return {
    id: Date.now(),
    dismiss: () => {},
  };
}
EOF

# Create mock for EnhancedChatContainer
mkdir -p src/components/ui/ai-chat
cat > src/components/ui/ai-chat/EnhancedChatContainer.tsx << 'EOF'
import React from 'react';

export interface EnhancedChatContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  messages?: any[];
  onSendMessage?: (message: string) => Promise<void>;
  onClearChat?: () => void;
  isLoading?: boolean;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
  className?: string;
  isVoiceSupported?: boolean;
  onToggleVoice?: () => void;
  isListening?: boolean;
}

export const EnhancedChatContainer: React.FC<EnhancedChatContainerProps> = ({ 
  children,
  className,
  title = "Chat",
}) => {
  return (
    <div className={`relative border rounded-lg shadow-lg bg-white p-4 ${className}`}>
      {title && <h3 className="font-medium mb-4">{title}</h3>}
      {children}
    </div>
  );
};
EOF

# Create HeroVoiceInput component
mkdir -p src/components/hero
cat > src/components/hero/HeroVoiceInput.tsx << 'EOF'
import React from 'react';

interface HeroVoiceInputProps {
  isListening: boolean;
  toggleListening: () => void;
  isVoiceSupported: boolean;
}

export const HeroVoiceInput: React.FC<HeroVoiceInputProps> = ({
  isListening,
  toggleListening,
  isVoiceSupported
}) => {
  if (!isVoiceSupported) return null;
  
  return (
    <button
      onClick={toggleListening}
      className={`p-3 rounded-full transition-colors ${
        isListening ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
      }`}
      aria-label={isListening ? 'Stop listening' : 'Start voice input'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    </button>
  );
};
EOF

# Add package.json dependencies
echo "📦 Installing more UI dependencies..."
npm install clsx tailwind-merge @radix-ui/react-progress --save --legacy-peer-deps

echo "✅ Advanced TypeScript fixes complete!"
echo "♻️ Restart your TypeScript server in VSCode: Cmd+Shift+P > TypeScript: Restart TS Server"
echo "⚠️ Remember: Some component-specific errors still need manual fixes, especially for test files."