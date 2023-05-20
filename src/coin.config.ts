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

export interface CoinbaseOrderRequest {
  client_order_id: string;
  side: 'BUY' | 'SELL';
  product_id: string;
  order_configuration: {
    market_market_ioc: {
      quote_size?: string; // required for BUY order
      base_size?: string; // required for SELL order
    };
  };
}

export interface OrderResponseError {
  error: 'string';
  message: 'string';
  error_details: 'string';
  preview_failure_reason: 'string';
  new_order_failure_reason: 'string';
}

export interface OrderResponseSuccess {
  order_id: 'string';
  product_id: 'string';
  side: 'string';
  client_order_id: 'string';
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
    hold: {
      value: string;
      currency: string;
    };
  };
  has_next: boolean;
  cursor: string;
  size: string;
}
