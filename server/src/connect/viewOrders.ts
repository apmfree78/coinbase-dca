import { getOrders } from '../connect/pocketbase';

(async function() {
  await getOrders(1);
})();
