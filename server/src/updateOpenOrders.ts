import { setupEnvironment } from './env';
import { updateOrderFillStatusOnDatabase } from './updateOrderStatus';

(async function() {
  await setupEnvironment();

  const filledOrders = await updateOrderFillStatusOnDatabase();
  console.log(filledOrders);
})();
