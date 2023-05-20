import axios, {AxiosResponse} from 'axios';
import {axiosInstance} from './axios/config';
import {AppResult, AppState, panic, sleep} from './utils';
import {AccountStatus} from './coin.config';

export async function checkAccountStatus(): Promise<void> {
  try {
    const response: AxiosResponse<AccountStatus> = await axiosInstance.get(
      'api/v3/brokerage/accounts',
    );
    await sleep(1000);
    const order = response.data as AccountStatus;
    console.log('order status', order);
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
  }
}
