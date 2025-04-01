import React from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  className?: string;
  hoverAnimation?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  icon,
  className = "",
  hoverAnimation = "hover:scale-105"
}) => {
  return (
    <Link href={`/services/${id}`}>
      <div className={`p-6 rounded-lg shadow-md bg-white ${hoverAnimation} transition-all duration-300 ${className}`}>
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};
