import cron from 'node-cron';
import { submitPurchaseOrdersForAllUsers } from './purchase';
import { updateOrderFillStatusOnDatabase } from './updateOrderStatus';
import { setupEnvironment } from './shared/env';

(async function() {
  await setupEnvironment();
  cron.schedule(
    '0 23 * * *',
    async () => {
      const limitOrders = await submitPurchaseOrdersForAllUsers();
      console.log(limitOrders);
    },
    {
      scheduled: true,
      timezone: 'America/New_York',
    },
  );
  cron.schedule(
    '0 0 * * *',
    async () => {
      const filledOrders = await updateOrderFillStatusOnDatabase();
      console.log(filledOrders);
    },
    {
      scheduled: true,
      timezone: 'America/New_York',
    },
  );
  setInterval(() => console.log('cron job running'), 1000 * 60 * 5); // log every min
})();
