'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { getAllProductsAction } from '@/lib/actions/search';

let cachedProducts: Product[] | null = null;
let cachePromise: Promise<Product[]> | null = null;

export function useProductsCache() {
  const [products, setProducts] = useState<Product[]>(cachedProducts || []);
  const [isLoading, setIsLoading] = useState(!cachedProducts);

  useEffect(() => {
    // If already cached, use cache
    if (cachedProducts) {
      setProducts(cachedProducts);
      setIsLoading(false);
      return;
    }

    // If already fetching, wait for that
    if (cachePromise) {
      cachePromise.then(data => {
        setProducts(data);
        setIsLoading(false);
      });
      return;
    }

    // Fetch products
    setIsLoading(true);
    cachePromise = getAllProductsAction(100);
    
    cachePromise
      .then(data => {
        cachedProducts = data;
        setProducts(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading products:', error);
        setIsLoading(false);
      });
  }, []);

  return { products, isLoading };
}