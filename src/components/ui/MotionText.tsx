import React from 'react';

interface Props {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  delay?: number;
}

export const MotionText: React.FC<Props> = ({ 
  text, 
  tag = 'p', 
  className = '',
  delay = 0
}) => {
  // Use React.createElement instead of JSX for dynamic tags
  return React.createElement(tag, { 
    className,
    style: {
      transitionDelay: `${delay}ms`
    }
  }, text);
};
