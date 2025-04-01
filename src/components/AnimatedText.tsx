"use client";

import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className }: Props) {
  return (
    <motion.h2
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`text-3xl md:text-4xl font-bold ${className || ""}`}
    >
      {text}
    </motion.h2>
  );
}