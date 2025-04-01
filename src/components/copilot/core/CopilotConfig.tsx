import React from 'react';

interface CopilotConfigProps {
  children: React.ReactNode;
}

export const CopilotConfig: React.FC<CopilotConfigProps> = ({ children }) => {
  return <>{children}</>;
};
