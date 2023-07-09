import { FilledOrder } from './shared/coin.config';
import { getSubmittedOrders, patchSubmittedOrder } from './connect/pocketbase';
import { getFilledOrders } from './orders/getFilledOrders';
import { SubmittedOrder } from './shared/databaseTypes';

export async function updateOrderFillStatusOnDatabase(): Promise<
  SubmittedOrder[] | void
> {
  const filledOrders = [] as SubmittedOrder[];
  // obtain filled purchase orders info from exchange
  const realTimeOrderData: FilledOrder[] | void = await getFilledOrders();

  if (!realTimeOrderData) {
    console.warn('unable to pull data from exchange');
    return;
  }

  //filter out order_id as that is all we need
  const filledOrderIds = realTimeOrderData.map((order) => order.order_id);

  // obtain order info recorded in database that are still marked as UNFILLED
  // TODO CREATE mock data and handler
  const unfilledOrdersResponse = await getSubmittedOrders(1);

  if (!unfilledOrdersResponse) {
    console.log('no unfilled orders in database');
    return;
  }
  const unfilledOrdersInDatabase: SubmittedOrder[] =
    unfilledOrdersResponse.items;

  // check each unfilledOrder against real time orders to see which are filled
  for (const order of unfilledOrdersInDatabase) {
    //check if order recorded in database is in fact filled
    if (filledOrderIds.includes(order.order_id)) {
      // update order database record to reflect that 'isFilled'
      const updatedOrder: SubmittedOrder = { ...order, isFilled: true };
      // TODO create mock data and handler
      const filledOrder = await patchSubmittedOrder(order.id, updatedOrder);
      if (filledOrder) filledOrders.push(filledOrder);
    }
  }
  return filledOrders;
}
