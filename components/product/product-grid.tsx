import { Product } from '@/types';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: Product[];
  priority?: boolean;
}

export function ProductGrid({ products, priority = false }: ProductGridProps) {
  // Filter out any null/undefined products
  const validProducts = products.filter(Boolean);

  if (validProducts.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto mb-4 h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="mb-2 text-lg font-semibold text-gray-700">No products found</p>
          <p className="text-sm text-gray-500">
            Add products to your Shopify store or adjust your filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {validProducts.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={priority && index < 4}
        />
      ))}
    </div>
  );
}