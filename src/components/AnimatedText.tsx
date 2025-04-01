"use client";

import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export default function AnimatedText({ text, className, tag = 'h2' }: Props) {
  const Component = motion[tag] as any;
  return (
    <Component
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`text-3xl md:text-4xl font-bold ${className || ""}`}
    >
      {text}
    </Component>
  );
}
