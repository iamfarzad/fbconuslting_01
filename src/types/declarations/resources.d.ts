declare interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'download' | 'link';
  url: string;
  category: string;
  tags: string[];
  language: 'en' | 'no';
  downloadable?: boolean;
  fileType?: string;
  fileSize?: number;
  thumbnailUrl?: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  translations?: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
}

declare interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon?: string;
  count: number;
}

declare interface ResourceFilter {
  category?: string;
  type?: string;
  tag?: string;
  language?: string;
  searchQuery?: string;
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'title' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

declare interface ResourceSearchResult {
  items: Resource[];
  total: number;
  page: number;
  hasMore: boolean;
  categories: ResourceCategory[];
  tags: string[];
}

declare interface ResourceDownload {
  id: string;
  resourceId: string;
  userId?: string;
  downloadedAt: string;
  ipAddress?: string;
  userAgent?: string;
}
