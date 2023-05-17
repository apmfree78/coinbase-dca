import {CoinbaseCurrency, OrderStatus} from './coin.config';
import {panic, AppState} from './utils';
import {purchaseCrypto, marketBuy} from './purchase';
import {server} from './mocks/server';
import {rest} from 'msw';
import {setupEnvironment} from './env';

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
      rest.post('https://api.exchange.coinbase.com/orders', (req, res, ctx) => {
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
