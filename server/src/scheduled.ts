import cron from 'node-cron';
import { submitPurchaseOrdersForAllUsers } from './purchase';
import { setupEnvironment } from './env';

(async function() {
  await setupEnvironment();
  cron.schedule(
    '0 23 * * *',
    () => {
      const limitOrders = submitPurchaseOrdersForAllUsers();
      console.log(limitOrders);
    },
    {
      scheduled: true,
      timezone: 'America/New_York',
    },
  );
})();
