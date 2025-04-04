#!/bin/bash

echo "🔍 Installing missing dependencies..."

# Install UI component dependencies
npm install --save \
  @radix-ui/react-aspect-ratio \
  @radix-ui/react-avatar \
  @radix-ui/react-checkbox \
  @radix-ui/react-collapsible \
  @radix-ui/react-context-menu \
  @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-hover-card \
  @radix-ui/react-menubar \
  @radix-ui/react-navigation-menu \
  @radix-ui/react-popover \
  @radix-ui/react-progress \
  @radix-ui/react-radio-group \
  @radix-ui/react-scroll-area \
  @radix-ui/react-select \
  @radix-ui/react-separator \
  @radix-ui/react-slider \
  @radix-ui/react-switch \
  @radix-ui/react-tabs \
  @radix-ui/react-toast \
  @radix-ui/react-toggle \
  @radix-ui/react-toggle-group \
  @radix-ui/react-tooltip \
  class-variance-authority \
  cmdk \
  dotted-map \
  embla-carousel-react \
  input-otp \
  lucide-react \
  next-themes \
  react-day-picker \
  react-hook-form \
  react-resizable-panels \
  recharts \
  sonner \
  vaul

echo "✅ Dependencies installed"

# Create types directory if it doesn't exist
mkdir -p src/types

echo "📝 Creating type definitions..."

# Create button types
cat > src/types/button.d.ts << 'EOL'
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
EOL

# Create chat bubble types
cat > src/types/chat.d.ts << 'EOL'
export interface ChatBubbleProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: string;
  isLoading?: boolean;
  className?: string;
}
EOL

echo "✨ Type definitions created"

# Run TypeScript check
echo "🔍 Running type check..."
npx tsc --noEmit

echo "✅ Setup complete"
