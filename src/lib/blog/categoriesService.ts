
import { BlogPost } from '@/types/blog';
import { blogPosts } from './blogData';

/**
 * Returns all available blog categories
 */
export const getBlogCategories = (): string[] => {
  const categories = blogPosts.map(post => post.category);
  return Array.from(new Set(categories)); // Use Array.from for compatibility
};

/**
 * Filters blog posts by category
 */
export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(post => post.category === category);
};
