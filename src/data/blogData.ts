// Placeholder data for blog posts
// Replace with actual data fetching or CMS integration later

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO 8601 format string
  author: string;
  content: string; // Full content (can be Markdown or HTML)
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'first-post',
    title: 'Understanding AI Automation',
    excerpt: 'An introduction to how AI can streamline your business processes.',
    date: '2025-04-01T10:00:00Z',
    author: 'FB Consulting',
    content: '<p>This is the full content for the first blog post about AI automation. It would typically contain much more detail, paragraphs, images, etc.</p>',
    tags: ['AI', 'Automation', 'Business'],
  },
  {
    slug: 'optimizing-workflows',
    title: 'Optimizing Workflows with Custom Chatbots',
    excerpt: 'Learn how tailored chatbots can improve efficiency and customer satisfaction.',
    date: '2025-03-25T14:30:00Z',
    author: 'FB Consulting',
    content: '<p>Detailed discussion on building and implementing custom chatbots for specific business workflows. Includes case studies and best practices.</p>',
    tags: ['AI', 'Chatbots', 'Workflow', 'Customer Service'],
  },
  {
    slug: 'data-driven-decisions',
    title: 'Making Data-Driven Decisions with AI Insights',
    excerpt: 'Unlock the power of your data using AI-powered analytics.',
    date: '2025-03-18T09:15:00Z',
    author: 'FB Consulting',
    content: '<p>Exploring techniques for AI data analysis, visualization, and generating actionable insights for business growth.</p>',
    tags: ['AI', 'Data Analysis', 'Business Intelligence'],
  },
];

// Function to get all posts (useful for listing page)
export const getAllPosts = (): BlogPost[] => {
  // Sort posts by date, newest first
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Function to get a single post by slug (useful for detail page)
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};
