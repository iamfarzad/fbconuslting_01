"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Book, Calendar, FileText, Tag, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext'; // Import language context hook
import { formatDate } from '@/lib/date'; // Import the date formatting function

interface LiteratureCardProps {
  id: string;
  category: string;
  title: string;
  author: string;
  datePublished: string;
  description: string;
  tags: string[];
  index: number;
}

export const LiteratureCard: React.FC<LiteratureCardProps> = ({
  id,
  category,
  title,
  author,
  datePublished,
  description,
  tags,
  index,
}) => {
  const { locale } = useLanguage(); // Get current locale
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="interactive-glass-card hover:border-blue-400/30"
    >
      <Link href={`/resources/literature/${category}/${id}`} className="block h-full">
        <div className="flex flex-col h-full">
          <div className="text-xs uppercase tracking-wider text-blue-500 dark:text-blue-400 flex items-center gap-1.5 mb-2">
            <Book className="w-3 h-3" />
            {category.replace('-', ' ')}
          </div>
          
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
          
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {author}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {/* Format the date using the locale */}
              {formatDate(datePublished, locale, { year: 'numeric', month: 'short', day: 'numeric' })}
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default LiteratureCard;
