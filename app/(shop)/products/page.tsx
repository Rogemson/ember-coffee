import { getAllProducts } from '@/lib/shopify/index';
import { Product } from '@/types';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductFilters } from '@/components/product/product-filter';

export const metadata = {
  title: 'Shop Coffee - Ember Coffee Co.',
  description: 'Browse our selection of exceptional single-origin coffee beans.',
};

interface ProductsPageProps {
  searchParams: Promise<{
    roast?: string;
    sort?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams; // AWAIT searchParams

  // Fetch all products
  let products: Product[] = await getAllProducts(50);

  // Filter by roast level if specified
  if (params.roast) {
    products = products.filter((product: Product) =>
      product.tags.some((tag: string) => tag === `roast:${params.roast}`)
    );
  }

  // Filter by search query
  if (params.search) {
    const query = params.search.toLowerCase();
    products = products.filter(
      (product: Product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some((tag: string) => tag.toLowerCase().includes(query))
    );
  }

  // Sort products
  if (params.sort) {
    switch (params.sort) {
      case 'price-asc':
        products.sort(
          (a: Product, b: Product) =>
            parseFloat(a.priceRange.minVariantPrice.amount) -
            parseFloat(b.priceRange.minVariantPrice.amount)
        );
        break;
      case 'price-desc':
        products.sort(
          (a: Product, b: Product) =>
            parseFloat(b.priceRange.minVariantPrice.amount) -
            parseFloat(a.priceRange.minVariantPrice.amount)
        );
        break;
      case 'title-asc':
        products.sort((a: Product, b: Product) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        products.sort((a: Product, b: Product) => b.title.localeCompare(a.title));
        break;
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-[#3E2723]">Shop Coffee</h1>
        <p className="text-gray-600">
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {/* Filters and Products */}
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar Filters */}
        <aside>
          <ProductFilters />
        </aside>

        {/* Products Grid */}
        <div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}