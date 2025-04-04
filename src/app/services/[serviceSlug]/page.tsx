'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Calendar, AlertCircle } from 'lucide-react';
import { services } from '@/data/servicesData'; // Use alias path
import type { ServiceItem } from '@/types/services'; // Use alias path
import SEO from '@/components/SEO';
// Removed trackEvent import as analyticsService might not be set up yet

const ServiceDetailPage = () => {
  const params = useParams();
  const serviceSlug = params.serviceSlug as string;

  // Find the service data based on the slug and explicitly cast the type
  const service = services.find((s: ServiceItem) => s.id === serviceSlug) as ServiceItem | undefined;

  if (!service) {
    return (
      <div className="container mx-auto max-w-4xl py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <AlertCircle className="w-16 h-16 text-destructive" />
          <h1 className="text-3xl font-bold">Service Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the service you were looking for.
          </p>
          <Link href="/services">
            <Button variant="outline">Back to Services</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Simplified CTA handler for now
  const handleCTA = () => {
    // Placeholder for potential future analytics or specific logic
    console.log(`CTA clicked for ${service.title}`);
    // Navigation will be handled by the Link component
  };

  return (
    <>
      <SEO 
        title={`${service.title} | Services | FB Consulting`}
        description={service.description}
      />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Service Header */}
            <div className="mb-10 pb-6 border-b border-border">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 font-futuristic text-gradient-teal">
                {service.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 border-l-4 border-teal pl-4 py-2 bg-teal/5">
                {service.description}
              </p>
            </div>

            {/* Benefits Section */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="mb-10">
                 <h2 className="text-2xl font-semibold mb-6">Key Benefits</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.benefits.map((benefit: string, i: number) => ( // Add explicit types
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-3 p-3 rounded-lg bg-background/60 hover:bg-background/80 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Check className="text-teal mt-1 h-5 w-5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                 </div>
              </div>
            )}
            
            {/* Call to Action */}
            {service.cta && (
              <Link href="/contact" passHref>
                <Button 
                  onClick={handleCTA}
                  className="px-6 py-2 rounded-full flex items-center gap-2 bg-gradient-to-r from-teal to-teal/80 hover:from-teal/90 hover:to-teal text-white"
                  aria-label={`Contact us about ${service.title}`}
                >
                  <Calendar size={18} />
                  {service.cta}
                  <ArrowRight size={16} className="ml-1 animate-pulse-slow" />
                </Button>
              </Link>
            )}

            {/* Optional: Add other sections like Case Studies, Process, etc. here */}

          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;
