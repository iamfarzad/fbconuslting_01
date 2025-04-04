import React from 'react';
import { 
  Brain, 
  MessageSquare, 
  Workflow, 
  BarChart3, 
  Code,
  Sparkles
} from 'lucide-react';
// Use relative paths for animations
import StrategyAnimation from '../components/bento/animations/StrategyAnimation'; 
import ChatbotAnimation from '../components/bento/animations/ChatbotAnimation'; 
import WorkflowAnimation from '../components/bento/animations/WorkflowAnimation'; 
import DataInsightsAnimation from '../components/bento/animations/DataInsightsAnimation'; 
import CustomDevAnimation from '../components/bento/animations/CustomDevAnimation';
import ConsultationAnimation from '../components/bento/animations/ConsultationAnimation';
import { ServiceItem } from '@/types/services'; // Use correct path alias

export const services: ServiceItem[] = [
  {
    id: "strategy", // Added id
    title: "AI Strategy & Consulting",
    description: "Develop a clear AI roadmap with actionable steps and ROI projections.", // Updated description
    icon: <Brain className="w-6 h-6" />,
    hoverAnimation: <StrategyAnimation />,
    benefits: [ // Added benefits
      "AI automation opportunity assessment",
      "Custom AI integration roadmap",
      "ROI-driven implementation plan",
      "Technology recommendations"
    ],
    cta: "Book a Strategy Session" // Added cta
  },
  {
    id: "chatbots", // Added id
    title: "Chatbots & Virtual Assistants",
    description: "Automate customer service, sales, and internal operations with AI-driven assistants.",
    icon: <MessageSquare className="w-6 h-6" />,
    hoverAnimation: <ChatbotAnimation />,
    benefits: [ // Added benefits
      "24/7 customer support automation",
      "Personalized AI-driven interactions",
      "Seamless human-agent handoff",
      "CRM and system integration"
    ],
    cta: "Explore Chatbot Solutions" // Added cta
  },
  {
    id: "workflow", // Added id
    title: "Workflow Automation",
    description: "Eliminate manual work and streamline operations with AI-driven workflows.", // Updated description
    icon: <Workflow className="w-6 h-6" />,
    hoverAnimation: <WorkflowAnimation />,
    benefits: [ // Added benefits
      "End-to-end process automation",
      "Eliminate manual data entry",
      "Reduce errors & improve quality",
      "Free up employee time for high-value tasks"
    ],
    cta: "Streamline Your Workflow" // Added cta
  },
  {
    id: "data", // Added id
    title: "AI-Powered Data Insights",
    description: "Leverage AI to turn raw data into business intelligence.", // Updated description
    icon: <BarChart3 className="w-6 h-6" />,
    hoverAnimation: <DataInsightsAnimation />,
    benefits: [ // Added benefits
      "Automated data collection & reporting",
      "Real-time analytics dashboards",
      "Predictive trend analysis",
      "Customer behavior insights"
    ],
    cta: "Unlock Your Data Potential" // Added cta
  },
  {
    id: "custom", // Added id
    title: "Custom AI Development",
    description: "Bespoke AI solutions tailored to your business challenges.", // Updated description
    icon: <Code className="w-6 h-6" />,
    hoverAnimation: <CustomDevAnimation />,
    benefits: [ // Added benefits
      "Proprietary AI algorithms",
      "AI model fine-tuning for domain-specific applications",
      "Integration with existing systems",
      "Scalable AI architecture"
    ],
    cta: "Discuss Your Custom Needs" // Added cta
  },
  {
    id: "consultation", // Added id
    title: "Not sure what you need?",
    description: "Book a free consultation to discuss your unique business challenges and find the right AI solution.",
    icon: <Sparkles className="w-6 h-6" />,
    className: "border-dashed bg-gradient-to-b from-background/40 to-background/20",
    hoverAnimation: <ConsultationAnimation />,
    cta: "Book a Free Consultation" // Added cta
    // No benefits for this one
  }
];
