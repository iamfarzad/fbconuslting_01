import React from 'react';

export interface CopilotChatProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

const CopilotChat: React.FC<CopilotChatProps> = ({ 
  title = "AI Assistant",
  className = "",
  children
}) => {
  return (
    <div className={`border rounded-lg shadow-md p-4 ${className}`}>
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      {children || (
        <div className="text-center text-gray-500 py-8">
          AI chat interface will be displayed here
        </div>
      )}
    </div>
  );
};

export default CopilotChat;
