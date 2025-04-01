"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MotionCard, MotionCardContent, MotionCardFooter } from '@/components/ui/motion-card';
import { Star, User } from 'lucide-react';
import { Testimonial } from '@/types/blog';

interface EnhancedTestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const EnhancedTestimonialCard: React.FC<EnhancedTestimonialCardProps> = ({ testimonial, index }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-white/50 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="pt-6 pb-2 flex-grow">
          <motion.div 
            className="flex mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            {renderStars(testimonial.rating)}
          </motion.div>
          <blockquote className="text-lg italic text-muted-foreground">
            "{testimonial.content}"
          </blockquote>
        </CardContent>
        <CardFooter className="border-t border-primary/10 pt-4">
          <div className="flex items-center gap-3">
            {testimonial.avatar ? (
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover border border-primary/20"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
            )}
            <div>
              <div className="font-medium text-foreground">{testimonial.name}</div>
              <div className="text-sm text-muted-foreground">
                {testimonial.role} at {testimonial.company}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EnhancedTestimonialCard;
