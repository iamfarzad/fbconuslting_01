#!/bin/bash

echo "🔧 Starting comprehensive TypeScript error fixes..."

# 1. Create necessary directories
echo "📁 Creating required directories..."
mkdir -p src/types/voice
mkdir -p src/types/gemini
mkdir -p src/features/gemini
mkdir -p src/components/copilot/core/ui
mkdir -p src/components/copilot/core/voice
mkdir -p src/components/copilot/types
mkdir -p src/components/copilot/chat

# 2. Fix Types
echo "📝 Creating type definitions..."

# Voice Types
cat > src/types/voice/index.ts << 'EOF'
export interface VoiceUIProps {
  isListening?: boolean;
  onStart?: () => void;
  onStop?: () => void;
  transcript?: string;
  isTranscribing?: boolean;
  error?: string | null;
}

export interface VoiceConfig {
  enabled: boolean;
  autoStart: boolean;
  language: string;
  continuous?: boolean;
}
EOF

# Gemini Types
cat > src/types/gemini/index.ts << 'EOF'
export interface ProviderMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  timestamp?: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

export interface GeminiState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  userInfo: any;
  step?: string;
  proposal?: any;
}

export interface AIMessage {
  id: string;
  content: string;
  role: string;
  timestamp?: number;
}
EOF

# Copilot Types
cat > src/components/copilot/types/index.ts << 'EOF'
export interface SpatialContext {
  location?: {
    country?: string;
    city?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  device?: {
    type: 'mobile' | 'tablet' | 'desktop';
    browser?: string;
    os?: string;
  };
  time?: {
    timezone?: string;
    localTime?: string;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

export interface WebSocketMessage {
  type: string;
  payload?: any;
}

export interface MessageHandler {
  (message: WebSocketMessage): void;
}

export interface VoiceConfig {
  enabled: boolean;
  autoStart: boolean;
  language: string;
}

export interface ChatConfig {
  defaultMessages: Message[];
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
}
EOF

# 3. Create Missing Components

# AnimatedBars Component
cat > src/components/copilot/core/ui/AnimatedBars.tsx << 'EOF'
import React from 'react';

export const AnimatedBars: React.FC = () => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3].map((bar) => (
        <div
          key={bar}
          className="w-1 h-4 bg-blue-500 animate-pulse"
          style={{
            animationDelay: `${bar * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};
EOF

# Button Component
cat > src/components/copilot/core/ui/button.tsx << 'EOF'
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'px-3 py-1 text-sm': size === 'sm',
            'px-4 py-2': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
EOF

# VoicePanel Component
cat > src/components/copilot/core/voice/VoicePanel.tsx << 'EOF'
import React from 'react';
import { AnimatedBars } from '../ui/AnimatedBars';
import { Button } from '../ui/button';
import { VoiceUIProps } from '@/types/voice';

export const VoicePanel: React.FC<VoiceUIProps> = ({
  isListening,
  onStart,
  onStop,
  transcript,
  isTranscribing,
  error
}) => {
  return (
    <div className="flex flex-col space-y-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <Button
          onClick={isListening ? onStop : onStart}
          variant={isListening ? 'primary' : 'default'}
        >
          {isListening ? 'Stop' : 'Start'} Listening
        </Button>
        {isListening && <AnimatedBars />}
      </div>
      
      {transcript && (
        <div className="text-sm text-gray-600">
          {isTranscribing ? 'Transcribing...' : transcript}
        </div>
      )}
      
      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};
EOF

# Update Literature Item Interface
echo "📚 Updating LiteratureItem interface..."
cat > src/types/literature/index.ts << 'EOF'
export interface LiteratureItem {
  id: string | number;
  title: string;
  authors: string | string[];
  year: string | number;
  abstract: string;
  link: string;
  url?: string;
  category: string;
  tags: string[];
  source?: string;
  summary?: string;
  filename?: string;
  mimeType?: string;
  keywords?: string[];
}
EOF

# Update environment variable handling
echo "🔄 Updating environment variable handling..."
find src -type f -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's/import\.meta\.env\.VITE_/process.env.NEXT_PUBLIC_/g'

# Update ChatServiceType
echo "🤖 Updating ChatServiceType..."
cat > src/services/chat/ChatFactory.ts << 'EOF'
export enum ChatServiceType {
  GEMINI = 'gemini',
  GPT = 'gpt',
  CLAUDE = 'claude',
  MOCK = 'mock'
}

export class ChatFactory {
  static createChatService(type: ChatServiceType, config: any) {
    switch (type) {
      case ChatServiceType.GEMINI:
        return { type: 'gemini', config };
      case ChatServiceType.MOCK:
        return { type: 'mock', config };
      default:
        throw new Error(`Unsupported chat service type: ${type}`);
    }
  }
}
EOF

# Add missing props
echo "🎯 Adding missing props..."
cat > src/components/ui/MotionText.tsx << 'EOF'
import React from 'react';

interface Props {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  delay?: number;
}

export const MotionText: React.FC<Props> = ({ 
  text, 
  tag = 'p', 
  className = '',
  delay = 0
}) => {
  // Use React.createElement instead of JSX for dynamic tags
  return React.createElement(tag, { 
    className,
    style: {
      transitionDelay: `${delay}ms`
    }
  }, text);
};
EOF

# Install missing dependencies
echo "📦 Installing missing dependencies..."
npm install --save react-helmet-async @types/testing-library__jest-dom --legacy-peer-deps

# Add testing library setup
echo "🧪 Adding testing library setup..."
cat > src/test/setupTests.js << 'EOF'
import '@testing-library/jest-dom';
EOF

echo "✅ TypeScript fixes complete!"
echo "♻️ Please restart your TypeScript server: Cmd+Shift+P > TypeScript: Restart TS Server"
