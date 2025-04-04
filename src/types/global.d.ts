// src/types/global.d.ts

// Extend the Window interface to include gtag if it's not already defined
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Export {} to ensure this file is treated as a module.
// This is necessary if you're using module augmentation.
export {};
