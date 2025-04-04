'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function CourseError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-xl glassmorphism-base"
          >
            <div className="mb-6">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            </div>
            
            <h1 className="text-2xl font-bold mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-muted-foreground mb-8">
              {error.message || 'An error occurred while loading the course content. Please try again.'}
            </p>

            <div className="space-y-4">
              <button
                onClick={reset}
                className="flex items-center justify-center w-full gap-2 py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <RefreshCcw className="w-4 h-4" />
                Try Again
              </button>

              <Link
                href="/courses"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                Return to Course List
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
