'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import { useSession } from 'next-auth/react';
import {
  createCart,
  getCart,
  addToCart as shopifyAddToCart,
  updateCartLine,
  removeFromCart as shopifyRemoveFromCart,
  updateCartBuyerIdentity,
  type ShopifyCart,
  type CartLine,
} from '@/lib/shopify/cart';

interface CartItem {
  id: string; // Shopify line ID
  variantId: string;
  productId: string;
  productTitle: string;
  variantTitle: string;
  price: string;
  currencyCode: string;
  quantity: number;
  image?: string;
  handle: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (variantId: string, quantity: number, productData: any) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  checkoutUrl: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Debounce timer ref
  const syncTimeoutRef = useRef<NodeJS.Timeout>();

  // Get storage key
  const getStorageKey = useCallback(() => {
    return session?.user?.id ? `cart-${session.user.id}` : 'cart-guest';
  }, [session?.user?.id]);

  /**
   * Transform Shopify cart to our format
   */
  const transformShopifyCart = useCallback((cart: ShopifyCart): CartItem[] => {
    return cart.lines.map((line) => ({
      id: line.id,
      variantId: line.merchandise.id,
      productId: line.merchandise.product.id,
      productTitle: line.merchandise.product.title,
      variantTitle: line.merchandise.title,
      price: line.merchandise.price.amount,
      currencyCode: line.merchandise.price.currencyCode,
      quantity: line.quantity,
      image: line.merchandise.image?.url,
      handle: line.merchandise.product.handle,
    }));
  }, []);

  /**
   * Load cart from Shopify or localStorage
   */
  const loadCart = useCallback(async () => {
    if (status === 'loading') return;

    const storageKey = getStorageKey();
    const savedCartId = localStorage.getItem(storageKey);

    // Try to load from Shopify first
    if (savedCartId) {
      try {
        const cart = await getCart(savedCartId);
        
        if (cart) {
          setCartId(cart.id);
          setCheckoutUrl(cart.checkoutUrl);
          setItems(transformShopifyCart(cart));
          setIsInitialized(true);
          return;
        }
      } catch (error) {
        console.error('Error loading cart from Shopify:', error);
        // Clear invalid cart ID
        localStorage.removeItem(storageKey);
      }
    }

    // No cart exists yet
    setItems([]);
    setCartId(null);
    setCheckoutUrl(null);
    setIsInitialized(true);
  }, [status, getStorageKey, transformShopifyCart]);

  /**
   * Initialize cart on mount and auth change
   */
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  /**
   * Associate cart with customer on login
   */
  useEffect(() => {
    const associateCart = async () => {
      if (
        status === 'authenticated' &&
        session?.user &&
        cartId &&
        (session.user as any).accessToken &&
        isInitialized
      ) {
        try {
          const cart = await updateCartBuyerIdentity(
            cartId,
            (session.user as any).accessToken
          );
          console.log('✅ Cart associated with customer');
          setCheckoutUrl(cart.checkoutUrl);
        } catch (error) {
          console.error('Error associating cart:', error);
        }
      }
    };

    associateCart();
  }, [status, session, cartId, isInitialized]);

  /**
   * Save cart ID to localStorage
   */
  useEffect(() => {
    if (cartId && isInitialized) {
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, cartId);
    }
  }, [cartId, isInitialized, getStorageKey]);

  /**
   * Add item to cart (optimistic update + background sync)
   */
  const addItem = useCallback(
    async (variantId: string, quantity: number, productData: any) => {
      // Optimistic update
      const tempItem: CartItem = {
        id: `temp-${Date.now()}`,
        variantId,
        productId: productData.productId,
        productTitle: productData.productTitle,
        variantTitle: productData.variantTitle,
        price: productData.price,
        currencyCode: productData.currencyCode,
        quantity,
        image: productData.image,
        handle: productData.handle,
      };

      setItems((prev) => {
        const existing = prev.find((item) => item.variantId === variantId);
        if (existing) {
          return prev.map((item) =>
            item.variantId === variantId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, tempItem];
      });

      // Background Shopify sync
      try {
        let cart: ShopifyCart;

        if (cartId) {
          // Add to existing cart
          cart = await shopifyAddToCart(cartId, [{ merchandiseId: variantId, quantity }]);
        } else {
          // Create new cart
          const buyerIdentity = session?.user
            ? { customerAccessToken: (session.user as any).accessToken }
            : undefined;

          cart = await createCart([{ merchandiseId: variantId, quantity }], buyerIdentity);
          setCartId(cart.id);
        }

        // Update with real data from Shopify
        setItems(transformShopifyCart(cart));
        setCheckoutUrl(cart.checkoutUrl);
      } catch (error) {
        console.error('Error adding to cart:', error);
        // Revert optimistic update on error
        setItems((prev) => prev.filter((item) => item.id !== tempItem.id));
        throw error;
      }
    },
    [cartId, session, transformShopifyCart]
  );

  /**
   * Update quantity (optimistic + debounced sync)
   */
  const updateQuantity = useCallback(
    async (lineId: string, newQuantity: number) => {
      if (!cartId) return;

      // Optimistic update
      setItems((prev) =>
        prev.map((item) =>
          item.id === lineId ? { ...item, quantity: newQuantity } : item
        )
      );

      // Debounced sync to Shopify
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }

      syncTimeoutRef.current = setTimeout(async () => {
        try {
          const cart = await updateCartLine(cartId, lineId, newQuantity);
          setItems(transformShopifyCart(cart));
          setCheckoutUrl(cart.checkoutUrl);
        } catch (error) {
          console.error('Error updating quantity:', error);
          // Reload cart to get correct state
          await loadCart();
        }
      }, 500); // 500ms debounce
    },
    [cartId, transformShopifyCart, loadCart]
  );

  /**
   * Remove item (optimistic + background sync)
   */
  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return;

      // Optimistic update
      setItems((prev) => prev.filter((item) => item.id !== lineId));

      // Background sync
      try {
        const cart = await shopifyRemoveFromCart(cartId, [lineId]);
        setItems(transformShopifyCart(cart));
        setCheckoutUrl(cart.checkoutUrl);
      } catch (error) {
        console.error('Error removing item:', error);
        await loadCart();
      }
    },
    [cartId, transformShopifyCart, loadCart]
  );

  /**
   * Clear cart
   */
  const clearCart = useCallback(async () => {
    setItems([]);
    setCartId(null);
    setCheckoutUrl(null);
    
    const storageKey = getStorageKey();
    localStorage.removeItem(storageKey);
  }, [getStorageKey]);

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isLoading,
        checkoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}