import { notFound } from 'next/navigation';
import { getProductByHandle, getAllProducts } from '@/lib/shopify/index';
import { ProductDetails } from '@/components/product/product-details';

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

// Generate static params for all products (optional - for better performance)
export async function generateStaticParams() {
  const products = await getAllProducts(100);
  return products.map((product) => ({
    handle: product.handle,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { handle } = await params; // AWAIT params here
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.title} - Ember Coffee Co.`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params; // AWAIT params here
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <ProductDetails product={product} />
    </div>
  );
}