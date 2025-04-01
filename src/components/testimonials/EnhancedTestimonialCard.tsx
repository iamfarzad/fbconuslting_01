import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface TestimonialProps {
  author: {
    name: string;
    title?: string;
    image?: string;
  };
  content: string;
  rating?: number;
  className?: string;
}

const EnhancedTestimonialCard: React.FC<TestimonialProps> = ({
  author,
  content,
  rating,
  className = ''
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col bg-white/50 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="pt-6 pb-2 flex-grow">
          {rating && (
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          )}
          <p className="text-gray-700">{content}</p>
        </CardContent>
        <CardFooter className="border-t border-primary/10 pt-4">
          <div className="flex items-center space-x-4">
            {author && author.image && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={author.image}
                  alt={author.name}
                  className="object-cover"
                />
              </div>
            )}
            {author && (
              <div>
                <h4 className="font-medium text-gray-900">{author.name}</h4>
                {author.title && (
                  <p className="text-sm text-gray-500">{author.title}</p>
                )}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EnhancedTestimonialCard;
