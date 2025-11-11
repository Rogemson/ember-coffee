import { Product } from '@/types';

/**
 * Normalize string for searching (lowercase, remove accents)
 */
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove accents
}

/**
 * Check if query matches text (fuzzy substring matching)
 */
function fuzzyMatch(text: string, query: string): boolean {
  const normalizedText = normalizeString(text);
  const normalizedQuery = normalizeString(query);
  
  // Direct substring match
  if (normalizedText.includes(normalizedQuery)) {
    return true;
  }
  
  // Word boundary match (e.g., "eth" matches "Ethiopian")
  const words = normalizedText.split(/\s+/);
  return words.some(word => word.startsWith(normalizedQuery));
}

/**
 * Calculate match score (higher = better match)
 */
function calculateScore(product: Product, query: string): number {
  const normalizedQuery = normalizeString(query);
  let score = 0;
  
  // Title matches are most important
  const titleNormalized = normalizeString(product.title);
  if (titleNormalized === normalizedQuery) {
    score += 100; // Exact match
  } else if (titleNormalized.startsWith(normalizedQuery)) {
    score += 50; // Starts with query
  } else if (titleNormalized.includes(normalizedQuery)) {
    score += 25; // Contains query
  }
  
  // Description matches
  const descNormalized = normalizeString(product.description);
  if (descNormalized.includes(normalizedQuery)) {
    score += 10;
  }
  
  // Tag matches
  product.tags.forEach(tag => {
    const tagNormalized = normalizeString(tag);
    if (tagNormalized === normalizedQuery) {
      score += 30;
    } else if (tagNormalized.includes(normalizedQuery)) {
      score += 15;
    }
  });
  
  return score;
}

/**
 * Smart search products with fuzzy matching
 */
export function smartSearch(products: Product[], query: string, limit: number = 10): Product[] {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  const normalizedQuery = normalizeString(query.trim());
  
  // Filter products that match
  const matches = products.filter(product => {
    return (
      fuzzyMatch(product.title, normalizedQuery) ||
      fuzzyMatch(product.description, normalizedQuery) ||
      product.tags.some(tag => fuzzyMatch(tag, normalizedQuery))
    );
  });
  
  // Sort by relevance score
  const scored = matches.map(product => ({
    product,
    score: calculateScore(product, normalizedQuery)
  }));
  
  scored.sort((a, b) => b.score - a.score);
  
  return scored.slice(0, limit).map(item => item.product);
}