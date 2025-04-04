declare interface LocalizedContent {
  en: string;
  no: string;
}

declare interface Step {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  duration: LocalizedContent;
  content?: LocalizedContent;
  order: number;
}

declare interface CourseProgress {
  completedSteps: string[];
  currentStep?: string;
  lastAccessed: {
    [key: string]: string;
  };
  progress: number;
}

declare interface CourseLevel {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  steps: Step[];
  duration: LocalizedContent;
}

declare interface StepWithProgress extends Step {
  isCompleted: boolean;
  isActive: boolean;
}
