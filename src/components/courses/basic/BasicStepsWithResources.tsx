
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import BasicStepsList from './BasicStepsList';
import BasicResourcesSidebar from './BasicResourcesSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const BasicStepsWithResources = () => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <motion.div 
        className="flex w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex-1"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BasicStepsList />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <BasicResourcesSidebar />
        </motion.div>
      </motion.div>
    </SidebarProvider>
  );
};

export default BasicStepsWithResources;
