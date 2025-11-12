'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Animate drawer on open/close
  useEffect(() => {
    if (!drawerRef.current || !backdropRef.current) return;

    if (open) {
      // Fade in backdrop
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: 'auto',
      });

      // Slide in drawer
      gsap.to(drawerRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      // Fade out backdrop
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: 'none',
      });

      // Slide out drawer
      gsap.to(drawerRef.current, {
        x: 380,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [open]);

  const handleRemoveItem = (id: string) => {
    const element = document.querySelector(`[data-item="${id}"]`);
    if (element) {
      gsap.to(element, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => {
          removeItem(id);
        },
      });
    } else {
      removeItem(id);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {/* CHANGED: Removed {open && ...} wrapper */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 transition-opacity"
        onClick={() => onOpenChange(false)} // CHANGED
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: 0,
          pointerEvents: 'none', // CHANGED: Added initial pointer-events
        }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 z-100 h-full w-full max-w-md shadow-2xl flex flex-col overflow-hidden"
        style={{
          backgroundColor: '#faf8f3',
          x: 380,
          opacity: 0,
        }}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{
              borderColor: 'rgba(184, 134, 11, 0.1)',
            }}
          >
            <h2
              className="text-xl font-bold"
              style={{
                color: '#3d2817',
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontSize: 'clamp(1.25rem, 3vw, 1.375rem)',
              }}
            >
              Cart
              <span
                style={{
                  color: '#b8860b',
                  marginLeft: '0.5rem',
                }}
              >
                ({totalItems})
              </span>
            </h2>
            <button
              onClick={() => onOpenChange(false)} // CHANGED
              className="rounded-full p-2 transition-all hover:opacity-70"
              aria-label="Close cart"
              style={{
                color: '#3d2817',
                backgroundColor: 'rgba(184, 134, 11, 0.08)',
              }}
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
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center gap-4">
              <svg
                className="h-16 w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: '#b8860b' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <div>
                <h3
                  className="mb-2 text-lg font-semibold"
                  style={{ color: '#3d2817' }}
                >
                  Your cart is empty
                </h3>
                <p
                  className="mb-6 text-sm"
                  style={{ color: '#6b5449' }}
                >
                  Add some coffee to get started!
                </p>
              </div>
              <Button
                onClick={() => onOpenChange(false)} // CHANGED
                asChild
                style={{
                  backgroundColor: '#b8860b',
                  color: '#faf8f3',
                }}
              >
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
                      key={item.id}
                      data-item={item.id}
                      className="flex gap-4 rounded-lg border p-3 transition-all"
                      style={{
                        borderColor: 'rgba(184, 134, 11, 0.15)',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      {/* Image */}
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.productTitle}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div
                            className="flex h-full items-center justify-center"
                            style={{ color: '#b8860b' }}
                          >
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
                        <div className="flex justify-between mb-2">
                          <div className="flex-1">
                            <h3
                              className="text-sm font-semibold"
                              style={{ color: '#3d2817' }}
                            >
                              {item.productTitle}
                            </h3>
                            {item.variantTitle !== 'Default Title' && (
                              <p
                                className="text-xs mt-1"
                                style={{ color: '#6b5449' }}
                              >
                                {item.variantTitle}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-sm hover:opacity-70 transition-opacity"
                            style={{
                              color: '#b8860b',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              textDecoration: 'underline',
                              padding: '0.25rem',
                            }}
                            aria-label="Remove item"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="flex h-6 w-6 items-center justify-center rounded border text-sm hover:opacity-70 transition-opacity disabled:opacity-50"
                              style={{
                                borderColor: 'rgba(184, 134, 11, 0.2)',
                                color: '#3d2817',
                                background: 'none',
                                cursor: 'pointer',
                              }}
                              disabled={item.quantity <= 1}
                              type="button"
                            >
                              −
                            </button>
                            <span
                              className="w-6 text-center text-sm font-medium"
                              style={{ color: '#3d2817' }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="flex h-6 w-6 items-center justify-center rounded border text-sm hover:opacity-70 transition-opacity"
                              style={{
                                borderColor: 'rgba(184, 134, 11, 0.2)',
                                color: '#3d2817',
                                background: 'none',
                                cursor: 'pointer',
                              }}
                              type="button"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p
                              className="text-sm font-semibold"
                              style={{ color: '#b8860b' }}
                            >
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
              <div
                className="border-t px-6 py-4 space-y-4"
                style={{
                  borderColor: 'rgba(184, 134, 11, 0.1)',
                  backgroundColor: '#ffffff',
                }}
              >
                {/* Shipping Notice */}
                {totalPrice < 30 && (
                  <div
                    className="rounded-lg p-3 text-sm border-l-4"
                    style={{
                      backgroundColor: 'rgba(184, 134, 11, 0.08)',
                      borderColor: '#b8860b',
                      color: '#3d2817',
                    }}
                  >
                    <p>
                      Add{' '}
                      <strong style={{ color: '#b8860b' }}>
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
                <div className="flex justify-between">
                  <span style={{ color: '#6b5449' }}>Subtotal</span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: '#3d2817' }}
                  >
                    {formatPrice(
                      totalPrice.toString(),
                      items[0]?.currencyCode || 'USD'
                    )}
                  </span>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  <Button
                    size="lg"
                    className="w-full"
                    asChild
                    style={{
                      backgroundColor: '#b8860b',
                      color: '#faf8f3',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        backgroundColor: '#9a6f0a',
                        duration: 0.3,
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        backgroundColor: '#b8860b',
                        duration: 0.3,
                      });
                    }}
                  >
                    <Link href="/cart" onClick={() => onOpenChange(false)}> {/* CHANGED */}
                      View Cart
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    className="w-full"
                    asChild
                    style={{
                      backgroundColor: 'transparent',
                      color: '#3d2817',
                      border: '2px solid #3d2817',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        backgroundColor: '#3d2817',
                        color: '#faf8f3',
                        duration: 0.3,
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        backgroundColor: 'transparent',
                        color: '#3d2817',
                        duration: 0.3,
                      });
                    }}
                  >
                    <a href="/checkout" onClick={() => onOpenChange(false)}> {/* CHANGED */}
                      Checkout
                    </a>
                  </Button>
                </div>

                <p
                  className="mt-3 text-center text-xs"
                  style={{ color: '#b8860b' }}
                >
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