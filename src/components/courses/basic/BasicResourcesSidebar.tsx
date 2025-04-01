
import React from 'react';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Book, FileQuestion, DollarSign, HelpCircle, Users, BookOpen, Scale, Lightbulb, Zap, Palette, BookText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

const BasicResourcesSidebar = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-20">
          <SidebarTrigger className="bg-primary text-primary-foreground h-12 w-12 rounded-full shadow-lg" />
        </div>
      )}
      <Sidebar variant={isMobile ? "floating" : "floating"} className="w-72">
        <SidebarHeader className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Additional Resources</h3>
            <p className="text-sm text-muted-foreground">
              Helpful information for beginners
            </p>
          </div>
          {isMobile && <SidebarTrigger className="h-8 w-8" />}
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>AI Concepts</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="AI Glossary">
                    <BookText className="mr-2" size={16} />
                    <span>AI Glossary</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Model Selection Guide">
                    <Zap className="mr-2" size={16} />
                    <span>Model Selection Guide</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <Separator className="my-2" />
          
          <SidebarGroup>
            <SidebarGroupLabel>Practical Guidance</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Cost Management">
                    <DollarSign className="mr-2" size={16} />
                    <span>Cost Management</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Troubleshooting Guide">
                    <HelpCircle className="mr-2" size={16} />
                    <span>Troubleshooting Guide</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Content Evaluation">
                    <Palette className="mr-2" size={16} />
                    <span>Content Evaluation</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <Separator className="my-2" />
          
          <SidebarGroup>
            <SidebarGroupLabel>Learning Resources</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Community Forums">
                    <Users className="mr-2" size={16} />
                    <span>Community Forums</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Legal & Compliance">
                    <Scale className="mr-2" size={16} />
                    <span>Legal & Compliance</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Case Studies">
                    <Lightbulb className="mr-2" size={16} />
                    <span>Case Studies</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Beginner to Intermediate">
                    <BookOpen className="mr-2" size={16} />
                    <span>Transition Paths</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <div className="bg-muted/50 rounded-lg p-4 mt-4">
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <Book className="mr-2" size={16} />
              Featured Resource
            </h4>
            <p className="text-xs text-muted-foreground">
              <a href="https://learnprompting.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Learn Prompting
              </a> - Free, open source course on prompt engineering techniques for beginners.
            </p>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-4 mt-4">
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <FileQuestion className="mr-2" size={16} />
              Have Questions?
            </h4>
            <p className="text-xs text-muted-foreground">
              Our beginner-friendly community is here to help. Join our Discord server or check the FAQ.
            </p>
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default BasicResourcesSidebar;
