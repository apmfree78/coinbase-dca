import { setupEnvironment } from './env';
import { getFilledOrders } from './orders/getFilledOrders';

(async function() {
  await setupEnvironment();
  await getFilledOrders();
})();
