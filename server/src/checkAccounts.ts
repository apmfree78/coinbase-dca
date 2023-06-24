import { setupEnvironment } from 'env';
import { checkAccountStatus } from 'orders/accountStatus';

(async function() {
  await setupEnvironment();
  await checkAccountStatus();
})();
