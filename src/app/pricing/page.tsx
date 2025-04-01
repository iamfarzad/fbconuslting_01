import { Metadata } from "next";
import Pricing from "@/components/Pricing";

export const metadata: Metadata = {
  title: "Pricing | FB Consulting",
  description: "Explore our service packages and pricing options",
};

export default function PricingPage() {
  return <Pricing />;
}
