// pocketbase record id
export interface Id {
  id: string;
  '@collectionId': string;
  '@collectionName': string;
  created: string;
  updated: string;
  username?: string;
  name?: string;
  verified: boolean;
  emailVisibility: boolean;
  posts?: string[];
}

export interface NewUser {
  email: string;
  token?: string;
}

// user type
export type User = Id & NewUser;

export interface CollectionId {
  id: string;
  '@collectionId': string;
  '@collectionName': string;
  created: string;
  updated: string;
}

export type exchangeType =
  | 'coinbase'
  | 'binance'
  | 'kraken'
  | 'bitstamp'
  | 'gemini';

export const assets = [
  'BTC',
  'ETH',
  'ADA',
  'SOL',
  'MATIC',
] as const;

type assetType = typeof assets[number];

export interface NewPurchaseOrder {
  exchange: exchangeType;
  asset: assetType;
  amount: number;
  amount_purchased: number;
}

export interface PurchaseOrderPayload {
  exchange: exchangeType;
  asset: assetType;
  amount: number;
}

// user purchase order
export type PurchaseOrder = CollectionId & NewPurchaseOrder;

// the is structure pocketbase will return
export type PaginationData<T> = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
};
