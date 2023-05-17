export interface CoinbaseCurrency {
  funds: string;
  productId: string;
}

export const coins: CoinbaseCurrency[] = [
  {
    funds: '5.00',
    productId: 'BTC-USD',
  },
];

export interface OrderStatus {
  id: string;
  product_id: string;
  side: string;
  status: string;
  created_at: string;
  filled_size: string;
  size: string;
  type: string;
  price?: string;
}

export interface CoinbaseOrderRequest {
  profile_id?: string;
  type: 'limit' | 'market' | 'stop';
  side: 'buy' | 'sell';
  product_id: string;
  stp?: 'dc' | 'co' | 'cn' | 'cb';
  stop?: 'loss' | 'entry';
  stop_price?: string;
  price?: 'limit' | 'stop';
  size?: string;
  funds?: string;
  time_in_force?: 'GTC' | 'GTT' | 'IOC' | 'FOk';
  cancel_after?: 'min' | 'hour' | 'day';
  post_only?: boolean;
  client_oid?: string;
}
