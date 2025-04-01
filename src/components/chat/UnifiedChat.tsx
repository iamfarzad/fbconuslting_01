import React from 'react';

interface UnifiedChatProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export const UnifiedChat: React.FC<UnifiedChatProps> = ({ 
  title = "AI Chat",
  className = "",
  children
}) => {
  return (
    <div className={`border rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      <div className="p-4">
        {children || (
          <div className="text-center text-gray-500 py-8">
            Chat interface placeholder
          </div>
        )}
      </div>
    </div>
  );
};
