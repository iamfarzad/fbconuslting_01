#!/bin/bash

echo "🔧 Starting TypeScript error fixes (Literature data focus)..."

# Fix the LiteratureItem type to match the actual data
echo "📝 Updating LiteratureItem type to match actual data..."

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
}
EOF

# Create a utility function to normalize literature data
mkdir -p src/utils
cat > src/utils/normalizeData.ts << 'EOF'
import { LiteratureItem } from "@/types/literature";

export function normalizeLiteratureItem(item: LiteratureItem): LiteratureItem {
  return {
    ...item,
    id: typeof item.id === 'number' ? String(item.id) : item.id,
    authors: typeof item.authors === 'string' 
      ? item.authors.split(',').map(author => author.trim()) 
      : item.authors,
    year: typeof item.year === 'string' ? parseInt(item.year, 10) : item.year
  };
}

export function normalizeLiteratureData(items: LiteratureItem[]): LiteratureItem[] {
  return items.map(normalizeLiteratureItem);
}
EOF

# Create missing ConnectionStatusIndicator component
mkdir -p src/components/ui
cat > src/components/ui/ConnectionStatusIndicator.tsx << 'EOF'
import React from "react";
import { ConnectionStatusIndicatorProps } from "@/types/chat";

export const ConnectionStatusIndicator: React.FC<ConnectionStatusIndicatorProps> = ({ 
  status, 
  className = "" 
}) => {
  let statusColor = "";
  let statusText = "";

  switch (status) {
    case "connected":
      statusColor = "bg-green-500";
      statusText = "Connected";
      break;
    case "connecting":
      statusColor = "bg-yellow-500";
      statusText = "Connecting...";
      break;
    case "disconnected":
      statusColor = "bg-gray-500";
      statusText = "Disconnected";
      break;
    case "error":
      statusColor = "bg-red-500";
      statusText = "Connection Error";
      break;
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`w-2 h-2 rounded-full ${statusColor} mr-2`}></div>
      <span className="text-xs">{statusText}</span>
    </div>
  );
};
EOF

# Create missing Calendar component
mkdir -p src/components/ui
cat > src/components/ui/calendar.tsx << 'EOF'
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 rounded-md",
        day_range_end: "day-range-end",
        day_selected: "bg-slate-900 text-slate-50 hover:bg-slate-900 hover:text-slate-50 focus:bg-slate-900 focus:text-slate-50",
        day_today: "bg-slate-100 text-slate-900",
        day_outside: "day-outside text-slate-500 opacity-50",
        day_disabled: "text-slate-500 opacity-50",
        day_range_middle: "aria-selected:bg-slate-100 aria-selected:text-slate-900",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
EOF

# Fix Chat Message component
mkdir -p src/components/chat/core
cat > src/components/chat/core/ChatMessage.tsx << 'EOF'
import React from "react";
import { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  
  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-3 rounded-lg max-w-[80%] ${isUser ? 'bg-blue-100' : 'bg-gray-100'}`}>
        <p className="text-sm">{message.content}</p>
        {message.timestamp && (
          <span className="text-xs text-gray-400 mt-1 block">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
};
EOF

# Create a SEO component
cat > src/components/SEO.tsx << 'EOF'
import React from "react";
import Head from "next/head";

interface SEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = "AI consulting, education, and digital solutions for businesses.",
  canonicalUrl,
  ogImage = "/images/og-image.jpg",
  ogType = "website",
}) => {
  const siteTitle = title ? `${title} | FB Consulting` : "FB Consulting";
  
  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Head>
  );
};
EOF

# Create a ChatFactory
mkdir -p src/services/chat
cat > src/services/chat/ChatFactory.ts << 'EOF'
export enum ChatServiceType {
  GEMINI = 'gemini',
  GPT = 'gpt',
  CLAUDE = 'claude'
}

interface ChatServiceConfig {
  apiKey?: string;
  model?: string;
}

export class ChatFactory {
  static createChatService(type: ChatServiceType, config: ChatServiceConfig) {
    switch (type) {
      case ChatServiceType.GEMINI:
        return { type: 'gemini', config };
      case ChatServiceType.GPT:
        return { type: 'gpt', config };
      case ChatServiceType.CLAUDE:
        return { type: 'claude', config };
      default:
        throw new Error(`Unsupported chat service type: ${type}`);
    }
  }
}
EOF

# Create an .env.local file with placeholder API keys
cat > .env.local << 'EOF'
# API Keys - Replace with actual keys
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id_here
EOF

echo "✅ Fix complete for literature data and common components!"
echo "🔄 You will still need to fix some component-specific issues."
echo "♻️ Restart your TypeScript server in VSCode: Cmd+Shift+P > TypeScript: Restart TS Server"