'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/contexts/cart-context';
import { Header } from './header';
import { Footer } from './footer';

export function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}