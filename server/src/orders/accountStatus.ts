import axios, { AxiosResponse } from 'axios';
import { axiosInstance } from '../axios/config';
import { AppResult, AppState, panic, sleep } from '../utils';
import { AccountStatus } from '../coin.config';
import type { AccountStatusSuccessResponse } from '../coin.config';

export async function checkAccountStatus(): Promise<
  AccountStatusSuccessResponse[] | void
> {
  try {
    const response: AxiosResponse<AccountStatus> = await axiosInstance.get(
      'api/v3/brokerage/accounts',
    );
    await sleep(1000);
    const info = response.data as AccountStatus;
    const userAccounts: AccountStatusSuccessResponse[] = [];
    // console.log(info);
    info.accounts.map((account) => {
      const balance = parseFloat(account.available_balance.value).toFixed(5);
      console.log('--------------------------------');
      console.log('name:', account.name);
      // console.log('currency:', account.currency);
      // console.log('is active?', account.active);
      console.log('Available Balance', balance);
      console.log('--------------------------------');
      // TODO refactor to return json
      userAccounts.push({
        name: account.name,
        active: account.active,
        balance: balance,
      });
    });
    return userAccounts;
    // Error handling below
  } catch (err: unknown) {
    console.warn('error getting user account status');
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
