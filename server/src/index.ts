import { purchaseCrypto, submitPurchaseOrdersForAllUsers } from './purchase';
import { setupEnvironment } from './env';

(async function() {
  await setupEnvironment();

  // const { message } = await purchaseCrypto();
  // console.info(message);
  const limitOrders = await submitPurchaseOrdersForAllUsers();
  console.log(limitOrders);
})();
