'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentRoast = searchParams.get('roast');
  const currentSort = searchParams.get('sort');

  const roastLevels = [
    { value: 'light', label: 'Light Roast' },
    { value: 'medium', label: 'Medium Roast' },
    { value: 'medium-dark', label: 'Medium-Dark' },
    { value: 'dark', label: 'Dark Roast' },
  ];

  const sortOptions = [
    { value: 'title-asc', label: 'Name: A-Z' },
    { value: 'title-desc', label: 'Name: Z-A' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/products');
  };

  const hasActiveFilters = currentRoast || currentSort;

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      )}

      {/* Roast Level Filter */}
      <div>
        <h3 className="mb-3 font-semibold text-[#3E2723]">Roast Level</h3>
        <div className="space-y-2">
          {roastLevels.map((roast) => (
            <label
              key={roast.value}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="radio"
                name="roast"
                value={roast.value}
                checked={currentRoast === roast.value}
                onChange={(e) => updateFilter('roast', e.target.value)}
                className="h-4 w-4 border-gray-300 text-[#3E2723] focus:ring-[#FFA726]"
              />
              <span className="text-sm text-gray-700">{roast.label}</span>
            </label>
          ))}
          {currentRoast && (
            <button
              onClick={() => updateFilter('roast', null)}
              className="text-sm text-[#FFA726] hover:underline"
            >
              Clear roast filter
            </button>
          )}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="mb-3 font-semibold text-[#3E2723]">Sort By</h3>
        <select
          value={currentSort || ''}
          onChange={(e) => updateFilter('sort', e.target.value || null)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#3E2723] focus:outline-none focus:ring-1 focus:ring-[#3E2723]"
        >
          <option value="">Default</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range - TODO: Implement if needed */}
      <div>
        <h3 className="mb-3 font-semibold text-[#3E2723]">Price Range</h3>
        <p className="text-sm text-gray-500">Coming soon</p>
      </div>
    </div>
  );
}