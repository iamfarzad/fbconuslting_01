// Type for related posts, often simpler than full BlogPost
export interface RelatedPost {
  id: string; // Using slug as id
  title: string;
  slug: string;
}

// Main type for a blog post
export interface BlogPost {
  title: string;
  slug: string;
  date: string; // e.g., "YYYY-MM-DD"
  readTime: string; // e.g., "8 min read"
  category: string;
  author: string;
  authorTitle?: string;
  authorAvatar?: string;
  content: string; // HTML content
  excerpt: string;
  featuredImage?: string;
  relatedPosts?: RelatedPost[]; // Array of related posts
  tags?: string[]; // Optional tags
  popularity?: number; // Optional popularity score
}

// Type for testimonials (already existed, kept for consistency)
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

// Type for blog filters (from source types.ts)
export interface BlogFilters {
  category?: string;
  searchTerm?: string;
  sortField?: 'date' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

// Type for blog sort options (from source types.ts)
export interface BlogSortOptions {
  field: 'date' | 'popularity';
  order: 'asc' | 'desc';
}
