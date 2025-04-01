import React from 'react';

interface ConnectionStatusIndicatorProps {
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
  className?: string;
}

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
      statusText = "Error";
      break;
  }
  
  return (
    <div className={`flex items-center ${className}`}>
      <span className={`w-2 h-2 rounded-full ${statusColor} mr-2`}></span>
      <span className="text-xs text-gray-500">{statusText}</span>
    </div>
  );
};
