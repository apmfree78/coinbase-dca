import { getOrders } from '../connect/pocketbase';
import { setupEnvironment } from '../env';

(async function() {
  await setupEnvironment();
  await getOrders(1);
})();
