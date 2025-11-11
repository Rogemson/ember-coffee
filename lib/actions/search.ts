'use server';

import { searchProducts as shopifySearch, getAllProducts } from '@/lib/shopify';

export async function searchProductsAction(query: string, limit: number = 20) {
  return await shopifySearch(query, limit);
}

export async function getAllProductsAction(limit: number = 100) {
  return await getAllProducts(limit);
}