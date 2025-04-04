'use client';

import React from 'react';

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  status?: 'connected' | 'connecting' | 'disconnected' | 'error';
}

const ChatHeader = ({
  title = "AI Assistant",
  subtitle,
  onClose,
  status = 'connected'
}: ChatHeaderProps) => {
  return (
    <div className="flex justify-between items-center border-b pb-2 mb-4">
      <div>
        <h3 className="font-medium">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {status && (
        <div className="flex items-center">
          <span 
            className={`w-2 h-2 rounded-full mr-2 ${
              status === 'connected' ? 'bg-green-500' :
              status === 'connecting' ? 'bg-yellow-500' :
              status === 'error' ? 'bg-red-500' : 'bg-gray-500'
            }`}
          />
          <span className="text-xs text-gray-500">
            {status === 'connected' ? 'Connected' :
             status === 'connecting' ? 'Connecting...' :
             status === 'error' ? 'Error' : 'Disconnected'}
          </span>
        </div>
      )}
      {onClose && (
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
