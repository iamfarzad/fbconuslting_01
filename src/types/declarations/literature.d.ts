declare interface LiteratureCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  count: number;
}

declare interface LiteratureItem {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  language: 'en' | 'no';
  translations?: {
    [key: string]: {
      title: string;
      description: string;
      content: string;
    };
  };
}

declare interface LiteratureFilter {
  category?: string;
  tag?: string;
  language?: string;
  searchQuery?: string;
  page?: number;
  limit?: number;
}

declare interface LiteratureSearchResult {
  items: LiteratureItem[];
  total: number;
  page: number;
  hasMore: boolean;
}

declare interface LiteratureMetadata {
  categories: LiteratureCategory[];
  totalItems: number;
  languages: string[];
  tags: string[];
}
