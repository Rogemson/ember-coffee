'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/dist/ScrollSmoother';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Hero } from '@/components/home/hero';
import { FeaturedProducts } from '@/components/home/featured-products';
import { HowItWorks } from '@/components/home/how-it-works';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function HomePage({ featuredProducts = [] }: { featuredProducts?: any[] }) {
  useEffect(() => {
    // Initialize ScrollSmoother for smooth scrolling
    let smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1, // 1 second smooth animation
      effects: true,
      onUpdate: (smoother) => {
        // Optional: trigger updates as user scrolls
      },
    });

    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {/* Hero Section */}
        <Hero />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && <FeaturedProducts products={featuredProducts} />}

        {/* Newsletter CTA Section */}
        <section
          className="py-24 md:py-32"
          style={{
            backgroundColor: '#3d2817', // Deep brown accent section
          }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: '#faf8f3', // Cream text
                  marginBottom: '1.5rem',
                }}
              >
                Join Our Coffee Community
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
                  lineHeight: 1.6,
                  letterSpacing: '0.01em',
                  color: '#d4c5b0', // Light brown/cream
                  marginBottom: '2rem',
                }}
              >
                Get brewing tips, new roast announcements, and exclusive offers delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    backgroundColor: '#faf8f3',
                    color: '#3d2817',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
                    fontSize: '1rem',
                  }}
                  className="placeholder-gray-400"
                />
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#b8860b', // Copper accent
                    color: '#faf8f3',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
                    fontSize: '1rem',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#9a6f0a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#b8860b';
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-12 md:py-16"
          style={{
            backgroundColor: '#2a1f17',
            color: '#d4c5b0',
            borderTop: '1px solid rgba(184, 134, 11, 0.2)',
          }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontFamily: '"Playfair Display", "Georgia", serif',
                    fontWeight: 700,
                    color: '#faf8f3',
                    marginBottom: '1rem',
                  }}
                >
                  Ember Coffee Co.
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                  Exceptional coffee, ethically sourced and freshly roasted for the discerning palate.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#faf8f3',
                    marginBottom: '1rem',
                  }}
                >
                  Shop
                </h4>
                <ul style={{ fontSize: '0.875rem', lineHeight: 2 }}>
                  <li><a href="#" style={{ color: '#d4c5b0', textDecoration: 'none' }}>All Coffee</a></li>
                  <li><a href="#" style={{ color: '#d4c5b0', textDecoration: 'none' }}>Subscriptions</a></li>
                  <li><a href="#" style={{ color: '#d4c5b0', textDecoration: 'none' }}>Brewing Guides</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#faf8f3',
                    marginBottom: '1rem',
                  }}
                >
                  Company
                </h4>
                <ul style={{ fontSize: '0.875rem', lineHeight: 2 }}>
                  <li><a href="#" style={{ color: '#d4c5b0', textDecoration: 'none' }}>About</a></li>
                  <li><a href="#" style={{ color: '#d4c5b0', textDecoration: 'none' }}>Our Story</a></li>
                  <li><a href="#" style={{ color: '#d4c5b0', textDecoration: 'none' }}>Contact</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#faf8f3',
                    marginBottom: '1rem',
                  }}
                >
                  Legal
                </h4>
                <ul style={{ fontSize: '0.875rem', lineHeight: 2 }}>
                  <li><a href="#" style={{ color: '#d4c5b0', textDecoration: 'none' }}>Privacy</a></li>
                  <li><a href="#" style={{ color: '#d4c5b0', textDecoration: 'none' }}>Terms</a></li>
                  <li><a href="#" style={{ color: '#d4c5b0', textDecoration: 'none' }}>Shipping</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="pt-8 border-t"
              style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}
            >
              <p style={{ fontSize: '0.875rem', textAlign: 'center' }}>
                &copy; 2025 Ember Coffee Co. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}