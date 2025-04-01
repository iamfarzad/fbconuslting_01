import { LiteratureItem } from "@/types/literature";

export function normalizeLiteratureItem(item: LiteratureItem): LiteratureItem {
  return {
    ...item,
    id: typeof item.id === 'number' ? String(item.id) : item.id,
    authors: typeof item.authors === 'string' 
      ? item.authors.split(',').map(author => author.trim()) 
      : item.authors,
    year: typeof item.year === 'string' ? parseInt(item.year, 10) : item.year
  };
}

export function normalizeLiteratureData(items: LiteratureItem[]): LiteratureItem[] {
  return items.map(normalizeLiteratureItem);
}
