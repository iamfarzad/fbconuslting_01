import React from 'react';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  isExternal?: boolean;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ 
  href, 
  children, 
  className = "",
  activeClassName = "text-primary",
  isExternal = false,
  onClick
}) => {
  // If external link, use a regular anchor tag
  if (isExternal) {
    return (
      <a 
        href={href}
        className={`transition-colors hover:text-primary ${className}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  
  // Otherwise use Next.js Link
  return (
    <Link href={href} className={`transition-colors hover:text-primary ${className}`} onClick={onClick}>
      {children}
    </Link>
  );
};
