import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { axiosInstance } from '../axios/config';
import { AppResult, AppState, panic, sleep } from 'utils';
import {
  CoinbaseCurrency,
  CoinbaseOrderRequest,
  OrderResponseSuccess,
} from 'coin.config';
import type { LimitOrderSubmitted } from 'coin.config';
import { getPriceData } from './getPriceData';

// limit order returns object of type LimitOrderSubmitted if limit
// order is successfully submitted otherwise returns null
export async function limitOrderBuy(
  coin: CoinbaseCurrency,
): Promise<LimitOrderSubmitted | null> {
  // get price for limit order
  const priceData = await getPriceData(coin.productId);
  if (!priceData || isNaN(priceData.price)) {
    const data: AppResult = {
      state: AppState.BUY_FAILURE,
      message: `failed to retrieve price of ${coin.productId} for limit order`,
    };
    panic(data);
    return null;
  }

  const coinData = createLimitOrderPayload(coin, priceData.price);

  try {
    const response: AxiosResponse<OrderResponseSuccess> =
      await axiosInstance.post('api/v3/brokerage/orders', coinData);
    await sleep(300);
    const order = response.data as OrderResponseSuccess;

    if (order.order_id) {
      const {
        success_response: { product_id },
        order_configuration: { limit_limit_gtc },
      } = order;

      const successMessage = `✅ Limit Order(${order.order_id
        }) Submitted - For ${coin.funds} of ${product_id} at ${parseFloat(
          limit_limit_gtc?.limit_price || '',
        ).toFixed(2)}`;

      return {
        order_id: order.order_id,
        product_id,
        amount: parseInt(coin.funds),
        limit_price: parseFloat(limit_limit_gtc?.limit_price || ''),
        success_message: successMessage,
      };
    }
    return null;
    // Error handling below
  } catch (err: unknown) {
    console.warn('error submitting limit buy to coinbase');
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
    return null;
  }
}

export function createLimitOrderPayload(
  coin: CoinbaseCurrency,
  price: number,
): CoinbaseOrderRequest {
  // convert coin.funds to base_size
  const base_size = (parseFloat(coin.funds) / price).toFixed(6);

  // set limit price 0.1% below market price
  const limitPrice = parseFloat((0.9999 * price).toFixed(2));

  return {
    client_order_id: uuidv4(),
    product_id: coin.productId,
    side: 'BUY',
    order_configuration: {
      limit_limit_gtc: {
        base_size,
        limit_price: limitPrice.toString(),
        post_only: true,
      },
    },
  };
}
