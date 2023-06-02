import {purchaseCrypto} from './purchase';
import {setupEnvironment} from './env';

(async function () {
  setupEnvironment();
  const {message} = await purchaseCrypto();
  console.info(message);
})();
