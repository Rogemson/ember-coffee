'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { siteConfig } from '@/config/site';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer columns on scroll into view
      columnsRef.current.forEach((column, index) => {
        if (!column) return;

        gsap.from(column, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
          delay: index * 0.1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const footerLinks = {
    Shop: [
      { label: 'All Coffee', href: '/products' },
      { label: 'Subscriptions', href: '/subscriptions' },
      { label: 'Brewing Guides', href: '/guides' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/story' },
      { label: 'Contact', href: '/contact' },
    ],
    Support: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer
      ref={containerRef}
      className="mt-24 md:mt-32 lg:mt-40"
      style={{
        backgroundColor: '#2a1f17', // Dark brown
        color: '#d4c5b0',
        borderTop: '1px solid rgba(184, 134, 11, 0.2)',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-20">
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-5 gap-12 md:gap-8 mb-16">
          {/* Brand Column */}
          <div
            ref={(el) => {
              columnsRef.current[0] = el;
            }}
            className="md:col-span-1"
          >
            <h3
              style={{
                fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontWeight: 700,
                color: '#faf8f3',
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}
            >
              {siteConfig.name}
            </h3>
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: '#d4c5b0',
                marginBottom: '1.5rem',
              }}
            >
              Exceptional coffee, ethically sourced and freshly roasted for the discerning palate.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: 'Instagram', href: '#' },
                { icon: 'Facebook', href: '#' },
                { icon: 'Twitter', href: '#' },
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: 'rgba(184, 134, 11, 0.1)',
                    color: '#b8860b',
                  }}
                  aria-label={social.icon}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Columns */}
          {Object.entries(footerLinks).map(([title, links], colIndex) => (
            <div
              key={title}
              ref={(el) => {
                columnsRef.current[colIndex + 1] = el;
              }}
            >
              <h4
                style={{
                  fontSize: '0.875rem',
                  fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#faf8f3',
                  marginBottom: '1.25rem',
                }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block hover:text-copper transition-colors duration-300"
                      style={{
                        fontSize: '0.95rem',
                        color: '#d4c5b0',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                          color: '#b8860b',
                          x: 4,
                          duration: 0.3,
                        });
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, {
                          color: '#d4c5b0',
                          x: 0,
                          duration: 0.3,
                        });
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div
          className="mb-16 p-8 lg:p-10 rounded-lg"
          style={{
            backgroundColor: 'rgba(184, 134, 11, 0.08)',
            borderLeft: '4px solid #b8860b',
          }}
        >
          <h3
            style={{
              fontSize: '1.125rem',
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontWeight: 700,
              color: '#faf8f3',
              marginBottom: '0.5rem',
            }}
          >
            Stay Updated
          </h3>
          <p
            style={{
              fontSize: '0.95rem',
              color: '#d4c5b0',
              marginBottom: '1rem',
            }}
          >
            Get brewing tips and new roast announcements delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              required
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                backgroundColor: '#3d2817',
                color: '#faf8f3',
                border: '1px solid rgba(184, 134, 11, 0.2)',
                borderRadius: '0.25rem',
                fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
                fontSize: '0.95rem',
              }}
              className="placeholder-gray-500"
            />
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#b8860b',
                color: '#faf8f3',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
                fontSize: '0.95rem',
                transition: 'background-color 0.3s ease',
                whiteSpace: 'nowrap',
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
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            borderColor: 'rgba(184, 134, 11, 0.2)',
          }}
        >
          <p
            style={{
              fontSize: '0.875rem',
              color: '#b8860b',
              margin: 0,
            }}
          >
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            <span
              style={{
                fontSize: '0.875rem',
                color: '#d4c5b0',
              }}
            >
              Accepted Payments:
            </span>
            <div className="flex gap-3">
              {['Visa', 'Mastercard', 'PayPal'].map((method) => (
                <div
                  key={method}
                  className="flex items-center justify-center w-10 h-6 rounded"
                  style={{
                    backgroundColor: 'rgba(184, 134, 11, 0.1)',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    color: '#b8860b',
                  }}
                >
                  {method.substring(0, 2)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative top border */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #b8860b, transparent)',
        }}
      />
    </footer>
  );
}