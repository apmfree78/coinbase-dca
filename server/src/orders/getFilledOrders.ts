import axios, { AxiosResponse } from 'axios';
import { axiosInstance } from '../axios/config';
import { AppResult, AppState, panic } from '../shared/utils';
import type { ListFilledOrderResponse } from '../shared/coin.config';

export async function getFilledOrders(): Promise<
  ListFilledOrderResponse['orders'] | void
> {
  try {
    const { data }: AxiosResponse<ListFilledOrderResponse> =
      await axiosInstance.get(
        'api/v3/brokerage/orders/historical/batch?order_status=FILLED&order_type=LIMIT&order_side=BUY',
      );
    return data.orders;
    // Error handling below
  } catch (err: unknown) {
    console.warn('error getting price data');
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
  }
}
