"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/services/analyticsService';

interface ContactCTAProps {
  showBackground?: boolean;
  title?: string;
  description?: string;
}

const ContactCTA = ({ showBackground = true, title, description }: ContactCTAProps) => {
  const router = useRouter();

  const handleBooking = () => {
    trackEvent({
      action: 'click',
      category: 'cta',
      label: 'contact_cta',
      has_background: String(showBackground),
      title: title || 'default'
    });
    router.push('/contact');
  };

  const handleConsultation = () => {
    trackEvent({
      action: 'click',
      category: 'cta',
      label: 'consultation_cta',
      has_background: String(showBackground),
      title: title || 'default'
    });
    router.push('/contact?type=consultation');
  };

  return (
    <motion.div
      className={`${
        showBackground ? 'bg-background/60 p-8 rounded-xl backdrop-blur' : ''
      } text-center`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-4 text-gradient-primary">
        {title || "Ready to Transform Your Business?"}
      </h2>
      <p className="text-lg text-muted-foreground mb-8">
        {description ||
          "Book a no-obligation consultation to discuss how AI can streamline your operations."}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleBooking}
          size="lg"
          className="bg-gradient-to-r from-primary to-primary/80 text-white"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Book a Call
        </Button>
        <Button
          onClick={handleConsultation}
          variant="outline"
          size="lg"
          className="border-primary/20 hover:bg-primary/5"
        >
          Free Consultation
        </Button>
      </div>
    </motion.div>
  );
};

export default ContactCTA;
