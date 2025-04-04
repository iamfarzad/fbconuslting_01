"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  tag = 'h1', 
  className = '' 
}) => {
  const words = text.split(' ');
  
  // Animation configuration
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Dynamically render the appropriate heading tag
  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <Tag className={className}>
      <motion.div
        style={{ display: 'inline-block' }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            style={{ display: 'inline-block', marginRight: '8px' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </Tag>
  );
};

export default AnimatedText;
