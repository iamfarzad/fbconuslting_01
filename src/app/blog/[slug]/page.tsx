import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostHeader from '@/components/blog/PostHeader'; // Corrected path
import PostContent from '@/components/blog/PostContent'; // Corrected path
import ShareSection from '@/components/blog/ShareSection'; // Corrected path
import RelatedPosts from '@/components/blog/RelatedPosts'; // Corrected path
import { getBlogPostBySlug, getRelatedPosts, getAllBlogPosts } from '@/lib/blog'; // Corrected path
import DotPattern from '@/components/ui/dot-pattern'; // Assuming DotPattern exists
import { notFound } from 'next/navigation'; // Use Next.js notFound
import type { Metadata, ResolvingMetadata } from 'next';

// Define params type
interface BlogPostPageProps {
  params: { slug: string };
}

// Generate Metadata dynamically
export async function generateMetadata(
  { params }: BlogPostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  // Optionally access and extend parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${post.title} | F.B Consulting Blog`,
    description: post.excerpt || `Read about ${post.title} in our AI automation blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date, // Assuming date is in ISO format or similar
      authors: [post.author],
      images: post.featuredImage ? [
        {
          url: post.featuredImage, // Must be absolute URL for OG
          // width: 800, // Optional
          // height: 600, // Optional
        },
        // ...previousImages, // If you want to include parent images
      ] : [], // Provide empty array if no image
    },
    // Add other metadata like keywords, canonical URL etc. if needed
    // keywords: post.tags || [],
    // alternates: {
    //   canonical: `/blog/${post.slug}`,
    // },
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// The Page component
const BlogPostPage: React.FC<BlogPostPageProps> = ({ params }) => {
  const { slug } = params;
  const post = getBlogPostBySlug(slug);

  // If no post is found, trigger Next.js notFound
  if (!post) {
    notFound();
  }

  // Map BlogPost[] to RelatedPost[] for the RelatedPosts component
  // Ensure relatedPosts exist on the post object before mapping
  const relatedBlogPosts = post.relatedPosts 
    ? getRelatedPosts(post.slug).map(p => ({
        id: p.slug || '', // Using slug as id since it's unique
        title: p.title,
        slug: p.slug || ''
      }))
    : []; // Provide empty array if no related posts defined

  return (
    // Removed flex container, assuming layout handles it
    <>
      {/* SEO handled by generateMetadata */}
      {/* Navbar and Footer likely in root layout */}
      <main className="flex-grow pt-24 pb-16 relative">
        <DotPattern width={14} height={14} cx={7} cy={7} cr={1.2} className="opacity-20" />
        <div className="container px-4 mx-auto relative z-10">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/blog" className="inline-flex items-center">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back to all posts
              </Link>
            </Button>
          </div>

          <article className="max-w-3xl mx-auto">
            <PostHeader 
              title={post.title}
              category={post.category}
              date={post.date}
              readTime={post.readTime}
              author={post.author}
              authorTitle={post.authorTitle}
              authorAvatar={post.authorAvatar}
            />
            
            <PostContent 
              content={post.content}
              title={post.title} // Add missing title prop
              featuredImage={post.featuredImage} // Pass featured image too
            />
            
            <ShareSection /> // Remove unsupported props
            
            <RelatedPosts posts={relatedBlogPosts} />
          </article>
        </div>
      </main>
    </>
  );
};

export default BlogPostPage;
