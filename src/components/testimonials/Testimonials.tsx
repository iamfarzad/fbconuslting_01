
"use client"; // Add this directive

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
// import { Testimonial } from '@/types/blog'; // Type is inferred from imported data
import EnhancedTestimonialCard from './EnhancedTestimonialCard';
import { MessageSquareQuote } from 'lucide-react';
import { testimonials } from '@/data/testimonialsData'; // Import data

// Removed hardcoded testimonialData

interface TestimonialsProps {
  id?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ id }) => {
  return (
    <section id={id} className="py-24 relative z-10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/40 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-[#fe5a1d]/10 p-3 rounded-full">
              <MessageSquareQuote className="w-6 h-6 text-[#fe5a1d]" />
            </div>
          </div>
          
          <AnimatedText
            text="What Our Clients Say"
            tag="h2"
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#fe5a1d] to-[#fe5a1d]/70"
          />
          
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-[#fe5a1d]/80 to-[#fe5a1d]/30 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
          />
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have experienced with our AI automation solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Reduced gap from 8 to 6 */}
          {testimonials.map((testimonial, index) => ( // Use imported testimonials data
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <EnhancedTestimonialCard testimonial={testimonial} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
