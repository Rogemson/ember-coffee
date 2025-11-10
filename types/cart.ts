import { ShopifyMoney, ShopifyImage } from './products';

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
    };
    image?: ShopifyImage;
    price: ShopifyMoney;
    selectedOptions: {
      name: string;
      value: string;
    }[];
  };
  cost: {
    totalAmount: ShopifyMoney;
  };
  attributes: {
    key: string;
    value: string;
  }[];
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
    totalTaxAmount?: ShopifyMoney;
  };
  lines: CartLine[];
  totalQuantity: number;
}

export interface CartAction {
  type: 'ADD' | 'UPDATE' | 'REMOVE';
  payload?: any;
}