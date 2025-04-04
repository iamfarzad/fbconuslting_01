"use client"; // Add "use client" directive

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { SearchBar } from './SearchBar';
import { SearchResults, SearchResultItem } from './SearchResults';
import { searchContent, trackSearch } from '@/services/searchService';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({
  open,
  onOpenChange
}) => {
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter(); // Use useRouter hook

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    try {
      const results = await searchContent(query);
      setSearchResults(results);
      trackSearch(query); // Pass only the query argument
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = (result: SearchResultItem) => {
    onOpenChange(false);
    router.push(result.url); // Use router.push
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center">Search</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search for services, blog posts, FAQs..." 
            className="w-full max-w-none"
          />
          
          {(searchResults.length > 0 || isSearching || searchQuery) && (
            <SearchResults
              results={searchResults}
              isLoading={isSearching}
              onResultClick={handleResultClick}
            />
          )}
          
          {!searchQuery && !isSearching && (
            <div className="py-6 text-center text-muted-foreground">
              <p>Try searching for services, blog posts, or frequently asked questions</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
