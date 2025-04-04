import React from 'react';

// Define and export the interface for a service item
export interface ServiceItem { 
  id: string; // Add the id field
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  hoverAnimation?: React.ReactNode;
  benefits?: string[]; // Add benefits if needed for detail page
  cta?: string; // Add cta if needed for detail page
}
