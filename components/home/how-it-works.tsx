'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      number: '01',
      title: 'Choose Your Coffee',
      description: 'Browse our selection of single-origin beans or take our quiz to find your perfect match.',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0010.5 10.5z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'We Roast Fresh',
      description: 'Your beans are roasted to order, ensuring peak flavor and freshness in every cup.',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Delivered Fast',
      description: 'Receive your coffee within days of roasting. Set up a subscription or order one-time.',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section heading
      gsap.from(containerRef.current?.querySelector('h2'), {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from(containerRef.current?.querySelector('p'), {
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

      // Stagger step cards animation
      stepsRef.current.forEach((step, index) => {
        if (!step) return;

        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
          },
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: 'back.out(1.2)',
          delay: index * 0.15,
        });

        // Hover effect
        step.addEventListener('mouseenter', () => {
          gsap.to(step, {
            y: -8,
            boxShadow: '0 20px 40px rgba(61, 40, 23, 0.12)',
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        step.addEventListener('mouseleave', () => {
          gsap.to(step, {
            y: 0,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 lg:py-40"
      style={{
        backgroundColor: '#faf8f3', // 60% - Warm cream background
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section heading */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
          <h2
            className="mb-6"
            style={{
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              color: '#3d2817', // 30% - Deep brown
            }}
          >
            How It Works
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
              lineHeight: 1.6,
              letterSpacing: '0.01em',
              color: '#6b5449', // Muted brown
            }}
          >
            From bean to cup in three simple steps
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => {
                if (el) stepsRef.current[index] = el;
              }}
              className="p-8 lg:p-10 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Icon */}
              <div
                className="mb-6 inline-block p-4 rounded-lg"
                style={{
                  color: '#b8860b', // 10% - Warm copper accent
                  backgroundColor: 'rgba(184, 134, 11, 0.08)',
                }}
              >
                {step.icon}
              </div>

              {/* Step number and title */}
              <div className="mb-4">
                <p
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: '#b8860b', // Copper accent
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Step {step.number}
                </p>
                <h3
                  style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                    fontFamily: '"Playfair Display", "Georgia", serif',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: '#3d2817', // Deep brown
                  }}
                >
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '1rem',
                  fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
                  lineHeight: 1.6,
                  letterSpacing: '0.01em',
                  color: '#6b5449', // Muted brown
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative line between steps */}
        <div
          className="hidden md:block absolute left-1/3 top-1/2 w-1/3 h-px"
          style={{
            backgroundColor: 'rgba(184, 134, 11, 0.1)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  );
}