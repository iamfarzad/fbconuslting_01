"use client"; // Added "use client" directive

import React from 'react';
import { motion } from 'framer-motion';

const CustomDevAnimation: React.FC = () => {
  return (
    <motion.div className="text-sm font-mono">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-teal" // Note: Ensure 'text-teal' is defined
      >
        {`function optimize() {`}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="ml-3 text-retro-pink" // Note: Ensure 'text-retro-pink' is defined
      >
        {`return AI.solve(problem);`}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="text-teal" // Note: Ensure 'text-teal' is defined
      >
        {`}`}
      </motion.div>
    </motion.div>
  );
};

export default CustomDevAnimation;
