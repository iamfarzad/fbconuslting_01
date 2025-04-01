import React from 'react';

export const AnimatedBars: React.FC = () => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3].map((bar) => (
        <div
          key={bar}
          className="w-1 h-4 bg-blue-500 animate-pulse"
          style={{
            animationDelay: `${bar * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};
