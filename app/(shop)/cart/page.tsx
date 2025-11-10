import { CartPageContent } from '@/components/cart/cart-page';

export const metadata = {
  title: 'Shopping Cart - Ember Coffee Co.',
  description: 'Review your cart and checkout',
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold text-[#3E2723]">Shopping Cart</h1>
      <CartPageContent />
    </div>
  );
}