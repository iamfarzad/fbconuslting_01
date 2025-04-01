import React from 'react';

interface UnifiedFullScreenChatProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
}

const UnifiedFullScreenChat: React.FC<UnifiedFullScreenChatProps> = ({
  children,
  isOpen = false,
  onClose,
  title = "AI Chat"
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-lg overflow-hidden flex flex-col">
        <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex justify-between items-center">
          <h2 className="text-lg font-medium">{title}</h2>
          {onClose && (
            <button 
              onClick={onClose} 
              className="text-white hover:text-gray-200"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex-grow overflow-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UnifiedFullScreenChat;
