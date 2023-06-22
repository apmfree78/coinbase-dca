import { AppResult, AppState, panic, sleep } from 'utils';
import { coins, CoinbaseCurrency, LimitOrderSubmitted } from './coin.config';
import type { PaginationData, PurchaseOrder, User } from 'shared/types';
import { getActiveUserWithOrders } from 'connect/pocketbase';
import { limitOrderBuy } from 'orders/limitOrderBuy';

export async function submitPurchaseOrdersForAllUsers() {
  // grab first page of users
  const userData: PaginationData<User> | undefined =
    await getActiveUserWithOrders(1);

  if (!userData) throw new Error('no user data found');

  for (const user of userData.items) {
    // filter out orders that are not coinbase
    const orders: PurchaseOrder[] | undefined = user.expand?.dca_orders.filter(
      (order) => order.exchange === 'coinbase',
    );

    if (!orders) return null;
    // submit orders to coinbase
    const userSubmittedLimitOrders: LimitOrderSubmitted[] =
      await submitUserLimitBuyOrders(orders);
  }

  // post userSubmittedLimitOrders to pocketbase below  
}

export async function submitUserLimitBuyOrders(
  orders: PurchaseOrder[],
): Promise<LimitOrderSubmitted[]> {
  const submittedOrders: LimitOrderSubmitted[] = [];

  for (const order of orders) {
    try {
      const limitOrderData = await limitOrderBuy({
        funds: order.amount.toString(),
        productId: `${order.asset}-USD`,
      });

      if (limitOrderData !== null) {
        submittedOrders.push(limitOrderData);
      }
    } catch (err) {
      console.warn(err);
    }
  }
  return submittedOrders;
}

export async function purchaseCrypto(): Promise<AppResult> {
  const orders: string[] = [];
  for (const coin of coins) {
    const response = await limitOrderBuy(coin as CoinbaseCurrency);

    if (response !== null) orders.push(response.success_message);
  }
  return {
    state: AppState.SUCCESS,
    message: orders.join('\n'),
  };
}
