export interface CoinbaseCurrency {
  funds: string;
  productId: string;
}

export const coins: CoinbaseCurrency[] = [
  {
    funds: '30.00',
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

export type ListFilledOrderResponse = {
  orders: FilledOrder[];
};

export type FilledOrder = {
  order_id: string;
  product_id: string;
  user_id: string;
  order_configuration: {
    limit_limit_gtc: {
      base_size: string;
      limit_price: string;
      post_only: true;
    };
  };
  side: 'BUY' | 'SELL';
  client_order_id: string;
  status: 'FILLED';
  time_in_force:
  | 'GOOD_UNTIL_CANCELLED'
  | 'IMMEDIATE_OR_CANCEL'
  | 'FILL_OR_KILL'
  | 'UNKNOWN_TIME_IN_FORCE'
  | 'GOOD_UNTIL_DATE_TIME';
  created_time: string;
  completion_percentage: string;
  filled_size: string;
  average_filled_price: string;
  fee: string;
  number_of_fills: string;
  filled_value: string;
  pending_cancel: false;
  size_in_quote: false;
  total_fees: string;
  size_inclusive_of_fees: false;
  total_value_after_fees: string;
  trigger_status:
  | 'INVALID_ORDER_TYPE'
  | 'UNKNOWN_TRIGGER_STATUS'
  | 'STOP_PENDING'
  | 'STOP_TRIGGERED';
  order_type: 'LIMIT' | 'MARKET' | 'STOP' | 'STOP_LIMIT' | 'UNKNOWN_ORDER_TYPE';
  reject_reason: 'REJECT_REASON_UNSPECIFIED';
  settled: true;
  product_type: 'SPOT' | 'FUTURE';
  reject_message: string;
  cancel_message: string;
  order_placement_source: 'RETAIL_ADVANCED' | 'RETAIL_SIMPLE';
  outstanding_hold_amount: string;
  is_liquidation: false;
  last_fill_time: string;
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
  amount: number;
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
