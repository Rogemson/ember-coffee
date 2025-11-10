'use client';

import { ReactNode } from 'react';
import { ShopLayout } from '@/components/layout/shop-layout';

export function Providers({ children }: { children: ReactNode }) {
  return <ShopLayout>{children}</ShopLayout>;
}