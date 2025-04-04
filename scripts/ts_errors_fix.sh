#!/bin/bash

echo "🔧 Starting TypeScript error fixes..."

# 1. Fix StepCard imports in course components
echo "🔄 Fixing StepCard imports..."
find src/components/courses -type f -name "*.tsx" | xargs sed -i '' 's|from '"'"'@/components/StepCard'"'"'|from '"'"'@/components/courses/StepCard'"'"'|g'
find src/components/courses -type f -name "*.tsx" | xargs sed -i '' 's|from '"'"'@/components/StepsList'"'"'|from '"'"'@/components/courses/StepsList'"'"'|g'

# 2. Create missing types directory structure
echo "📁 Creating type definitions structure..."
mkdir -p src/types/chat
mkdir -p src/types/resources
mkdir -p src/types/literature
mkdir -p src/types/course
mkdir -p src/hooks/gemini
mkdir -p src/contexts
mkdir -p src/services
mkdir -p src/features/gemini/services

# 3. Create basic type files
echo "📝 Creating missing type definitions..."

# Chat types
cat > src/types/chat/index.ts << 'EOF'
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

export interface ConnectionStatusIndicatorProps {
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
  className?: string;
}

export interface AIMessage {
  id: string;
  content: string;
  role: string;
}
EOF

# Main types
cat > src/types/index.ts << 'EOF'
export interface GeminiState {
  messages: ChatMessage[];
  isLoading: boolean;
  chatError: string | null;
}

export interface GeminiUserInfo {
  name?: string;
  email?: string;
  preferences?: Record<string, any>;
}

export interface ChatStep {
  id: string;
  title: string;
  description: string;
}

export interface ProposalData {
  title: string;
  description: string;
  elements: string[];
}

export interface GeminiAction {
  type: string;
  payload?: any;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}
EOF

# Literature types
cat > src/types/literature/index.ts << 'EOF'
export interface LiteratureItem {
  id: string;
  title: string;
  authors: string[];
  year: number;
  abstract: string;
  link: string;
  category: string;
  tags: string[];
}
EOF

# 4. Create basic service files
echo "📊 Creating service stubs..."

# Analytics service
mkdir -p src/services
cat > src/services/analyticsService.ts << 'EOF'
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Implement tracking logic
  console.log(`[Analytics] ${eventName}`, properties);
  
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
};

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: any) => void;
  }
}
EOF

# Search service
cat > src/services/searchService.ts << 'EOF'
export const searchContent = async (query: string) => {
  // Replace with actual implementation
  console.log(`Searching for: ${query}`);
  return [];
};

export const trackSearch = (query: string) => {
  // Implement search tracking
  console.log(`Search tracked: ${query}`);
};
EOF

# 5. Install missing dependencies
echo "📦 Installing missing dependencies..."
npm install @radix-ui/react-accordion @radix-ui/react-slider react-helmet-async @vercel/analytics @react-three/fiber @react-three/drei @testing-library/react @types/jest --save

# Create language context
echo "🌐 Creating LanguageContext..."
mkdir -p src/contexts
cat > src/contexts/LanguageContext.tsx << 'EOF'
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'no';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Add English translations here
    'hero.title': 'Welcome to FB Consulting',
    'hero.subtitle': 'AI Solutions for Business',
    // Add more translations as needed
  },
  no: {
    // Add Norwegian translations here
    'hero.title': 'Velkommen til FB Consulting',
    'hero.subtitle': 'AI-løsninger for bedrifter',
    // Add more translations as needed
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
EOF

# Create Gemini hooks
mkdir -p src/hooks/gemini
cat > src/hooks/gemini/useDocumentUpload.ts << 'EOF'
import { useState } from 'react';

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
}

export const useDocumentUpload = () => {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  
  const uploadDocument = async (file: File): Promise<UploadedDocument> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const doc: UploadedDocument = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          size: file.size,
          content
        };
        
        setDocuments(prev => [...prev, doc]);
        resolve(doc);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  };
  
  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };
  
  return {
    documents,
    uploadDocument,
    removeDocument
  };
};

export default useDocumentUpload;
EOF

cat > src/hooks/gemini/useGeminiInitialization.ts << 'EOF'
import { useState, useEffect } from 'react';

export const useGeminiInitialization = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const initializeGemini = async () => {
      try {
        // Simulation of initialization
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize Gemini');
      }
    };
    
    initializeGemini();
  }, []);
  
  return { isInitialized, error };
};
EOF

cat > src/hooks/useGeminiSpeechRecognition.ts << 'EOF'
export const useGeminiSpeechRecognition = (apiKey: string, handleCommand: (command: string) => void) => {
  // Implementation would go here
  
  return {
    isListening: false,
    startListening: () => {},
    stopListening: () => {},
    transcript: '',
    resetTranscript: () => {},
    error: null
  };
};

export const getApiKey = () => {
  return process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
};
EOF

cat > src/hooks/useLocationDetection.ts << 'EOF'
import { useState, useEffect } from 'react';

