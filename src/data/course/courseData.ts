import { CourseLevel } from '@/types/course';

export const courseLevels: CourseLevel[] = [
  {
    id: 'beginner',
    title: {
      en: 'Beginner Level',
      no: 'Nybegynnernivå'
    },
    description: {
      en: 'Start your AI journey with fundamental concepts',
      no: 'Start AI-reisen din med grunnleggende konsepter'
    },
    duration: {
      en: '2-3 weeks',
      no: '2-3 uker'
    },
    steps: [
      {
        id: 'intro-to-ai',
        title: {
          en: 'Introduction to AI',
          no: 'Introduksjon til AI'
        },
        description: {
          en: 'Learn about basic AI concepts and applications',
          no: 'Lær om grunnleggende AI-konsepter og applikasjoner'
        },
        duration: {
          en: '45 minutes',
          no: '45 minutter'
        },
        order: 1
      }
      // Add more steps here
    ]
  }
  // Add more levels here
];

export const courseData = {
  levels: courseLevels
};
