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

export interface OrderResponseStatus {
  success: boolean;
  failure_reason: 'string';
  order_id: 'string';
  success_response: {
    order_id: 'string';
    product_id: 'string';
    side: 'string';
    client_order_id: 'string';
  };
  error_response?: {
    error: 'string';
    message: 'string';
    error_details: 'string';
    preview_failure_reason: 'string';
    new_order_failure_reason: 'string';
  };
  order_configuration: {
    market_market_ioc: {
      quote_size: 'string';
      base_size: 'string';
    };
  };
}
