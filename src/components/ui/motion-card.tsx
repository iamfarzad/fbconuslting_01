"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Card, CardContent, CardFooter } from './card';

interface MotionCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
}

export const MotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  ({ children, className, initial, animate, transition, whileHover, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={initial}
        animate={animate}
        transition={transition}
        whileHover={whileHover}
        className={className}
        {...props}
      >
        <Card className="h-full">{children}</Card>
      </motion.div>
    );
  }
);
MotionCard.displayName = "MotionCard";

export const MotionCardContent = CardContent;
export const MotionCardFooter = CardFooter;
