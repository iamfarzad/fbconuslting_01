"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LevelSection from "@/components/courses/LevelSection";
import BasicStepsList from "@/components/courses/basic/BasicStepsList";
import IntermediateStepsList from "@/components/courses/intermediate/IntermediateStepsList";
import AdvancedStepsList from "@/components/courses/advanced/AdvancedStepsList";
import { BookOpen, Code, Cpu } from "lucide-react";

const CourseOverview = () => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="mt-8">
      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-12">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Beginner</span>
          </TabsTrigger>
          <TabsTrigger value="intermediate" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span className="hidden md:inline">Intermediate</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span className="hidden md:inline">Advanced</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="mt-6">
          <LevelSection 
            level="basic" 
            title="Beginner AI Path" 
            description="Start your AI journey with essential concepts and basic implementations."
            id="basic"
          >
            <BasicStepsList />
          </LevelSection>
        </TabsContent>
        
        <TabsContent value="intermediate" className="mt-6">
          <LevelSection 
            level="intermediate" 
            title="Intermediate AI Path" 
            description="Build on your foundation with more complex AI techniques and integrations."
            id="intermediate"
          >
            <IntermediateStepsList />
          </LevelSection>
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-6">
          <LevelSection 
            level="advanced" 
            title="Advanced AI Path" 
            description="Master sophisticated AI systems and cutting-edge deployment strategies."
            id="advanced"
          >
            <AdvancedStepsList />
          </LevelSection>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseOverview;