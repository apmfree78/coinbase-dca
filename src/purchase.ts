import axios, {AxiosResponse} from 'axios';
import {v4 as uuidv4} from 'uuid';
import {axiosInstance} from './axios/config';
import {AppResult, AppState, panic, sleep} from './utils';
import {
  coins,
  CoinbaseCurrency,
  CoinbaseOrderRequest,
  OrderResponseSuccess,
  OrderResponseError,
} from './coin.config';
import {getPriceData} from './getPriceData';

export async function purchaseCrypto(): Promise<AppResult> {
  const orders: string[] = [];
  for (const coin of coins) {
    orders.push(await marketBuy(coin as CoinbaseCurrency));
  }
  return {
    state: AppState.SUCCESS,
    message: orders.join('\n'),
  };
}

export async function marketBuy(coin: CoinbaseCurrency): Promise<string> {
  const coinData: CoinbaseOrderRequest = {
    client_order_id: uuidv4(),
    product_id: coin.productId,
    side: 'BUY',
    order_configuration: {
      market_market_ioc: {
        quote_size: coin.funds,
      },
    },
  };

  try {
    const response: AxiosResponse<OrderResponseSuccess> =
      await axiosInstance.post('api/v3/brokerage/orders', coinData);
    await sleep(1000);
    const order = response.data as OrderResponseSuccess;
    console.log('response', order);
    return `✅ Order(${order.order_id}) - Purchased ${coin.funds} of ${order.success_response.product_id}`;
    // Error handling below
  } catch (err: unknown) {
    console.warn(err);
    const message = axios.isAxiosError(err)
      ? err?.response?.data.message
      : err instanceof Error
      ? err.message
      : 'unknown error occurred';
    const data: AppResult = {
      state: AppState.BUY_FAILURE,
      message,
    };
    panic(data);
    return message;
  }
}

export async function limitOrderBuy(coin: CoinbaseCurrency): Promise<string> {
  // get price for limit order
  const priceData = await getPriceData(coin.productId);
  if (!priceData || isNaN(priceData.price)) {
    const data: AppResult = {
      state: AppState.BUY_FAILURE,
      message: `failed to retrieve price of ${coin.productId} for limit order`,
    };
    panic(data);
  }

  const coinData: CoinbaseOrderRequest = {
    client_order_id: uuidv4(),
    product_id: coin.productId,
    side: 'BUY',
    order_configuration: {
      limit_limit_gtc: {
        base_size: coin.funds,
        limit_price: '26000',
        post_only: true,
      },
    },
  };

  try {
    const response: AxiosResponse<OrderResponseSuccess> =
      await axiosInstance.post('api/v3/brokerage/orders', coinData);
    await sleep(1000);
    const order = response.data as OrderResponseSuccess;
    console.log('response', order);
    const {
      success_response: {product_id},
      order_configuration: {limit_limit_gtc},
    } = order;

    return `✅ Limit Order(${order.order_id}) Submitted - For ${coin.funds} of ${product_id} at ${limit_limit_gtc?.limit_price} `;
    // Error handling below
  } catch (err: unknown) {
    console.warn(err);
    const message = axios.isAxiosError(err)
      ? err?.response?.data.message
      : err instanceof Error
      ? err.message
      : 'unknown error occurred';
    const data: AppResult = {
      state: AppState.BUY_FAILURE,
      message,
    };
    panic(data);
    return message;
  }
}
