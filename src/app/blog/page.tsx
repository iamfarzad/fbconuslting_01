"use client"; // Needed for useState and useEffect

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Use next/link
import { getAllBlogPosts, getBlogCategories, filterBlogPosts } from '@/lib/blog'; // Updated service path
import { BlogFilters as BlogFiltersType, BlogPost } from '@/types/blog'; // Updated types path
// Assuming Navbar and Footer are correctly placed and aliased
// import Navbar from '@/components/layout/Navbar'; // Example path, adjust if needed
// import Footer from '@/components/layout/Footer'; // Example path, adjust if needed
import { Button } from '@/components/ui/button';
import NewsletterSignup from '@/components/NewsletterSignup';
import SEO from '@/components/SEO'; // Assuming SEO component exists and is adapted
import DotPattern from '@/components/ui/dot-pattern'; // Assuming DotPattern exists
import { TextRevealByWord } from '@/components/ui/text-reveal'; // Assuming TextReveal exists
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Not used in source code provided
import { BlogFilters } from '@/components/blog/BlogFilters'; // Updated component path
import { SearchButton } from '@/components/ui/search/SearchButton'; // Assuming SearchButton exists
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader'; // Use existing PageHeader

const BlogPage = () => {
  // Note: In a real App Router scenario, fetching might happen server-side,
  // but we adapt the client-side logic from the source for now.
  const allPosts = getAllBlogPosts(); 
  const categories = getBlogCategories();
  // Handle case where there are no posts
  const featuredPost = allPosts.length > 0 ? allPosts[0] : null; 
  const initialPostsToFilter = allPosts.length > 1 ? allPosts.slice(1) : [];

  const [filters, setFilters] = useState<BlogFiltersType>({
    category: 'all',
    searchTerm: '',
    sortField: 'date',
    sortOrder: 'desc'
  });
  
  // Initialize with posts excluding the potential featured one
  const [filteredPosts, setFilteredPosts] = useState(initialPostsToFilter); 
  
  // Apply filters whenever they change
  useEffect(() => {
    const postsToFilter = allPosts.length > 1 ? allPosts.slice(1) : [];
    const result = filterBlogPosts(postsToFilter, filters);
    setFilteredPosts(result);
  }, [filters, allPosts]); // Dependency on allPosts added

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: BlogFiltersType) => {
    setFilters(newFilters);
  };

  // Basic SEO - structured data removed due to window dependency
  // A proper implementation would use Next.js metadata API

  return (
    // Removed min-h-screen flex flex-col, assuming layout handles this
    <> 
      <SEO 
        title="AI Automation Blog | Insights & Case Studies"
        description="Explore expert insights, case studies, and guides on AI automation for business - stay updated on the latest AI trends and implementation strategies."
        // structuredData removed
      />
      {/* Navbar and Footer are likely in the root layout, removed from here */}
      
      <main className="flex-grow pt-16 relative overflow-hidden">
        {/* Use PageHeader for consistency */}
        <PageHeader 
           title="Blog"
           subtitle="Discover AI automation insights, case studies, and expert guides to transform your business processes." // Changed description to subtitle
           // breadcrumbLabel prop removed as it's not supported by PageHeader
        />
        
        {/* Content section */}
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Search and filter bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative flex mb-6">
              <input
                type="text"
                placeholder="Search articles..."
                value={filters.searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-3 border border-input bg-background rounded-full focus:outline-none focus:ring-2 focus:ring-ring/50"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 {/* Assuming SearchButton is adapted or exists */}
                <SearchButton iconOnly variant="ghost" className="p-0 hover:bg-transparent" />
              </div>
            </div>
            
            <BlogFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              // Adjust counts based on whether a featured post exists
              totalCount={allPosts.length > 0 ? allPosts.length - 1 : 0} 
              filteredCount={filteredPosts.length}
            />
          </div>

          {/* Featured Article section - Conditionally render */}
          {featuredPost && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-10 text-primary text-center">Featured Article</h2>
              <Link href={`/blog/${featuredPost.slug}`} className="block max-w-4xl mx-auto">
                {/* Using Card component for consistency */}
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative aspect-video">
                      <img
                        src={featuredPost.featuredImage || "/placeholder.svg"} // Use placeholder
                        alt={featuredPost.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                           <span className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-medium rounded">
                             {featuredPost.category}
                           </span>
                           <span>{featuredPost.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">{featuredPost.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{featuredPost.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                          <img 
                            src={featuredPost.authorAvatar || "/placeholder.svg"}
                            alt={featuredPost.author}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span>{featuredPost.author}</span>
                        </div>
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </section>
          )}

          {/* Browse Articles section */}
          <section className="mb-16">
             {/* Only show title if there are non-featured posts */}
            {(allPosts.length > 1 || !featuredPost) && (
              <h2 className="text-3xl font-bold mb-10 text-primary text-center">
                {featuredPost ? 'More Articles' : 'Browse Articles'}
              </h2>
            )}
              
              {/* Display posts */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {filteredPosts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                      <Card className="h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
                        {post.featuredImage && (
                           <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                             <img 
                               src={post.featuredImage} 
                               alt={post.title} 
                               className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                             />
                           </div>
                        )}
                        <CardHeader className="pt-4">
                          <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
                            <span className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-medium rounded">
                              {post.category}
                            </span>
                            <span>{post.date}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-primary line-clamp-2">{post.title}</h3>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between pt-4 text-xs">
                          <div className="flex items-center">
                            <img 
                              src={post.authorAvatar || "/placeholder.svg"}
                              alt={post.author}
                              className="w-6 h-6 rounded-full mr-2"
                            />
                            <span>{post.author}</span>
                          </div>
                          <span className="text-primary group-hover:underline">Read more</span>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                 // Only show 'No articles found' if there was a search/filter attempt
                 (filters.category !== 'all' || filters.searchTerm) && (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-medium mb-2">No articles found</h3>
                      <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
                      <Button onClick={() => handleFilterChange({
                        category: 'all',
                        searchTerm: '',
                        sortField: 'date',
                        sortOrder: 'desc'
                      })}>Clear Filters</Button>
                    </div>
                 )
              )}
          </section>
          
          {/* Newsletter signup */}
          <section className="mt-16">
            <NewsletterSignup />
          </section>
        </div>
      </main>
      
      {/* Footer removed, assuming it's in layout */}
    </>
  );
};

export default BlogPage;
