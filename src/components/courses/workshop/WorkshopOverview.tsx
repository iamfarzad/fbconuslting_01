"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Users, Lightbulb, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

const workshops = [
  {
    id: 'intro',
    title: 'Introduction to AI',
    icon: <Lightbulb className="h-5 w-5" />,
    description: 'A beginner-friendly exploration of AI concepts and practical applications for businesses.',
    duration: '3 hours',
    format: 'Online or In-person',
    topics: [
      'AI fundamentals and key terminology',
      'Types of AI systems and their applications',
      'How businesses are leveraging AI today',
      'Hands-on demos with no-code AI tools',
      'Identifying AI opportunities in your organization'
    ]
  },
  {
    id: 'business',
    title: 'AI for Business Leaders',
    icon: <Briefcase className="h-5 w-5" />,
    description: 'Strategic workshop helping executives and managers understand AI's business impact.',
    duration: '1 day',
    format: 'In-person',
    topics: [
      'AI strategy development framework',
      'ROI calculation for AI initiatives',
      'Change management for AI adoption',
      'Risk assessment and ethical considerations',
      'Case studies: successful AI transformations'
    ]
  },
  {
    id: 'teams',
    title: 'Team AI Enablement',
    icon: <Users className="h-5 w-5" />,
    description: 'Practical training to help teams integrate AI tools into their daily workflows.',
    duration: '2 days',
    format: 'Online or In-person',
    topics: [
      'AI productivity tools and techniques',
      'Prompt engineering fundamentals',
      'Collaborative AI workflows',
      'Creating custom AI assistants for specific tasks',
      'Data handling and quality assurance'
    ]
  },
  {
    id: 'technical',
    title: 'Technical AI Implementation',
    icon: <Code className="h-5 w-5" />,
    description: 'Hands-on workshop for developers and technical teams building AI applications.',
    duration: '3 days',
    format: 'Online or In-person',
    topics: [
      'API integration with leading AI services',
      'Building custom AI applications',
      'Fine-tuning models for specific domains',
      'Data preprocessing and optimization',
      'Deployment and scaling considerations'
    ]
  }
];

const WorkshopOverview = () => {
  const [activeTab, setActiveTab] = React.useState('intro');
  
  return (
    <div className="mt-12">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-12">
          {workshops.map(workshop => (
            <TabsTrigger key={workshop.id} value={workshop.id} className="flex items-center gap-2 py-3">
              {workshop.icon}
              <span className="hidden md:inline">{workshop.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {workshops.map(workshop => (
          <TabsContent key={workshop.id} value={workshop.id} className="animate-in fade-in-50">
            <WorkshopCard workshop={workshop} />
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-6">Need a custom workshop for your organization?</p>
        <a 
          href="/contact" 
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Request Custom Workshop
        </a>
      </div>
    </div>
  );
};

function WorkshopCard({ workshop }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-xl p-8 border border-border bg-card text-card-foreground"
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-primary/10">
          {workshop.icon}
        </div>
        <h3 className="text-2xl font-bold">{workshop.title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-6">{workshop.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="text-lg font-semibold mb-3">Workshop Details</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-muted-foreground">Duration:</span> 
              <span>{workshop.duration}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-muted-foreground">Format:</span> 
              <span>{workshop.format}</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-3">What You'll Learn</h4>
          <ul className="space-y-2">
            {workshop.topics.map((topic, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="flex justify-end">
        <a 
          href="/contact" 
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        >
          Inquire About This Workshop
        </a>
      </div>
    </motion.div>
  );
}

export default WorkshopOverview;