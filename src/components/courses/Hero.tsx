
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 via-accent/30 to-background z-0" />
      
      {/* Animated shapes with better visibility */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 300}px`,
              height: `${100 + Math.random() * 300}px`,
              opacity: 0.3 + Math.random() * 0.4
            }}
            animate={{
              top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              scale: [1, 1.1, 1],
              opacity: [0.3 + Math.random() * 0.4, 0.5 + Math.random() * 0.3, 0.3 + Math.random() * 0.4],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 opacity-30 shimmer z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="badge bg-primary/10 text-primary mb-6 shadow-sm">
              Step-by-Step Guide
            </div>
          </motion.div>
          
          <motion.h1
            className="heading-xl mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Building Personal AI Systems
          </motion.h1>
          
          <motion.p
            className="paragraph mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            From beginner-friendly tools to advanced fine-tuning techniques, 
            learn how to create AI systems tailored for your personal or business needs.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <Button size="lg" className="rounded-full px-8 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              Learn More
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <a href="#basic" className="flex flex-col items-center hover:text-primary transition-colors duration-300">
            <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
