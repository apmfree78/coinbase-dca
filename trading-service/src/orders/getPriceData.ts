import axios, { AxiosResponse } from 'axios';
import { axiosInstance } from '../axios/config';
import { AppResult, AppState, panic } from '../shared/utils';
import type { PriceDataSuccessResponse, PriceData } from '../shared/coin.config';

export async function getPriceData(
  productId: string,
): Promise<PriceDataSuccessResponse | void> {
  try {
    const response: AxiosResponse<PriceData> = await axiosInstance.get(
      `api/v3/brokerage/products/${productId}`,
    );
    const { product_id, price } = response.data as PriceData;

    return {
      product_id,
      price: parseFloat(price),
    };
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
