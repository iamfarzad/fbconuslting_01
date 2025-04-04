import { Metadata } from "next";
// Import the new page component (will be created next)
import ServicesPageContainer from "@/components/services/ServicesPageContainer"; 

export const metadata: Metadata = {
  title: "AI Services | FB Consulting", // Updated title
  description: "Explore our AI Strategy, Chatbot, Workflow Automation, Data Insight, and Custom Development services.", // Updated description
};

export default function ServicesPage() {
  // Render the new container component
  return <ServicesPageContainer />;
}
