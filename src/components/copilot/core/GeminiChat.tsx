import React from 'react';

interface GeminiChatProps {
  children?: React.ReactNode;
  className?: string;
}

export const GeminiChat: React.FC<GeminiChatProps> = ({ children, className = "" }) => {
  return (
    <div className={`border rounded-md p-4 ${className}`}>
      {children || "Gemini Chat Interface"}
    </div>
  );
};
