'use client';

import React from 'react';

interface ErrorDisplayProps {
  error: string | null;
  onRetry?: () => void;
}

const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  if (!error) return null;

  return (
    <div className="p-4 my-2 bg-red-50 border border-red-200 rounded-md text-red-700">
      <div className="flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
            clipRule="evenodd" 
          />
        </svg>
        <p>{error}</p>
      </div>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
        >
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
