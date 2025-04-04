"use client"; // Keep this if components below need client-side features

import React from 'react';
// import Navbar from '@/components/Navbar'; // Should be handled by root layout
// import Footer from '@/components/Footer'; // Should be handled by root layout
import SEO from '@/components/SEO';
// Removed useRouter and useEffect as redirect is no longer needed
import AboutHero from '@/components/about/AboutHero'; // Assuming this exists
import SkillsTechnologies from '@/components/about/SkillsTechnologies'; // Assuming this exists
import BackgroundCTA from '@/components/about/BackgroundCTA'; // Assuming this exists

const About = () => {
  // Restore basic About page structure
  return (
    <> {/* Use Fragment instead of div wrapper */}
      <SEO 
        title="About - AI Automation Ally | Expert Consultant" 
        description="Learn about my 10+ years of experience helping businesses leverage AI and automation technology to reduce costs, streamline operations, and drive growth."
      />
      
      {/* <Navbar /> */} {/* Removed */}
      
      <main className="flex-grow pt-16"> {/* Adjust padding if needed */}
        {/* Placeholder for actual About page content */}
        {/* Assuming components like AboutHero, SkillsTechnologies, BackgroundCTA exist */}
        <AboutHero />
        <SkillsTechnologies />
        <BackgroundCTA />
        {/* Add other relevant sections here */}
      </main>
      
      {/* <Footer /> */} {/* Removed */}
    </>
  );
};

export default About;
