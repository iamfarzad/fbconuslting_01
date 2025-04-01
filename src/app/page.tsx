import HeroSection from "@/components/hero/HeroSection";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/testimonials/Testimonials";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <Testimonials />
      <CallToAction />
    </>
  );
}