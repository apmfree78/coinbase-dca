import axios from 'axios';
import {axiosInstance} from './axios/config';
import {AppResult, AppState, panic, sleep} from './utils';
import {
  coins,
  CoinbaseCurrency,
  CoinbaseOrderRequest,
  OrderStatus,
} from './coin.config';
import {AxiosResponse} from 'axios';

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
    type: 'market',
    product_id: coin.productId,
    funds: coin.funds,
    side: 'buy',
  };

  try {
    const response: AxiosResponse<OrderStatus> = await axiosInstance.post(
      'orders',
      coinData,
    );
    await sleep(1000);
    const order = response.data;
    return `✅ Order(${order.id}) - Purchased ${coin.funds} of ${order.product_id}`;
    //Error handling below
  } catch (err: unknown) {
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
