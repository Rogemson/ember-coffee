import { shopifyClient } from './client';
import {
  CREATE_CUSTOMER_MUTATION,
  CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
  GET_CUSTOMER_QUERY,
  CART_BUYER_IDENTITY_UPDATE_MUTATION,
} from './mutations';

interface CustomerCreateInput {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}

interface CustomerAccessTokenInput {
  email: string;
  password: string;
}

/**
 * Create a new Shopify customer account
 */
export async function createShopifyCustomer(input: CustomerCreateInput) {
  try {
    const data: any = await shopifyClient.request(CREATE_CUSTOMER_MUTATION, {
      input: {
        email: input.email,
        password: input.password,
        firstName: input.firstName,
        lastName: input.lastName || '',
        acceptsMarketing: false,
      },
    });

    if (data.customerCreate.customerUserErrors.length > 0) {
      const error = data.customerCreate.customerUserErrors[0];
      throw new Error(error.message);
    }

    return data.customerCreate.customer;
  } catch (error) {
    console.error('Error creating Shopify customer:', error);
    throw error;
  }
}

/**
 * Login customer and get access token
 */
export async function loginShopifyCustomer(input: CustomerAccessTokenInput) {
  try {
    const data: any = await shopifyClient.request(
      CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
      {
        input: {
          email: input.email,
          password: input.password,
        },
      }
    );

    if (data.customerAccessTokenCreate.customerUserErrors.length > 0) {
      const error = data.customerAccessTokenCreate.customerUserErrors[0];
      throw new Error(error.message);
    }

    return data.customerAccessTokenCreate.customerAccessToken;
  } catch (error) {
    console.error('Error logging in Shopify customer:', error);
    throw error;
  }
}

/**
 * Get customer data using access token
 */
export async function getShopifyCustomer(accessToken: string) {
  try {
    const data: any = await shopifyClient.request(GET_CUSTOMER_QUERY, {
      customerAccessToken: accessToken,
    });

    return data.customer;
  } catch (error) {
    console.error('Error fetching Shopify customer:', error);
    throw error;
  }
}

/**
 * Associate cart with logged-in customer
 */
export async function associateCartWithCustomer(
  cartId: string,
  customerAccessToken: string
) {
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
      const error = data.cartBuyerIdentityUpdate.userErrors[0];
      throw new Error(error.message);
    }

    return data.cartBuyerIdentityUpdate.cart;
  } catch (error) {
    console.error('Error associating cart with customer:', error);
    throw error;
  }
}

/**
 * Store cart ID in customer metafield
 * Note: This requires Shopify Plus or custom app with metafield access
 * For non-Plus stores, we'll use a different approach
 */
export async function saveCustomerCartId(
  customerAccessToken: string,
  cartId: string
): Promise<void> {
  try {
    // Note: Customer metafields require Shopify Plus
    // For now, we'll handle this differently
    console.log('Cart ID would be saved to customer:', cartId);
  } catch (error) {
    console.error('Error saving cart ID:', error);
  }
}