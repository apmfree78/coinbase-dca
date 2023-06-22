export interface CoinbaseCurrency {
  funds: string;
  productId: string;
}

export const coins: CoinbaseCurrency[] = [
  {
    funds: '10.00',
    productId: 'BTC-USD',
  },
];

export type AccountStatusSuccessResponse = {
  name: string;
  active: boolean;
  balance: string;
};

export type PriceData = {
  product_id: string;
  price: string;
  price_percentage_change_24h: string;
  volume_24h: string;
  volume_percentage_change_24h: string;
  base_increment: string;
  quote_increment: string;
  quote_min_size: string;
  quote_max_size: string;
  base_min_size: string;
  base_max_size: string;
  base_name: string;
  quote_name: string;
  watched: boolean;
  is_disabled: boolean;
  new: boolean;
  status: string;
  cancel_only: boolean;
  limit_only: boolean;
  post_only: boolean;
  trading_disabled: boolean;
  auction_mode: boolean;
  product_type: string;
  quote_currency_id: string;
  base_currency_id: string;
  mid_market_price: string;
  base_display_symbol: string;
  quote_display_symbol: string;
};

export type PriceDataSuccessResponse = {
  product_id: string;
  price: number;
};

export interface CoinbaseOrderRequest {
  client_order_id: string;
  side: 'BUY' | 'SELL';
  product_id: string;
  order_configuration: {
    market_market_ioc?: {
      quote_size?: string; // required for BUY order
      base_size?: string; // required for SELL order
    };
    limit_limit_gtc?: {
      base_size?: string; // required for BUY order
      limit_price?: string; // required for SELL order
      post_only?: boolean;
    };
  };
}

export type LimitOrderSubmitted = {
  order_id: string;
  product_id: string;
  limit_price: number;
  success_message: string;
};

export interface OrderResponseError {
  error: string;
  message: string;
  error_details: string;
  preview_failure_reason: string;
  new_order_failure_reason: string;
}

export interface OrderResponseSuccess {
  success: boolean;
  failure_reason: string;
  order_id: string;
  success_response: {
    order_id: string;
    product_id: string;
    side: string;
    client_order_id: string;
  };
  order_configuration: {
    market_market_ioc?: {
      quote_size: string;
      base_size?: string;
    };
    limit_limit_gtc?: {
      base_size: string; // required for BUY order
      limit_price: string; // required for SELL order
      post_only?: boolean;
    };
  };
}

export interface AccountStatus {
  accounts: {
    uuid: string;
    name: string;
    currency: string;
    available_balance: {
      value: string;
      currency: string;
    };
    default: boolean;
    active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    type: string;
    ready: boolean;
    hold?: {
      value: string;
      currency: string;
    };
  }[];
  has_next: boolean;
  cursor: string;
  size: string;
}
