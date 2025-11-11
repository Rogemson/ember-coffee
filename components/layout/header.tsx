'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { gsap } from 'gsap';
import { navConfig, siteConfig } from '@/config/site';
import { useCart } from '@/contexts/cart-context';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { SearchBar } from '@/components/search/search-bar';

// Fallback nav items if config is not properly structured
const defaultNav = [
  { title: 'Shop', href: '/products' },
  { title: 'About', href: '/about' },
  { title: 'Find Your Roast', href: '/quiz' },
  { title: 'Subscriptions', href: '/subscriptions' },
];

export function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  const headerRef = useRef<HTMLHeadElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Get nav items from config, handling the nested structure
  // navConfig.mainNav is an array, use it; otherwise fallback
  const navItems = navConfig?.mainNav && Array.isArray(navConfig.mainNav) 
    ? navConfig.mainNav 
    : defaultNav;

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);

      if (headerRef.current) {
        gsap.to(headerRef.current, {
          boxShadow: scrolled
            ? '0 4px 12px rgba(0, 0, 0, 0.08)'
            : '0 0px 0px rgba(0, 0, 0, 0)',
          duration: 0.3,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }
  }, [mobileMenuOpen]);

  // Nav item hover animation
  const handleNavHover = (index: number, isEnter: boolean) => {
    if (navItemsRef.current[index]) {
      gsap.to(navItemsRef.current[index], {
        color: isEnter ? '#b8860b' : '#3d2817',
        duration: 0.3,
      });
    }
  };

  return (
    <>
      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      {/* Header */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: '#faf8f3', // 60% - Cream
          borderBottom: '1px solid rgba(184, 134, 11, 0.1)',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 py-4 md:py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="shrink-0"
              style={{
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: '#3d2817', // 30% - Deep brown
              }}
            >
              {siteConfig.name}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(el) => {
                    navItemsRef.current[index] = el;
                  }}
                  onMouseEnter={() => handleNavHover(index, true)}
                  onMouseLeave={() => handleNavHover(index, false)}
                  style={{
                    fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    color: '#3d2817',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    paddingBottom: '4px',
                  }}
                >
                  {item.title}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '0px',
                      left: 0,
                      width: '0%',
                      height: '2px',
                      backgroundColor: '#b8860b',
                    }}
                  />
                </Link>
              ))}
            </nav>

            {/* Right Section - Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <SearchBar />

              {/* Cart Icon */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:opacity-70 transition-opacity"
                style={{
                  color: '#3d2817',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
                aria-label="Open cart"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {totalItems > 0 && (
                  <span
                    className="absolute top-0 right-0 flex items-center justify-center text-xs font-bold rounded-full w-5 h-5"
                    style={{
                      backgroundColor: '#b8860b', // 10% - Copper
                      color: '#faf8f3',
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2 hover:opacity-70 transition-opacity"
                  style={{
                    color: '#3d2817',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  aria-label="User menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden z-50"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(184, 134, 11, 0.1)',
                    }}
                  >
                    {session ? (
                      <>
                        <div
                          className="px-4 py-3 border-b"
                          style={{
                            borderColor: 'rgba(184, 134, 11, 0.1)',
                            backgroundColor: '#faf8f3',
                          }}
                        >
                          <p
                            style={{
                              fontSize: '0.875rem',
                              color: '#6b5449',
                              margin: 0,
                            }}
                          >
                            {session.user?.email}
                          </p>
                        </div>
                        <Link
                          href="/account"
                          className="block px-4 py-3 hover:opacity-70 transition-opacity"
                          style={{
                            fontSize: '0.95rem',
                            color: '#3d2817',
                            textDecoration: 'none',
                          }}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-3 hover:opacity-70 transition-opacity"
                          style={{
                            fontSize: '0.95rem',
                            color: '#3d2817',
                            textDecoration: 'none',
                          }}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Orders
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:opacity-70 transition-opacity border-t"
                          style={{
                            fontSize: '0.95rem',
                            color: '#b8860b',
                            borderColor: 'rgba(184, 134, 11, 0.1)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderTop: '1px solid rgba(184, 134, 11, 0.1)',
                            cursor: 'pointer',
                          }}
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="block px-4 py-3 hover:opacity-70 transition-opacity"
                          style={{
                            fontSize: '0.95rem',
                            color: '#3d2817',
                            textDecoration: 'none',
                          }}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          className="block px-4 py-3 hover:opacity-70 transition-opacity border-t"
                          style={{
                            fontSize: '0.95rem',
                            color: '#b8860b',
                            borderColor: 'rgba(184, 134, 11, 0.1)',
                            textDecoration: 'none',
                          }}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                color: '#3d2817',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className="overflow-hidden md:hidden"
            style={{
              height: 0,
              opacity: 0,
            }}
          >
            <nav className="pt-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#3d2817',
                    textDecoration: 'none',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(184, 134, 11, 0.1)',
                  }}
                >
                  {item.title}
                </Link>
              ))}

              <div className="pt-4 flex gap-4 border-t" style={{ borderColor: 'rgba(184, 134, 11, 0.1)' }}>
                <button
                  onClick={() => {
                    setCartOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 px-4 rounded-sm transition-all"
                  style={{
                    backgroundColor: '#b8860b',
                    color: '#faf8f3',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", sans-serif',
                  }}
                >
                  Cart {totalItems > 0 && `(${totalItems})`}
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[72px] md:h-[76px]" />
    </>
  );
}