"use client"; // Added "use client" directive

import React from 'react';
import { motion } from 'framer-motion';

const StrategyAnimation: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex space-x-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-teal"></div> {/* Note: Ensure colors are defined */}
        <div className="w-3 h-3 rounded-full bg-retro-pink"></div> {/* Note: Ensure colors are defined */}
        <div className="w-3 h-3 rounded-full bg-teal"></div> {/* Note: Ensure colors are defined */}
      </div>
      <motion.div 
        className="h-[2px] w-24 bg-gradient-to-r from-teal to-retro-pink" // Note: Ensure colors are defined
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default StrategyAnimation;
