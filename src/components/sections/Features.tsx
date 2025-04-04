"use client";

import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard';
import { Code, Search, Database, AreaChart, RefreshCw, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'AI Strategy Development',
      description: 'Create a clear roadmap for AI implementation that aligns with your business goals and captures maximum value.',
      icon: <AreaChart className="w-6 h-6" />
    },
    {
      title: 'Process Automation',
      description: 'Identify and automate repetitive tasks to reduce manual effort, minimize errors, and free up team resources.',
      icon: <RefreshCw className="w-6 h-6" />
    },
    {
      title: 'Custom AI Solutions',
      description: 'Develop tailored AI systems designed specifically for your unique business challenges and opportunities.',
      icon: <Code className="w-6 h-6" />
    },
    {
      title: 'Data Analysis & Insights',
      description: 'Extract meaningful insights from your data to drive better decision-making and identify new opportunities.',
      icon: <Search className="w-6 h-6" />
    },
    {
      title: 'AI Integration',
      description: 'Seamlessly connect AI capabilities with your existing systems and workflows for maximum efficiency.',
      icon: <Database className="w-6 h-6" />
    },
    {
      title: 'Performance Optimization',
      description: 'Fine-tune your AI systems for speed, accuracy, and cost-effectiveness as your business evolves.',
      icon: <Zap className="w-6 h-6" />
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            AI Services That Transform Your Business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Strategic, practical, and results-driven AI consulting to boost efficiency, reduce costs, and unlock new capabilities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                className="h-full"
                glassmorphism={false}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;