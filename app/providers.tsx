'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ShopLayout } from '@/components/layout/shop-layout';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ShopLayout>{children}</ShopLayout>
    </SessionProvider>
  );
}