import {CoinbaseCurrency} from './coin.config';
import {buyOrderURL} from './mocks/constants';
import {panic, AppState} from './utils';
import {purchaseCrypto, marketBuy} from './purchase';
import {server} from './mocks/server';
import {rest} from 'msw';
import {setupEnvironment} from './env';
import {checkAccountStatus} from './accountStatus';
import type {AccountStatusSuccessResponse} from './coin.config';

beforeAll(() => {
  server.listen();
  setupEnvironment();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  panic: jest.fn(),
}));

describe('purchaseCrypto', () => {
  it('should return successful state when all marketBuy calls are successful', async () => {
    const result = await purchaseCrypto();

    expect(result.state).toEqual(AppState.SUCCESS);
    expect(result.message).toContain('✅ Order(1) - Purchased');
  });

  it('should panic when marketBuy fails', async () => {
    server.use(
      rest.post(buyOrderURL, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({message: 'buy failure'}));
      }),
    );

    await purchaseCrypto();
    expect(panic).toHaveBeenCalled();
  });
});

describe('marketBuy', () => {
  it('should return success message on successful buy', async () => {
    const coin: CoinbaseCurrency = {
      productId: 'BTC-USD',
      funds: '100',
    };

    const result = await marketBuy(coin);

    expect(result).toEqual('✅ Order(1) - Purchased 100 of BTC-USD');
  });

  it('should panic on failed buy', async () => {
    server.use(
      rest.post('https://api.exchange.coinbase.com/orders', (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({message: 'buy failure'}));
      }),
    );

    const coin: CoinbaseCurrency = {
      productId: 'BTC-USD',
      funds: '100',
    };

    await marketBuy(coin);
    expect(panic).toHaveBeenCalled();
  });
});

describe('accountStatus', () => {
  it('should return success message on successful buy', async () => {
    const accountData: AccountStatusSuccessResponse[] =
      (await checkAccountStatus()) as AccountStatusSuccessResponse[];

    expect(accountData[0].name).toEqual('ETH Wallet');
    expect(accountData[0].active).toEqual(true);
    expect(accountData[0].balance).toEqual(parseFloat('11000000').toFixed(5));
    expect(accountData[1].name).toEqual('USD Wallet');
    expect(accountData[1].active).toEqual(true);
    expect(accountData[1].balance).toEqual(parseFloat('3489021').toFixed(5));
    expect(accountData[2].name).toEqual('BTC Wallet');
    expect(accountData[2].active).toEqual(true);
    expect(accountData[2].balance).toEqual(parseFloat('10000000').toFixed(5));
  });
});
