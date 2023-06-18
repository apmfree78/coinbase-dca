import { setupEnvironment } from './env';
import { checkAccountStatus } from './accountStatus';


(async function() {
  setupEnvironment();
  await checkAccountStatus();
})();
