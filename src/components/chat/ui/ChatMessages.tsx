'use client';

import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '@/types/chat';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading?: boolean; // Renamed from loading
  error?: string | null; // Add error prop
  messagesEndRef?: React.RefObject<HTMLDivElement>; // Add ref prop
}

const ChatMessages = ({ messages, isLoading = false, error, messagesEndRef }: ChatMessagesProps) => {
  // Auto-scroll logic (optional but good UX)
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, messagesEndRef]);

  return (
    <div className="space-y-4 p-4"> {/* Adjusted padding/margin */}
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`p-3 rounded-lg max-w-[85%] break-words ${
              message.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted' // Use theme colors
            }`}
          >
            {message.content}
            {/* Display timestamp if available */}
            {message.timestamp && (
              <div className="text-xs text-muted-foreground mt-1 text-right">
                {/* Format ISO string timestamp */}
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="p-3 rounded-lg bg-muted flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-150"></div>
          </div>
        </div>
      )}
      {/* Add a div to scroll to */}
      <div ref={messagesEndRef} /> 
    </div>
  );
};

export default ChatMessages;
