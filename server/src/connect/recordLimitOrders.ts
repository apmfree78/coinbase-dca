import { LimitOrderSubmitted } from '../shared/coin.config';
import type {
  AbbreviatedUserWithOrders,
  PatchUserPayload,
  PostSubmittedOrderPayload,
  User,
} from '../shared/databaseTypes';
import { patchUser, postSubmittedOrder } from '../connect/pocketbase';

export async function recordLimitOrdersToDatabase(
  currentUser: AbbreviatedUserWithOrders,
  limitOrders: LimitOrderSubmitted[],
): Promise<User[] | []> {
  let updatedUsers = [];
  for (const order of limitOrders) {
    const orderPayload: PostSubmittedOrderPayload = {
      order_id: order.order_id,
      product_id: order.product_id,
      limit_price: order.limit_price,
      exchange: 'coinbase',
      owner: currentUser.id,
      isFilled: false,
      amount: order.amount,
    };

    // post to pocketbase
    const submittedOrderResponse = await postSubmittedOrder(orderPayload);

    if (submittedOrderResponse !== null) {
      // create payload to update user with submitted order
      const userUpdate: PatchUserPayload = {
        membership: currentUser.membership,
        status: currentUser.status,
        submitted_orders: [
          ...(currentUser.submitted_orders || []),
          submittedOrderResponse.id,
        ],
      };

      const user = await patchUser(currentUser.id, userUpdate);
      if (user) updatedUsers.push(user);
    }
  }
  return updatedUsers;
}
