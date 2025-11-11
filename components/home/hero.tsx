'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, descriptionRef.current, buttonsRef.current, indicatorsRef.current], {
        opacity: 0,
        y: 30,
      });

      // Staggered animation on mount
      gsap.to([titleRef.current, descriptionRef.current, buttonsRef.current, indicatorsRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
          markers: false,
        },
        y: 50,
        opacity: 0.8,
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#faf8f3', // 60% - Warm cream (primary background)
      }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading with premium serif font */}
          <h1
            ref={titleRef}
            className="mb-8 leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#3d2817', // 30% - Deep brown (primary text)
            }}
          >
            Start Your Day,{' '}
            <span
              style={{
                color: '#b8860b', // 10% - Warm copper accent
              }}
            >
              Elevated
            </span>
          </h1>

          {/* Subtitle with refined typography */}
          <p
            ref={descriptionRef}
            className="mb-12"
            style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
              fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
              lineHeight: 1.6,
              letterSpacing: '0.01em',
              color: '#6b5449', // Muted brown
              maxWidth: '580px',
              margin: '0 auto',
            }}
          >
            Exceptional single-origin coffee, ethically sourced and freshly roasted. Delivered to your door exactly when you need it.
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 md:mb-20"
          >
            <Button
              asChild
              size="lg"
              className="px-8 py-6 text-base font-600 rounded-sm"
              style={{
                backgroundColor: '#b8860b', // 10% - Warm copper
                color: '#faf8f3', // Cream text
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
              <Link href="/products">Shop Coffee</Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="px-8 py-6 text-base font-600 rounded-sm"
              style={{
                backgroundColor: 'transparent',
                color: '#3d2817',
                border: '2px solid #3d2817',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
              <Link href="/quiz">Find Your Roast</Link>
            </Button>
          </div>

          {/* Trust indicators with refined styling */}
          <div
            ref={indicatorsRef}
            className="flex flex-wrap justify-center gap-6 sm:gap-12 text-sm"
            style={{
              color: '#6b5449',
              fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="font-500">Direct Trade</span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="font-500">Freshly Roasted</span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="font-500">Free Shipping $30+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-70"
        style={{ animation: 'bounce 2s infinite' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3d2817" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(8px);
          }
        }
      `}</style>
    </section>
  );
}