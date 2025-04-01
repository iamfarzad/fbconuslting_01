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
