
// Common TypeScript interfaces and types used throughout the application

export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  tooltip?: string;
}

// Add more shared types as needed
