"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { RocketIcon, BrainCircuit, BarChart, Layers, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const BentoGrid = () => {
  const items = [
    {
      title: "Rapid Implementation",
      description: "Deploy AI solutions in weeks, not months, with our proven implementation framework.",
      icon: <RocketIcon className="h-8 w-8 text-blue-500" />,
      className: "md:col-span-1 col-span-2",
    },
    {
      title: "State-of-the-Art Tech",
      description: "Access cutting-edge AI technology customized for your specific business needs.",
      icon: <BrainCircuit className="h-8 w-8 text-purple-500" />,
      className: "md:col-span-1 col-span-2",
    },
    {
      title: "ROI-Driven Approach",
      description: "Focused on delivering measurable return on investment with every AI implementation.",
      icon: <BarChart className="h-8 w-8 text-green-500" />,
      className: "md:col-span-2 col-span-2",
      feature: true,
    },
    {
      title: "Integration Expertise",
      description: "Seamlessly connect AI with your existing systems and workflows for maximum impact.",
      icon: <Layers className="h-8 w-8 text-orange-500" />,
      className: "md:col-span-1 col-span-2",
    },
    {
      title: "Compliant Solutions",
      description: "Enterprise-grade AI implementations that adhere to regulatory requirements.",
      icon: <ShieldCheck className="h-8 w-8 text-red-500" />,
      className: "md:col-span-1 col-span-2",
    },
  ];

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FB Consulting</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine technical expertise with business acumen to deliver AI solutions that drive real results.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${item.className} ${
                item.feature ? "bg-gradient-to-br from-primary/10 to-primary/5" : "bg-card"
              } p-8 rounded-xl border border-border hover:shadow-md transition-shadow relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-50" />
              
              <div className="relative z-10">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                {item.feature && (
                  <Link 
                    href="/services" 
                    className="text-primary hover:underline inline-flex items-center text-sm font-medium"
                  >
                    Learn more
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
