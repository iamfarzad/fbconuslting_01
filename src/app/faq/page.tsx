import React from 'react';
import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
// Import the standard Shadcn Accordion components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ | FB Consulting",
  description: "Frequently asked questions about our AI consulting services.",
};

// Placeholder data - replace with actual FAQ content later
const faqData = [
  { question: "What kind of AI services do you offer?", answer: "We offer services in AI strategy, custom chatbot development, process automation, and AI-driven data insights." },
  { question: "What industries do you specialize in?", answer: "We work across various industries, with a focus on adapting AI solutions to specific business needs." },
  { question: "How long does a typical project take?", answer: "Project timelines vary based on complexity, but we typically deliver initial prototypes within a few weeks." },
  { question: "What is the cost structure?", answer: "We offer project-based pricing and retainer models. Please contact us for a custom quote." },
];

const FAQPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our services and process."
      />
      <div className="max-w-3xl mx-auto mt-12">
        {/* Use the Accordion component */}
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQPage;
