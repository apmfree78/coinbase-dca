import { getSubmittedOrders } from './connect/pocketbase';
import { setupEnvironment } from './env';
import { getFilledOrders } from './orders/getFilledOrders';

(async function() {
  await setupEnvironment();
  await getFilledOrders();
  const response = await getSubmittedOrders(1);
  console.log(response);
})();