interface LocationData {
  country: string;
  city: string;
  isLoading: boolean;
  error: string | null;
}

export const useLocationDetection = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    country: '',
    city: '',
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // In a real implementation, this would call a geolocation API
        // For now, just simulate a delay and return default data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setLocationData({
          country: 'Norway',
          city: 'Oslo',
          isLoading: false,
          error: null
        });
      } catch (error) {
        setLocationData(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to detect location'
        }));
      }
    };
    
    detectLocation();
  }, []);

  return locationData;
};
EOF

cat > src/hooks/useEnhancedChat.ts << 'EOF'
import { useState } from 'react';

export const useEnhancedChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const sendMessage = async (message: string) => {
    // Implementation would go here
    console.log('Sending message:', message);
  };
  
  return {
    messages,
    isLoading,
    sendMessage
  };
};
EOF

cat > src/providers/GeminiAPIProvider.tsx << 'EOF'
import React, { createContext, useContext, ReactNode } from 'react';

type GeminiAPIContextType = {
  apiKey: string | null;
  setApiKey: (key: string) => void;
};

const GeminiAPIContext = createContext<GeminiAPIContextType>({
  apiKey: null,
  setApiKey: () => {},
});

export const GeminiAPIProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [apiKey, setApiKeyState] = React.useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('gemini-api-key') : null
  );

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini-api-key', key);
    }
  };

  return (
    <GeminiAPIContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </GeminiAPIContext.Provider>
  );
};

export const useGeminiAPI = () => useContext(GeminiAPIContext);
EOF

# Create gemini service
mkdir -p src/features/gemini/services
cat > src/features/gemini/services/geminiAdapter.ts << 'EOF'
export class GeminiAdapter {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async generateResponse(prompt: string): Promise<string> {
    // Implementation would go here
    console.log('Generating response for:', prompt);
    return 'This is a placeholder response from Gemini';
  }
}
EOF

mkdir -p src/services/chat
cat > src/services/chat/ChatFactory.ts << 'EOF'
export enum ChatServiceType {
  GEMINI = 'gemini',
  GPT = 'gpt',
  CLAUDE = 'claude'
}

export class ChatFactory {
  static createChatService(type: ChatServiceType, config: any) {
    switch (type) {
      case ChatServiceType.GEMINI:
        return { type: 'gemini', config };
      default:
        throw new Error(`Unsupported chat service type: ${type}`);
    }
  }
}
EOF

# Create missing UI components
mkdir -p src/components/ui/Logo
cat > src/components/ui/Logo.tsx << 'EOF'
import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center">
      <span className="font-bold text-xl">FB Consulting</span>
    </div>
  );
};
EOF

mkdir -p src/components/ui/NavLink
cat > src/components/ui/NavLink.tsx << 'EOF'
import React from 'react';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children, className = '' }) => {
  return (
    <Link href={href} className={`transition-colors hover:text-primary ${className}`}>
      {children}
    </Link>
  );
};
EOF

mkdir -p src/components/ui/ai-chat
cat > src/components/ui/ai-chat/EnhancedChatContainer.tsx << 'EOF'
import React from 'react';

export interface EnhancedChatContainerProps {
  children: React.ReactNode;
}

export const EnhancedChatContainer: React.FC<EnhancedChatContainerProps> = ({ children }) => {
  return (
    <div className="relative border rounded-lg shadow-lg bg-white p-4">
      {children}
    </div>
  );
};
EOF

mkdir -p src/components/VoiceUI
cat > src/components/VoiceUI.tsx << 'EOF'
import React from 'react';

interface VoiceUIProps {
  isListening?: boolean;
  onStart?: () => void;
  onStop?: () => void;
}

const VoiceUI: React.FC<VoiceUIProps> = ({ isListening = false, onStart, onStop }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={isListening ? onStop : onStart}
        className={`p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {isListening ? 'Stop' : 'Start'} Listening
      </button>
      {isListening && <div className="text-sm text-red-500">Listening...</div>}
    </div>
  );
};

export default VoiceUI;
EOF

# Create missing servicesData
mkdir -p src/data
cat > src/data/servicesData.ts << 'EOF'
export const services = [
  {
    id: 'ai-consulting',
    title: 'AI Consulting',
    description: 'Strategic AI consulting to help your business leverage artificial intelligence.',
    icon: '💡',
  },
  {
    id: 'custom-solutions',
    title: 'Custom AI Solutions',
    description: 'Bespoke AI solutions tailored to your specific business needs.',
    icon: '🔧',
  },
  {
    id: 'training',
    title: 'AI Training',
    description: 'Comprehensive training programs to upskill your team on AI technologies.',
    icon: '📚',
  },
];
EOF

echo "✅ Fix complete! Most TypeScript errors should be resolved."
echo "♻️ You may need to restart your TypeScript server in VSCode (Cmd+Shift+P > TypeScript: Restart TS Server)"
echo "⚠️ Note: Some UI component errors may still need manual fixes."