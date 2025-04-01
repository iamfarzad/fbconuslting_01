import React from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

interface ChatMessagesProps {
  messages: Message[];
  loading?: boolean;
}

const ChatMessages = ({ messages, loading = false }: ChatMessagesProps) => {
  return (
    <div className="space-y-4 my-4 max-h-80 overflow-y-auto">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`p-3 rounded-lg max-w-[85%] ${
            message.role === 'user' 
              ? 'ml-auto bg-blue-100 text-blue-900' 
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {message.content}
          {message.timestamp && (
            <div className="text-xs text-gray-500 mt-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      ))}

      {loading && (
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
