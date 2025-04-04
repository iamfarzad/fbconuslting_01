"use client"; // Add use client directive for the hook

import React from 'react';
import { Calendar, Clock, UserCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date';
import { useLocalization } from '@/hooks/useLocalization'; // Import the localization hook

interface PostHeaderProps {
  title: string;
  category: string;
  date: string; // Assuming date is a string like 'YYYY-MM-DD'
  readTime: string; // e.g., "5 min read"
  author: string;
  authorTitle?: string;
  authorAvatar?: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  category,
  date,
  readTime,
  author,
  authorTitle,
  authorAvatar,
}) => {
  const { language } = useLocalization(); // Use 'language' instead of 'locale'

  return (
    <header className="mb-8 border-b pb-8">
      <div className="mb-4">
        <Badge variant="secondary">{category}</Badge>
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-6">
        <div className="flex items-center">
          <Calendar className="mr-1.5 h-4 w-4" />
          {/* Pass language to formatDate */}
          <time dateTime={date}>{formatDate(date, language)}</time> 
        </div>
        <div className="flex items-center">
          <Clock className="mr-1.5 h-4 w-4" />
          <span>{readTime}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {authorAvatar ? (
          <img
            src={authorAvatar}
            alt={author}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <UserCircle className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
        <div>
          <p className="font-semibold text-sm">{author}</p>
          {authorTitle && (
            <p className="text-xs text-muted-foreground">{authorTitle}</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default PostHeader;
