"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'strategy',
    title: 'AI Strategy',
    description: 'Develop a comprehensive roadmap for AI adoption tailored to your business goals.',
    link: '/services/ai-strategy'
  },
  {
    id: 'automation',
    title: 'Process Automation',
    description: 'Identify and implement AI solutions to automate repetitive tasks and workflows.',
    link: '/services/process-automation'
  },
  {
    id: 'custom',
    title: 'Custom AI Solutions',
    description: 'Build tailored AI applications to solve your unique business challenges.',
    link: '/services/custom-solutions'
  },
  {
    id: 'training',
    title: 'Team AI Training',
    description: 'Equip your team with the skills to effectively work with and leverage AI tools.',
    link: '/services/training'
  }
];

const ServiceListSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert AI consulting and implementation services to help your business leverage the power of artificial intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background border border-border rounded-xl p-8 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <Link 
                href={service.link}
                className="inline-flex items-center text-primary hover:underline"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link 
            href="/services" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Services <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceListSection;
