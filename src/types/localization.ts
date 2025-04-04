export interface LocalizedContent {
  en: string;
  no: string;
}

export type Language = 'en' | 'no';

export interface LocalizedNavLabels {
  courses: LocalizedContent;
  step: LocalizedContent;
  of: LocalizedContent;
  completed: LocalizedContent;
  completeStep: LocalizedContent;
  previous: LocalizedContent;
  next: LocalizedContent;
  returnToCourses: LocalizedContent;
}
