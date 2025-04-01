
import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BookOpen, Check, CheckCircle, ExternalLink, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface PlatformLink {
  name: string;
  url: string;
  description: string;
}

interface StepCardProps {
  number: number;
  title: string;
  children: ReactNode;
  className?: string;
  platforms?: PlatformLink[];
  completed?: boolean;
  onMarkComplete?: (number: number, isComplete: boolean) => void;
  tips?: string[];
}

const StepCard = ({ 
  number, 
  title, 
  children, 
  className, 
  platforms = [],
  completed = false,
  onMarkComplete,
  tips = []
}: StepCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isComplete, setIsComplete] = useState(completed);

  const toggleComplete = () => {
    const newState = !isComplete;
    setIsComplete(newState);
    if (onMarkComplete) {
      onMarkComplete(number, newState);
    }
  };

  return (
    <motion.div
      className={cn(
        "glass rounded-2xl p-6 mb-6 border-l-4",
        isComplete ? "border-l-green-500" : "border-l-primary/40",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "text-primary rounded-full h-8 w-8 flex items-center justify-center font-medium text-sm shrink-0",
          isComplete ? "bg-green-100" : "bg-primary/10"
        )}>
          {isComplete ? <Check className="h-4 w-4 text-green-600" /> : number}
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              {title}
              {isComplete && (
                <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Completed
                </span>
              )}
            </h3>
          </div>
          <div className="text-foreground/70 text-base leading-relaxed mb-4">
            {children}
          </div>
          
          {tips.length > 0 && (
            <motion.div 
              initial={false}
              animate={{ height: isExpanded ? 'auto' : '0', opacity: isExpanded ? 1 : 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-2">
                <h4 className="text-sm font-medium text-amber-700 mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Pro Tips
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  {tips.map((tip, index) => (
                    <li key={index} className="text-sm text-amber-700">{tip}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
          
          {platforms.length > 0 && (
            <div className="mt-3 space-y-2">
              <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> 
                Recommended Platforms:
              </h4>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <TooltipProvider key={platform.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a 
                          href={platform.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs bg-background border border-border rounded-full px-3 py-1.5 hover:bg-accent transition-colors"
                        >
                          {platform.name}
                          <ExternalLink className="h-3 w-3 ml-0.5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-[200px]">{platform.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-border">
            {tips.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs"
              >
                {isExpanded ? "Hide Tips" : "Show Tips"}
              </Button>
            )}
            
            <Button 
              variant={isComplete ? "outline" : "default"} 
              size="sm" 
              onClick={toggleComplete}
              className={cn(
                "ml-auto text-xs",
                isComplete ? "text-green-600 border-green-200 hover:bg-green-50" : ""
              )}
            >
              {isComplete ? "Mark as Incomplete" : "Mark as Complete"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StepCard;
