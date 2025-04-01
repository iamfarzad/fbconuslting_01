import React from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children, className = "" }) => {
  return (
    <Link href={href} className={`transition-colors hover:text-primary ${className}`}>
      {children}
    </Link>
  );
};
