import { purchaseCrypto, submitPurchaseOrdersForAllUsers } from './purchase';
import { setupEnvironment } from './env';

(async function() {
  await setupEnvironment();
  const limitOrders = await submitPurchaseOrdersForAllUsers();
  console.info(limitOrders);
})();
