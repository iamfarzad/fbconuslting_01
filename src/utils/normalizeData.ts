import { LiteratureItem } from "@/types/literature";

export function normalizeLiteratureItem(item: any): LiteratureItem { // Accept 'any' for broader input handling
  // Ensure default values for potentially missing fields to match LiteratureItem structure
  const normalized = {
    id: 0, // Default ID
    title: item.title || 'Untitled',
    authors: 'Unknown Author', // Default authors
    year: 'N/A', // Default year
    source: item.source || 'Unknown Source',
    category: item.category || 'Uncategorized',
    summary: item.summary || 'No summary available.',
    keywords: Array.isArray(item.keywords) ? item.keywords : [],
    url: item.url,
    keyFindings: Array.isArray(item.keyFindings) ? item.keyFindings : [],
    ...item, // Spread item to keep existing valid fields and potentially overwrite defaults
  };

  // Correct type normalization based on LiteratureItem interface
  normalized.id = typeof normalized.id === 'string' ? parseInt(normalized.id, 10) : normalized.id;
  if (isNaN(normalized.id)) normalized.id = 0; // Handle NaN after parsing

  normalized.authors = Array.isArray(normalized.authors)
    ? normalized.authors.join(', ') // Join array into string
    : String(normalized.authors || 'Unknown Author'); // Ensure string

  normalized.year = String(normalized.year || 'N/A'); // Ensure string

  return normalized as LiteratureItem; // Assert final type
}

export function normalizeLiteratureData(items: LiteratureItem[]): LiteratureItem[] {
  return items.map(normalizeLiteratureItem);
}
