export interface LocalizedContent {
  en: string;
  no: string;
}

export interface Step {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  duration: LocalizedContent;
  content?: LocalizedContent;
  order: number;
}

export interface CourseProgress {
  completedSteps: string[];
  currentStep?: string;
  lastAccessed: {
    [key: string]: string;
  };
  progress: number;
}

export interface CourseLevel {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  steps: Step[];
  duration: LocalizedContent;
}

export interface StepWithProgress extends Step {
  isCompleted: boolean;
  isActive: boolean;
}

export interface LevelSectionProps {
  level: CourseLevel;
  language: 'en' | 'no';
}
