import { shopifyClient } from './client';
import {
  CREATE_CART_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  GET_CART_QUERY,
  CART_BUYER_IDENTITY_UPDATE_MUTATION,
} from './mutations';

export interface CartLine {
  id: string;
  quantity: number;
  merchandiseId: string;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      title: string;
      handle: string;
    };
    image?: {
      url: string;
      altText?: string;
    };
    price: {
      amount: string;
      currencyCode: string;
    };
    selectedOptions: {
      name: string;
      value: string;
    }[];
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: CartLine[];
  buyerIdentity?: {
    email?: string;
    customer?: {
      id: string;
      email: string;
    };
  };
}

/**
 * Transform Shopify cart response to our format
 */
function transformCart(shopifyCart: any): ShopifyCart {
  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    totalQuantity: shopifyCart.totalQuantity,
    cost: shopifyCart.cost,
    lines: shopifyCart.lines.edges.map((edge: any) => ({
      id: edge.node.id,
      quantity: edge.node.quantity,
      merchandiseId: edge.node.merchandise.id,
      cost: edge.node.cost,
      merchandise: edge.node.merchandise,
    })),
    buyerIdentity: shopifyCart.buyerIdentity,
  };
}

/**
 * Create a new cart
 */
export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = [],
  buyerIdentity?: { customerAccessToken?: string; email?: string }
): Promise<ShopifyCart> {
  try {
    const data: any = await shopifyClient.request(CREATE_CART_MUTATION, {
      input: {
        lines: lines.map((line) => ({
          merchandiseId: line.merchandiseId,
          quantity: line.quantity,
        })),
        buyerIdentity,
      },
    });

    if (data.cartCreate.userErrors.length > 0) {
      throw new Error(data.cartCreate.userErrors[0].message);
    }

    return transformCart(data.cartCreate.cart);
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
}

/**
 * Get cart by ID
 */
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    const data: any = await shopifyClient.request(GET_CART_QUERY, {
      cartId,
    });

    if (!data.cart) {
      return null;
    }

    return transformCart(data.cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

/**
 * Add lines to cart
 */
export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  try {
    const data: any = await shopifyClient.request(CART_LINES_ADD_MUTATION, {
      cartId,
      lines: lines.map((line) => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
      })),
    });

    if (data.cartLinesAdd.userErrors.length > 0) {
      throw new Error(data.cartLinesAdd.userErrors[0].message);
    }

    return transformCart(data.cartLinesAdd.cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

/**
 * Update cart line quantity
 */
export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  try {
    const data: any = await shopifyClient.request(CART_LINES_UPDATE_MUTATION, {
      cartId,
      lines: [{ id: lineId, quantity }],
    });

    if (data.cartLinesUpdate.userErrors.length > 0) {
      throw new Error(data.cartLinesUpdate.userErrors[0].message);
    }

    return transformCart(data.cartLinesUpdate.cart);
  } catch (error) {
    console.error('Error updating cart line:', error);
    throw error;
  }
}

/**
 * Remove lines from cart
 */
export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  try {
    const data: any = await shopifyClient.request(CART_LINES_REMOVE_MUTATION, {
      cartId,
      lineIds,
    });

    if (data.cartLinesRemove.userErrors.length > 0) {
      throw new Error(data.cartLinesRemove.userErrors[0].message);
    }

    return transformCart(data.cartLinesRemove.cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}

/**
 * Associate cart with customer
 */
export async function updateCartBuyerIdentity(
  cartId: string,
  customerAccessToken: string
): Promise<ShopifyCart> {
  try {
    const data: any = await shopifyClient.request(
      CART_BUYER_IDENTITY_UPDATE_MUTATION,
      {
        cartId,
        buyerIdentity: {
          customerAccessToken,
        },
      }
    );

    if (data.cartBuyerIdentityUpdate.userErrors.length > 0) {
      throw new Error(data.cartBuyerIdentityUpdate.userErrors[0].message);
    }

    return transformCart(data.cartBuyerIdentityUpdate.cart);
  } catch (error) {
    console.error('Error updating cart buyer identity:', error);
    throw error;
  }
}