import React from "react";

interface SearchButtonProps {
  variant?: string;
  iconOnly?: boolean;
  size?: string;
  className?: string;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ 
  variant = "default",
  iconOnly = false,
  size = "default",
  className = ""
}) => {
  return (
    <button 
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
        variant === "ghost" ? "hover:bg-transparent" : ""
      } ${className}`}
      aria-label="Search"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size === "icon" ? "16" : "20"}
        height={size === "icon" ? "16" : "20"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      {!iconOnly && <span className="ml-2">Search</span>}
    </button>
  );
};
