export type Membership = 'free' | 'silver' | 'gold' | 'platinum';
export type Status = 'active' | 'suspended';

export const exchanges = [
  'coinbase',
  'binance',
  'kraken',
  'bitstamp',
  'gemini',
] as const;

export type exchangeType = typeof exchanges[number];

export const assets = ['BTC', 'ETH', 'ADA', 'SOL', 'MATIC'] as const;

export type assetType = typeof assets[number];

// pocketbase record id
export interface Id {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  username?: string;
  name?: string;
  verified: boolean;
  emailVisibility: boolean;
}

export interface NewPurchaseOrder {
  exchange: exchangeType;
  asset: assetType;
  amount: number;
  amount_purchased?: number;
  owner: string;
}

export type CollectionId = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
};

// user purchase order
export type PurchaseOrder = CollectionId & NewPurchaseOrder;

export interface NewUser {
  email: string;
  token: string;
  dca_orders?: string[];
  expand?: { dca_orders: PurchaseOrder[] };
  membership: Membership;
  submitted_orders?: string[];
  status: Status;
}

// user type
export type User = Id & NewUser;

export type AbbreviatedUserWithOrders = { id: string } & Omit<NewUser, 'token'>;

export type PatchUserPayload = {
  username?: string;
  email?: string;
  name?: string;
  verified?: boolean;
  emailVisibility?: boolean;
  dca_orders?: string[];
  membership: Membership;
  submitted_orders?: string[];
  status: Status;
};

export interface AdminResponse {
  token: string;
  admin: {
    id: string;
    created: string;
    updated: string;
    email: string;
  };
}

type OptionalSubmittedOrderFields = {
  owner?: string;
  isFilled?: boolean;
};

export type PostSubmittedOrderPayload = {
  order_id: string;
  product_id: string;
  exchange: exchangeType;
  limit_price: number;
  owner: string;
  isFilled: boolean;
  amount: number;
};

export type PatchSubmittedOrderPayload = PostSubmittedOrderPayload &
  OptionalSubmittedOrderFields;

export type SubmittedOrder = CollectionId & PostSubmittedOrderPayload;
export type PostSubmittedResponse = SubmittedOrder;

export interface PostOrderPayload {
  exchange: exchangeType;
  asset: assetType;
  amount: number;
}

export type PatchOrderPayload = PostOrderPayload & {
  owner: string;
};

// the is structure pocketbase will return
export type PaginationData<T> = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
};
