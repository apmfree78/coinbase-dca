import { AppResult, AppState } from './shared/utils';
import {
  coins,
  CoinbaseCurrency,
  LimitOrderSubmitted,
} from './shared/coin.config';
import { recordLimitOrdersToDatabase } from './connect/recordLimitOrders';
import type {
  AbbreviatedUserWithOrders,
  PaginationData,
  PurchaseOrder,
} from './shared/databaseTypes';
import { getActiveUserWithOrders } from './connect/pocketbase';
import { limitOrderBuy } from './orders/limitOrderBuy';

export async function submitPurchaseOrdersForAllUsers(): Promise<
  LimitOrderSubmitted[] | null
> {
  let userSubmittedLimitOrders: LimitOrderSubmitted[] = [];

  // grab first page of users
  const userData: PaginationData<AbbreviatedUserWithOrders> | undefined =
    await getActiveUserWithOrders(1);

  if (!userData) throw new Error('no user data found');

  for (const user of userData.items) {
    // filter out orders that are not coinbase and not me
    const orders: PurchaseOrder[] | undefined = user.expand?.dca_orders.filter(
      (order) => order.exchange === 'coinbase' && user.email === 'amit@profitswami.com',
    );

    if (!orders) return null;
    // submit orders to coinbase
    userSubmittedLimitOrders = await submitUserLimitBuyOrders(orders);

    // map through each submitted limited order and
    // record in pocketbase
    await recordLimitOrdersToDatabase(user, userSubmittedLimitOrders);
  }
  return userSubmittedLimitOrders;
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
      console.warn('error submitting limit buy order');
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
