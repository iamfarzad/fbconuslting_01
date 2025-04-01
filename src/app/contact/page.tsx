import { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact | FB Consulting",
  description: "Schedule a consultation or get in touch with our team",
};

export default function ContactPage() {
  return <ContactSection />;
}
