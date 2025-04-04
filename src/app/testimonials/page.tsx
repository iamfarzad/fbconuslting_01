import React from 'react';
import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Testimonials from '@/components/testimonials/Testimonials'; // Assuming this is the main testimonials component

export const metadata: Metadata = {
  title: "Testimonials | FB Consulting",
  description: "See what our clients say about working with us.",
};

const TestimonialsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Client Testimonials"
        subtitle="Hear directly from businesses we've helped transform with AI."
      />
      <div className="mt-12">
        {/* Assuming the Testimonials component fetches or contains its own data */}
        <Testimonials />
      </div>
    </div>
  );
};

export default TestimonialsPage;
