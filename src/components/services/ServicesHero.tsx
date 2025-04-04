
"use client"; // Add use client directive

import React from 'react';
import { cn } from '@/lib/utils';
import { HeroBackground } from '@/components/hero/HeroBackground'; // Use named import
import { HeroContent } from '@/components/hero/HeroContent'; // Use named import
// import HeroAnimation from './hero/HeroAnimation'; // Removed for now
// import ScrollIndicator from './hero/ScrollIndicator'; // Removed for now
import LanguageSwitcher from '@/components/LanguageSwitcher'; // Update import path

interface ServicesHeroProps {
  className?: string;
}

const ServicesHero: React.FC<ServicesHeroProps> = ({ className }) => {
  return (
    <section className={cn("relative py-20 overflow-hidden", className)}>
      <HeroBackground />
      
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="absolute top-0 right-4 z-20">
          <LanguageSwitcher /> 
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <HeroContent />
          {/* <HeroAnimation /> */} {/* Removed for now */}
        </div>
        
        {/* <ScrollIndicator /> */} {/* Removed for now */}
      </div>
    </section>
  );
};

export default ServicesHero;
