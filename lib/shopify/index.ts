import { shopifyFetch } from './client';
import {
  GET_ALL_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_COLLECTIONS_QUERY,
  SEARCH_PRODUCTS_QUERY,
  GET_PRODUCTS_BY_COLLECTION_QUERY,
} from './queries';
import { Product, Collection } from '@/types';

/**
 * Transform Shopify API response to our Product type
 * Ensures all arrays exist and handles missing data gracefully
 */
function transformProduct(shopifyProduct: any): Product {
  if (!shopifyProduct) {
    throw new Error('Invalid product data');
  }

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title || 'Untitled Product',
    description: shopifyProduct.description || '',
    descriptionHtml: shopifyProduct.descriptionHtml || '',
    tags: shopifyProduct.tags || [], // Ensure array exists
    availableForSale: shopifyProduct.availableForSale ?? true,
    priceRange: shopifyProduct.priceRange,
    images: shopifyProduct.images?.edges?.map((edge: any) => edge.node) || [], // Ensure array
    variants: shopifyProduct.variants?.edges?.map((edge: any) => edge.node) || [], // Ensure array
    options: shopifyProduct.options || [],
  };
}

/**
 * Get all products with error handling
 */
export async function getAllProducts(limit: number = 20): Promise<Product[]> {
  try {
    const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>({
      query: GET_ALL_PRODUCTS_QUERY,
      variables: { first: limit },
      tags: ['products'],
    });

    if (!data?.products?.edges) {
      console.warn('No products found in Shopify response');
      return [];
    }

    return data.products.edges.map((edge) => transformProduct(edge.node));
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return empty array instead of throwing
  }
}

/**
 * Get product by handle
 */
export async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    const data = await shopifyFetch<{ product: any }>({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
      tags: ['product', handle],
    });

    if (!data?.product) {
      console.warn(`Product not found: ${handle}`);
      return null;
    }

    return transformProduct(data.product);
  } catch (error) {
    console.error(`Error fetching product ${handle}:`, error);
    return null;
  }
}

/**
 * Get collections
 */
export async function getCollections(limit: number = 10): Promise<Collection[]> {
  try {
    const data = await shopifyFetch<{ collections: { edges: { node: any }[] } }>({
      query: GET_COLLECTIONS_QUERY,
      variables: { first: limit },
      tags: ['collections'],
    });

    if (!data?.collections?.edges) {
      return [];
    }

    return data.collections.edges.map((edge) => ({
      id: edge.node.id,
      handle: edge.node.handle,
      title: edge.node.title,
      description: edge.node.description || '',
      image: edge.node.image,
    }));
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

/**
 * Search products
 */
export async function searchProducts(query: string, limit: number = 20): Promise<Product[]> {
  try {
    const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>({
      query: SEARCH_PRODUCTS_QUERY,
      variables: { query, first: limit },
      cache: 'no-store',
    });

    if (!data?.products?.edges) {
      return [];
    }

    return data.products.edges.map((edge) => transformProduct(edge.node));
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

/**
 * Get products by collection
 */
export async function getProductsByCollection(
  collectionHandle: string,
  limit: number = 20
): Promise<Product[]> {
  try {
    const data = await shopifyFetch<{
      collection: { products: { edges: { node: any }[] } };
    }>({
      query: GET_PRODUCTS_BY_COLLECTION_QUERY,
      variables: { handle: collectionHandle, first: limit },
      tags: ['collection', collectionHandle],
    });

    if (!data?.collection?.products?.edges) {
      console.warn(`No products found for collection: ${collectionHandle}`);
      return [];
    }

    return data.collection.products.edges.map((edge) => transformProduct(edge.node));
  } catch (error) {
    console.error(`Error fetching collection ${collectionHandle}:`, error);
    return [];
  }
}