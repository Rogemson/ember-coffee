import Link from 'next/link';
import { Product } from '@/types';
import { ProductGrid } from '@/components/product/product-grid';
import { Button } from '@/components/ui/button';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="bg-[#FFF8E1] px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#3E2723]">
            Our Featured Roasts
          </h2>
          <p className="text-lg text-gray-700">
            Handpicked selections from our master roasters
          </p>
        </div>

        <ProductGrid products={products} priority />

        <div className="mt-12 text-center">
          <Button size="lg" variant="default" asChild>
            <Link href="/products">View All Coffee</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}