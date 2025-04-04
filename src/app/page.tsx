import HeroSection from "@/components/hero/HeroSection";
// import Features from "@/components/sections/Features"; // Replaced with BentoGrid
// import WhyWorkWithMe from "@/components/WhyWorkWithMe"; // Removed for now
import Testimonials from "@/components/testimonials/Testimonials";
// import SkillsTechnologies from "@/components/about/SkillsTechnologies"; // Removed for now
import CallToAction from "@/components/sections/CallToAction";
import BentoGrid from "@/components/sections/BentoGrid"; // Added import
import ServiceListSection from "@/components/services/ServiceListSection"; // Added import for services preview

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      {/* <WhyWorkWithMe /> */} {/* Removed for now */}
      <BentoGrid /> {/* Replaced Features */}
      <ServiceListSection /> {/* Added services preview */}
      <Testimonials />
      {/* <SkillsTechnologies /> */} {/* Removed for now */}
      <CallToAction />
    </main>
  );
}
