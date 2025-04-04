
"use client"; // Add the directive here

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LevelSectionProps {
  id: string;
  title: string;
  subtitle: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  children: ReactNode;
  className?: string;
}

const LevelSection = ({ 
  id, 
  title, 
  subtitle, 
  level, 
  children, 
  className 
}: LevelSectionProps) => {
  // Define color schemes for different levels with enhanced gradients
  const levelColors = {
    Basic: 'from-blue-100 via-blue-50 to-background border-blue-100',
    Intermediate: 'from-purple-100 via-purple-50 to-background border-purple-100',
    Advanced: 'from-emerald-100 via-emerald-50 to-background border-emerald-100',
  };

  // Define badge colors with enhanced styling
  const badgeColors = {
    Basic: 'bg-blue-100 text-blue-800 border border-blue-200',
    Intermediate: 'bg-purple-100 text-purple-800 border border-purple-200',
    Advanced: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  };

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section 
      id={id} 
      className={cn(
        "py-24 relative section-transition", 
        className
      )}
    >
      {/* Enhanced background with animated gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b opacity-60 z-0",
        levelColors[level]
      )}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>
      
      {/* Subtle particle effect */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${level === 'Basic' ? 'bg-blue-400' : level === 'Intermediate' ? 'bg-purple-400' : 'bg-emerald-400'} opacity-10`}
            style={{
              width: 100 + Math.random() * 100,
              height: 100 + Math.random() * 100,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <div className={cn(
              "badge mb-6 shadow-sm",
              badgeColors[level]
            )}>
              {level} Level
            </div>
          </motion.div>
          
          <motion.h2
            className="heading-lg mb-6"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          
          <motion.p
            className="paragraph mb-12"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
          
          <motion.div variants={itemVariants}>
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LevelSection;
