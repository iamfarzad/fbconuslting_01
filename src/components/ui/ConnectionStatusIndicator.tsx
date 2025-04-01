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
