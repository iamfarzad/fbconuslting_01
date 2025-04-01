import { Metadata } from "next";
import { ServiceDetails } from "@/components/services/ServiceDetails";

export const metadata: Metadata = {
  title: "Services | FB Consulting",
  description: "Explore our range of consulting services",
};

export default function ServicesPage() {
  return <ServiceDetails />;
}
