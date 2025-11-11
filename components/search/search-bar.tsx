'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils/format';
import { useProductsCache } from '@/hooks/use-products-cache';
import { smartSearch } from '@/lib/utils/search';

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { products, isLoading: isLoadingCache } = useProductsCache();

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search with debounce
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const searchResults = smartSearch(products, query, 5);
      setResults(searchResults);
    }, 150); // Faster debounce for instant feel

    return () => clearTimeout(timeoutId);
  }, [query, products]);

  const handleSelect = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Search Button (Desktop) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden text-gray-700 transition-colors hover:text-[#3E2723] lg:block"
        aria-label="Search"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {/* Search Modal/Dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:absolute lg:inset-auto lg:right-0 lg:top-full lg:mt-2 lg:w-96">
          {/* Backdrop (mobile only) */}
          <div
            className="fixed inset-0 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Search Content */}
          <div className="relative mx-4 mt-20 rounded-lg bg-white shadow-xl lg:mx-0 lg:mt-0">
            {/* Search Input */}
            <div className="flex items-center border-b border-gray-200 px-4 py-3">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search coffee..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="ml-3 flex-1 border-0 bg-transparent text-sm focus:outline-none"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {isLoadingCache ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#3E2723] border-t-transparent" />
                  <span className="ml-2 text-sm text-gray-600">Loading...</span>
                </div>
              ) : query.length < 2 ? (
                <div className="px-4 py-8 text-center">
                  <svg
                    className="mx-auto mb-2 h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <p className="text-sm text-gray-600">Search for coffee</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Try "opia" or "dark"
                  </p>
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-gray-600">No products found for "{query}"</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Try different keywords
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.handle}`}
                      onClick={handleSelect}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      {/* Image */}
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                        {product.images[0] ? (
                          <Image
                            src={product.images[0].url}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <svg
                              className="h-6 w-6 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium text-[#3E2723]">
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          {formatPrice(
                            product.priceRange.minVariantPrice.amount,
                            product.priceRange.minVariantPrice.currencyCode
                          )}
                        </p>
                      </div>
                    </Link>
                  ))}

                  {/* View All Results Link */}
                  {results.length >= 5 && (
                    <Link
                      href={`/products?search=${encodeURIComponent(query)}`}
                      onClick={handleSelect}
                      className="block border-t border-gray-100 px-4 py-3 text-center text-sm font-medium text-[#3E2723] hover:bg-gray-50"
                    >
                      View all results for "{query}"
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}