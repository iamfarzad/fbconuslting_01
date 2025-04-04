
"use client"; // Add use client directive

import React from 'react';
import ServiceDetail from '@/components/ServiceDetail'; // Assuming this path is correct
import { useRouter } from 'next/navigation'; // Import useRouter
import { trackEvent } from '@/services/analyticsService'; // Assuming this path is correct

interface ServiceSectionProps {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
  imagePosition: 'left' | 'right';
  imageSrc: string;
  altText: string;
  callToAction: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  id,
  title,
  description,
  benefits,
  icon,
  imagePosition,
  imageSrc,
  altText,
  callToAction
}) => {
  const router = useRouter(); // Use useRouter hook
  
  const handleCallToAction = () => {
    // Track the button click event
    trackEvent({
      action: 'click',
      category: 'cta',
      label: 'service_cta',
      cta_location: 'service_section',
      cta_text: callToAction,
      service_name: title
    });
    
    // Navigate to the contact page
    router.push('/contact'); // Use router.push for navigation
  };
  
  return (
    <div id={id} className="scroll-mt-32">
      <ServiceDetail
        title={title}
        description={description}
        benefits={benefits}
        icon={icon}
        imagePosition={imagePosition}
        imageSrc={imageSrc}
        altText={altText}
        callToAction={callToAction}
        onCallToAction={handleCallToAction}
      />
    </div>
  );
};

export default ServiceSection;
