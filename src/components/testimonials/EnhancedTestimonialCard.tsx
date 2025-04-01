"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Author {
  name: string;
  image?: string;
  title?: string;
}

interface TestimonialProps {
  content: string;
  author?: Author;
  className?: string;
}

export function EnhancedTestimonialCard({ content, author, className }: TestimonialProps) {
  return (
    <Card className={cn("relative overflow-hidden p-6", className)}>
      <div className="relative z-20 space-y-4">
        <blockquote className="text-lg leading-relaxed">
          "{content}"
        </blockquote>
        {author && (
          <figcaption className="flex items-center space-x-4">
            {author.image && (
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <img
                  src={author.image}
                  alt={author.name}
                  className="object-cover"
                />
              </div>
            )}
            <div className="text-sm">
              <div className="font-medium">{author.name}</div>
              {author.title && (
                <div className="text-gray-600 dark:text-gray-400">{author.title}</div>
              )}
            </div>
          </figcaption>
        )}
      </div>
    </Card>
  );
}
