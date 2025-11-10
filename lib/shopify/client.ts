import { GraphQLClient } from 'graphql-request';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!domain || !storefrontAccessToken) {
  throw new Error('Missing Shopify environment variables');
}

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    'Content-Type': 'application/json',
  },
});

/**
 * Type-safe GraphQL request wrapper
 */
export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
  tags,
}: {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<T> {
  try {
    const data = await shopifyClient.request<T>(query, variables);
    return data;
  } catch (error) {
    console.error('Shopify GraphQL Error:', error);
    throw error;
  }
}