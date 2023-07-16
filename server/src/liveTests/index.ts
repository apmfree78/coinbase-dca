import { submitPurchaseOrdersForAllUsers } from '../purchase';
import { setupEnvironment } from '../shared/env';

(async function() {
  await setupEnvironment();

  const limitOrders = await submitPurchaseOrdersForAllUsers();
  console.log(limitOrders);
})();
