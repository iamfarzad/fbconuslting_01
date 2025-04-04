import React from 'react';
import { CourseProgressProvider } from '@/contexts/CourseProgressContext';

interface CourseLayoutProps {
  children: React.ReactNode;
}

export default function CourseLayout({ children }: CourseLayoutProps) {
  return (
    <CourseProgressProvider>
      {children}
    </CourseProgressProvider>
  );
}
