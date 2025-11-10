export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: ShopifyMoney;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image?: ShopifyImage;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  tags: string[]; // Always an array (even if empty)
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  images: ShopifyImage[]; // Always an array (even if empty)
  variants: ProductVariant[];
  availableForSale: boolean;
  options?: {
    id: string;
    name: string;
    values: string[];
  }[];
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ShopifyImage;
}

export type RoastLevel = 'light' | 'medium' | 'medium-dark' | 'dark';
export type BrewMethod = 'pour-over' | 'french-press' | 'espresso' | 'drip' | 'cold-brew';

export interface CoffeeMetadata {
  roastLevel: RoastLevel;
  origin: string;
  tastingNotes: string[];
  brewMethods: BrewMethod[];
  processingMethod: string;
  elevation: string;
}