import { getActiveUserWithOrders } from '../connect/pocketbase';
import { setupEnvironment } from '../env';

(async function() {
  await setupEnvironment();
  // await getOrders(1);
  // await getUsers(1);
  const users = await getActiveUserWithOrders(1);
  console.log(users);
  if (users) {
    users.items.forEach((item) => {
      console.log(item.expand?.dca_orders);
    });
  }
})();
