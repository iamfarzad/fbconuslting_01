import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { courseLevels } from '@/data/course/courseData'; // Import courseLevels
import { useCourseProgress } from '@/contexts/CourseProgressContext';
import { useLocalization } from '@/hooks/useLocalization';
import { LocalizedContent, LocalizedNavLabels } from '@/types/localization';

interface CourseStepClientPageProps {
  level: string;
  stepId: string;
}

const navLabels: LocalizedNavLabels = {
  courses: { en: 'Courses', no: 'Kurs' },
  step: { en: 'Step', no: 'Trinn' },
  of: { en: 'of', no: 'av' },
  completed: { en: 'Completed', no: 'Fullført' },
  completeStep: { en: 'Complete Step', no: 'Fullfør trinn' },
  previous: { en: 'Previous', no: 'Forrige' },
  next: { en: 'Next', no: 'Neste' },
  returnToCourses: { en: 'Return to Course List', no: 'Tilbake til kursoversikt' }
};

export default function CourseStepClientPage({ level, stepId }: CourseStepClientPageProps) {
  const { progress, completeStep, isStepCompleted } = useCourseProgress();
  const { getLocalizedContent } = useLocalization();
  
  const section = courseLevels.find((s) => s.id === level); // Use courseLevels and find by id
  if (!section) return notFound();

  const currentStepIndex = section.steps.findIndex((step) => step.id === stepId);
  if (currentStepIndex === -1) return notFound();

  const currentStep = section.steps[currentStepIndex];
  const previousStep = currentStepIndex > 0 ? section.steps[currentStepIndex - 1] : null;
  const nextStep = currentStepIndex < section.steps.length - 1 ? section.steps[currentStepIndex + 1] : null;
  const completed = isStepCompleted(stepId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-8">
            <nav className="flex items-center text-sm text-muted-foreground">
              <Link href="/courses" className="hover:text-foreground">
                {getLocalizedContent(navLabels.courses)}
              </Link>
              <span className="mx-2">•</span>
              <span>{getLocalizedContent(section.title)}</span>
              <span className="mx-2">•</span>
              <span>
                {getLocalizedContent(navLabels.step)} {currentStepIndex + 1} {getLocalizedContent(navLabels.of)} {section.steps.length}
              </span>
            </nav>
            {completed && (
              <div className="flex items-center text-green-500 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                {getLocalizedContent(navLabels.completed)}
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="p-8 rounded-xl glassmorphism-base">
            <header className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{getLocalizedContent(currentStep.title)}</h1>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                <span>{getLocalizedContent(currentStep.duration)}</span>
              </div>
            </header>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="text-lg">{getLocalizedContent(currentStep.description)}</p>
            </div>

            {/* Course Content */}
            <div className="my-8">
              {/* Course content will be rendered here */}
            </div>

            {/* Completion button */}
            {!completed && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                // Parse stepId to number before passing
                onClick={() => completeStep(level, parseInt(stepId, 10))}
                className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                {getLocalizedContent(navLabels.completeStep)}
              </motion.button>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
              {previousStep ? (
                <Link
                  href={`/courses/${level}/${previousStep.id}`}
                  className="flex items-center group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-sm text-muted-foreground">{getLocalizedContent(navLabels.previous)}</div>
                    <div className="font-medium">{getLocalizedContent(previousStep.title)}</div>
                  </div>
                </Link>
              ) : (
                <div /> // Empty div for spacing
              )}

              {nextStep ? (
                <Link
                  href={`/courses/${level}/${nextStep.id}`}
                  className="flex items-center text-right group"
                >
                  <div>
                    <div className="text-sm text-muted-foreground">{getLocalizedContent(navLabels.next)}</div>
                    <div className="font-medium">{getLocalizedContent(nextStep.title)}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  href="/courses"
                  className="flex items-center text-right group"
                >
                  <div>
                    <div className="text-sm text-muted-foreground">{getLocalizedContent(navLabels.completed)}</div>
                    <div className="font-medium">{getLocalizedContent(navLabels.returnToCourses)}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
