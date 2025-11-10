"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils/format';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  // Safe access to product properties with fallbacks
  const image = product.images?.[0];
  const price = product.priceRange?.minVariantPrice;
  
  // Extract roast level from tags (with safe checks)
  const roastTag = product.tags?.find(tag => tag.startsWith('roast:'));
  const roastLevel = roastTag?.split(':')[1];

  // If essential data is missing, don't render
  if (!product || !price) {
    console.warn('ProductCard: Missing essential product data', product);
    return null;
  }

  return (
    <Card className="group h-full overflow-hidden">
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {!product.availableForSale && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Badge variant="destructive">Sold Out</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 font-semibold text-[#3E2723] transition-colors group-hover:text-[#FFA726]">
              {product.title}
            </h3>
            {roastLevel && (
              <Badge variant="secondary" className="shrink-0 capitalize">
                {roastLevel}
              </Badge>
            )}
          </div>
          
          <p className="line-clamp-2 text-sm text-gray-600">
            {product.description || 'No description available'}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <span className="text-lg font-bold text-[#3E2723]">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          
          <Button 
            size="sm" 
            variant="secondary"
            className="group-hover:bg-[#FFA726]"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Add to cart functionality
              console.log('Add to cart:', product.id);
            }}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}