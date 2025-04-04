import React from 'react';
import ServicesHero from './ServicesHero'; // Assuming this exists
import ServiceListSection from './ServiceListSection'; // The renamed component
import ContactCTA from '@/components/ContactCTA'; // Assuming this exists

const ServicesPageContainer = () => {
  return (
    <div className="bg-background text-foreground">
      <ServicesHero />
      <ServiceListSection />
      <ContactCTA /> 
    </div>
  );
};

export default ServicesPageContainer;
