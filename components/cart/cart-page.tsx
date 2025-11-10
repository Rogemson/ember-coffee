'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/cart-contexts';
import { formatPrice } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

export function CartPageContent() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <svg
          className="mb-4 h-16 w-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h2 className="mb-2 text-2xl font-semibold text-gray-900">
          Your cart is empty
        </h2>
        <p className="mb-6 text-gray-600">
          Add some delicious coffee to get started!
        </p>
        <Button asChild>
          <Link href="/products">Shop Coffee</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-700 hover:underline"
            >
              Clear cart
            </button>
          )}
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.variantId}
              className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4"
            >
              {/* Image */}
              <div className="relative h-24 w-24 shrink overflow-hidden rounded-md bg-gray-100">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.productTitle}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    <svg
                      className="h-8 w-8"
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
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-[#3E2723]">
                      {item.productTitle}
                    </h3>
                    {item.variantTitle !== 'Default Title' && (
                      <p className="text-sm text-gray-600">{item.variantTitle}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="text-gray-400 hover:text-red-600"
                    aria-label="Remove item"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:border-[#3E2723]"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:border-[#3E2723]"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-semibold text-[#3E2723]">
                      {formatPrice(
                        (parseFloat(item.price) * item.quantity).toString(),
                        item.currencyCode
                      )}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-gray-500">
                        {formatPrice(item.price, item.currencyCode)} each
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-20 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-[#3E2723]">
            Order Summary
          </h2>

          <div className="space-y-3 border-b border-gray-200 pb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">
                {formatPrice(totalPrice.toString(), items[0]?.currencyCode || 'USD')}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {totalPrice >= 30 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  formatPrice('5.00', items[0]?.currencyCode || 'USD')
                )}
              </span>
            </div>
            {totalPrice < 30 && (
              <p className="text-xs text-gray-500">
                Add {formatPrice((30 - totalPrice).toString(), items[0]?.currencyCode || 'USD')} more for free shipping
              </p>
            )}
          </div>

          <div className="mt-4 flex justify-between border-b border-gray-200 pb-4">
            <span className="font-semibold text-[#3E2723]">Total</span>
            <span className="text-xl font-bold text-[#3E2723]">
              {formatPrice(
                (totalPrice + (totalPrice >= 30 ? 0 : 5)).toString(),
                items[0]?.currencyCode || 'USD'
              )}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            <Button size="lg" className="w-full" asChild>
              <a href="/checkout">Proceed to Checkout</a>
            </Button>
            <Button size="lg" variant="outline" className="w-full" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 space-y-2 border-t border-gray-200 pt-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free shipping on orders over $30</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Roasted fresh, shipped within 7 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}