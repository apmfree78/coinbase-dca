import { setupEnvironment } from 'env';
import { checkAccountStatus } from 'accountStatus';

(async function() {
  await setupEnvironment();
  await checkAccountStatus();
})();
