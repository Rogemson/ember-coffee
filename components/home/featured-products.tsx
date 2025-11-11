'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Product } from '@/types';
import { ProductGrid } from '@/components/product/product-grid';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Animate description
      gsap.from(descriptionRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2,
      });

      // Animate product grid items with stagger
      const productItems = containerRef.current?.querySelectorAll('[data-product-item]');
      if (productItems && productItems.length > 0) {
        gsap.from(productItems, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'back.out(1.1)',
          stagger: 0.1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 lg:py-40"
      style={{
        backgroundColor: '#ffffff', // Clean white section
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section heading */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <h2
            ref={headingRef}
            className="mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              color: '#3d2817', // 30% - Deep brown
            }}
          >
            Our Featured Roasts
          </h2>
          <p
            ref={descriptionRef}
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
              lineHeight: 1.6,
              letterSpacing: '0.01em',
              color: '#6b5449', // Muted brown
            }}
          >
            Handpicked selections from our master roasters
          </p>
        </div>

        {/* Product Grid */}
        <div className="mb-12">
          <ProductGrid products={products} />
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="px-8 py-6 text-base font-600 rounded-sm"
            style={{
              backgroundColor: '#b8860b', // 10% - Warm copper
              color: '#faf8f3',
              border: 'none',
              cursor: 'pointer',
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
            <Link href="/products">View All Coffee</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}