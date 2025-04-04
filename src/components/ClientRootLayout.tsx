"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation'; // Import usePathname
import ProvidersWrapper from '@/components/ProvidersWrapper';

const pageVariants = {
  initial: {
    opacity: 0,
    // y: 20, // Optional: slight vertical motion
  },
  in: {
    opacity: 1,
    // y: 0,
  },
  out: {
    opacity: 0,
    // y: -20, // Optional: slight vertical motion
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate", // Or "easeInOut", "linear"
  duration: 0.4, // Adjust duration as needed
};

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get current path

  return (
    <ProvidersWrapper>
      {/* Use AnimatePresence and motion.div for transitions */}
      <AnimatePresence mode="wait"> {/* 'wait' ensures exit animation completes before enter */}
        <motion.div
          key={pathname} // Key changes on route change, triggering animation
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="relative" // Keep relative positioning if needed
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ProvidersWrapper>
  );
}
