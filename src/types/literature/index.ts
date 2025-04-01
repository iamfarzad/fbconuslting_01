export interface LiteratureItem {
  id: string | number;
  title: string;
  authors: string | string[];
  year: string | number;
  abstract: string;
  link: string;
  url?: string;
  category: string;
  tags: string[];
  source?: string;
  summary?: string;
  filename?: string;
  mimeType?: string;
  keywords?: string[];
}
