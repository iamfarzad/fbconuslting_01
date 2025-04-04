"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  glassmorphism?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className = '',
  glassmorphism = true
}) => {
  return (
    <div 
      className={cn(
        "p-6 rounded-xl shadow-sm border border-border", 
        glassmorphism ? "glass" : "bg-background",
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-primary">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
