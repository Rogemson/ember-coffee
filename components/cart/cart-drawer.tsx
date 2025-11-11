'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-[#3E2723]">
              Shopping Cart ({totalItems})
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close cart"
            >
              <svg
                className="h-6 w-6"
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

          {/* Empty State */}
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
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
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Your cart is empty
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                Add some coffee to get started!
              </p>
              <Button onClick={onClose} asChild>
                <Link href="/products">Shop Coffee</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.variantId}
                      className="flex gap-4 rounded-lg border border-gray-100 p-3"
                    >
                      {/* Image */}
                      <div className="relative h-20 w-20 shrink overflow-hidden rounded-md bg-gray-100">
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
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-[#3E2723]">
                              {item.productTitle}
                            </h3>
                            {item.variantTitle !== 'Default Title' && (
                              <p className="text-xs text-gray-600">
                                {item.variantTitle}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="text-gray-400 hover:text-red-600"
                            aria-label="Remove item"
                          >
                            <svg
                              className="h-4 w-4"
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

                        <div className="mt-2 flex items-center justify-between">
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.variantId, item.quantity - 1)
                              }
                              className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 text-sm hover:border-[#3E2723]"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.variantId, item.quantity + 1)
                              }
                              className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 text-sm hover:border-[#3E2723]"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-sm font-semibold text-[#3E2723]">
                              {formatPrice(
                                (parseFloat(item.price) * item.quantity).toString(),
                                item.currencyCode
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-6 py-4">
                {/* Shipping Notice */}
                {totalPrice < 30 && (
                  <div className="mb-4 rounded-lg bg-[#FFF8E1] p-3 text-sm">
                    <p className="text-[#3E2723]">
                      Add{' '}
                      <strong>
                        {formatPrice(
                          (30 - totalPrice).toString(),
                          items[0]?.currencyCode || 'USD'
                        )}
                      </strong>{' '}
                      more for free shipping! 🚚
                    </p>
                  </div>
                )}

                {/* Subtotal */}
                <div className="mb-4 flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-lg font-bold text-[#3E2723]">
                    {formatPrice(
                      totalPrice.toString(),
                      items[0]?.currencyCode || 'USD'
                    )}
                  </span>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/cart" onClick={onClose}>
                      View Cart
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full"
                    asChild
                  >
                    <a href="/checkout">Checkout</a>
                  </Button>
                </div>

                <p className="mt-3 text-center text-xs text-gray-500">
                  Shipping calculated at checkout
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}