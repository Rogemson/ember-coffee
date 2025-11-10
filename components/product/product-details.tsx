'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, ProductVariant } from '@/types';
import { formatPrice } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/cart-contexts';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  // Extract metadata from tags
  const roastTag = product.tags.find((tag) => tag.startsWith('roast:'));
  const roastLevel = roastTag?.split(':')[1];
  const originTag = product.tags.find((tag) => tag.startsWith('origin:'));
  const origin = originTag?.split(':')[1];

  const handleAddToCart = () => {
    setIsAdding(true);

    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productTitle: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price.amount,
      currencyCode: selectedVariant.price.currencyCode,
      quantity,
      image: product.images[0]?.url,
    });

    // Show feedback
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-[#3E2723]">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#3E2723]">
          Shop
        </Link>
        <span>/</span>
        <span className="text-[#3E2723]">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div>
          {/* Main Image */}
          <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].altText || product.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                    selectedImage === index
                      ? 'border-[#3E2723]'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || `${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {/* Title and Price */}
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold text-[#3E2723]">
              {product.title}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#3E2723]">
                {formatPrice(
                  selectedVariant.price.amount,
                  selectedVariant.price.currencyCode
                )}
              </span>
              {roastLevel && (
                <Badge variant="secondary" className="capitalize">
                  {roastLevel} Roast
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Metadata */}
          {origin && (
            <div className="mb-6">
              <h3 className="mb-2 font-semibold text-[#3E2723]">Origin</h3>
              <p className="capitalize text-gray-700">{origin}</p>
            </div>
          )}

          {/* Variant Selection */}
          {product.options && product.options.length > 0 && (
            <div className="mb-6">
              {product.options.map((option) => (
                <div key={option.id} className="mb-4">
                  <h3 className="mb-2 font-semibold text-[#3E2723]">
                    {option.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const variant = product.variants.find((v) =>
                        v.selectedOptions.some(
                          (opt) =>
                            opt.name === option.name && opt.value === value
                        )
                      );

                      const isSelected = variant?.id === selectedVariant.id;
                      const isAvailable = variant?.availableForSale ?? false;

                      return (
                        <button
                          key={value}
                          onClick={() => variant && setSelectedVariant(variant)}
                          disabled={!isAvailable}
                          className={`rounded-md border-2 px-4 py-2 text-sm font-medium transition-all ${
                            isSelected
                              ? 'border-[#3E2723] bg-[#3E2723] text-white'
                              : isAvailable
                              ? 'border-gray-300 hover:border-[#3E2723]'
                              : 'cursor-not-allowed border-gray-200 text-gray-400 line-through'
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="mb-2 font-semibold text-[#3E2723]">Quantity</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-gray-300 hover:border-[#3E2723]"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="h-10 w-16 rounded-md border-2 border-gray-300 text-center focus:border-[#3E2723] focus:outline-none"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-gray-300 hover:border-[#3E2723]"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mb-6">
            <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!selectedVariant.availableForSale || isAdding}
                isLoading={isAdding}
            >
                {selectedVariant.availableForSale
                ? isAdding
                    ? 'Adding...'
                    : 'Add to Cart'
                : 'Out of Stock'}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#3E2723]">
                Brewing Recommendations
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-2 text-sm text-gray-700">
                <p className="mb-2">
                  <strong>Best brewing methods:</strong> Pour over, Chemex,
                  drip
                </p>
                <p>
                  <strong>Grind size:</strong> Medium-fine for pour over,
                  medium for drip
                </p>
              </div>
            </details>

            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#3E2723]">
                Shipping & Returns
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-2 text-sm text-gray-700">
                <p className="mb-2">Free shipping on orders over $30</p>
                <p>Roasted fresh and shipped within 7 days</p>
              </div>
            </details>

            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-[#3E2723]">
                Storage Tips
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <div className="mt-2 text-sm text-gray-700">
                <p>
                  Store in an airtight container in a cool, dark place. Use
                  within 2-3 weeks of opening for best flavor.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}