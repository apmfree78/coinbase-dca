import { CoinbaseCurrency, PriceDataSuccessResponse } from './coin.config';
import {
  accountstatusURL,
  buyOrderURL,
  productPriceURL,
  databaseOrdersURL,
} from './mocks/constants';
import { getOrders } from './connect/pocketbase';
import { panic, AppState } from './utils';
import { limitOrderBuy } from './orders/limitOrderBuy';
import { marketBuy } from './orders/marketBuy';
import { purchaseCrypto } from './purchase';
import { server } from './mocks/server';
import { rest } from 'msw';
import { adminUser } from './connect/authenticate';
import { setupEnvironment } from './env';
import { checkAccountStatus } from './accountStatus';
import type { AccountStatusSuccessResponse } from './coin.config';
import { getPriceData } from './orders/getPriceData';
import {
  mockPriceDataResponse,
  mockAdminResponse,
  mockDatabaseOrderResonse,
} from './mocks/mockData';

beforeAll(async () => {
  server.listen();
  await setupEnvironment();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  panic: jest.fn(),
}));

describe('admin autehentication', () => {
  it('admin is successfully authenticated and logged into database', () => {
    expect(adminUser.getToken()).toEqual(mockAdminResponse.token);
    expect(adminUser.getEmail()).toEqual(mockAdminResponse.admin.email);
  });
});

describe('getOrders', () => {
  it('should fetch purchase orders from database', async () => {
    const response = await getOrders(1);

    expect(response).toBeTruthy();
    if (response) {
      expect(response.page).toEqual(1);
      expect(response.totalItems).toEqual(mockDatabaseOrderResonse.totalItems);
      expect(response.items.length).toEqual(
        mockDatabaseOrderResonse.totalItems,
      );

      response.items.forEach((item, i) => {
        expect(item.amount).toEqual(mockDatabaseOrderResonse.items[i].amount);
        expect(item.id).toEqual(mockDatabaseOrderResonse.items[i].id);
        expect(item.asset).toEqual(mockDatabaseOrderResonse.items[i].asset);
        expect(item.collectionId).toEqual(
          mockDatabaseOrderResonse.items[i].collectionId,
        );
        expect(item.collectionName).toEqual(
          mockDatabaseOrderResonse.items[i].collectionName,
        );
        expect(item.created).toEqual(mockDatabaseOrderResonse.items[i].created);
        expect(item.exchange).toEqual(
          mockDatabaseOrderResonse.items[i].exchange,
        );
        expect(item.owner).toEqual(mockDatabaseOrderResonse.items[i].owner);
        expect(item.updated).toEqual(mockDatabaseOrderResonse.items[i].updated);
      });
    }
  });
});

describe('getOrders', () => {
  it('should fail to fetch purchase orders from database', async () => {
    server.use(
      rest.get(databaseOrdersURL, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'failed to fetch' }));
      }),
    );
    const response = await getOrders(1);

    expect(response).toBeFalsy();
  });
});

describe('purchaseCrypto', () => {
  it('should return successful state when all marketBuy calls are successful', async () => {
    const result = await purchaseCrypto();

    expect(result.state).toEqual(AppState.SUCCESS);
    expect(result.message).toContain('✅ Limit Order(1) Submitted');
  });

  it('should panic when marketBuy fails', async () => {
    server.use(
      rest.post(buyOrderURL, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'buy failure' }));
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
      rest.post(buyOrderURL, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'buy failure' }));
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

describe('limitOrderBuy', () => {
  jest.mock('./orders/getPriceData', () => {
    getPriceData: (productId: string) => mockPriceDataResponse;
  });
  const coin: CoinbaseCurrency = {
    productId: 'BTC-USD',
    funds: '100',
  };

  it('should return success message on successful buy', async () => {
    const limitPrice = parseFloat(mockPriceDataResponse.price) * 0.9999;

    const result = await limitOrderBuy(coin);

    expect(result?.success_message).toEqual(
      `✅ Limit Order(1) Submitted - For ${coin.funds} of ${coin.productId
      } at ${limitPrice.toFixed(2)}`,
    );
  });

  it('should panic on failed buy', async () => {
    server.use(
      rest.post(buyOrderURL, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'buy failure' }));
      }),
    );

    await limitOrderBuy(coin);
    expect(panic).toHaveBeenCalled();
  });
});

describe('accountStatus', () => {
  it('should successfully return account data', async () => {
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

  it('should panic on failed call', async () => {
    server.use(
      rest.post(accountstatusURL, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'request failed' }));
      }),
    );

    await checkAccountStatus();
    expect(panic).toHaveBeenCalled();
  });
});

describe('getPriceData', () => {
  it('should return correct product id and price', async () => {
    const productPriceData: PriceDataSuccessResponse = (await getPriceData(
      'BTC-USD',
    )) as PriceDataSuccessResponse;

    expect(productPriceData.product_id).toEqual('BTC-USD');
    expect(productPriceData.price.toFixed(2)).toEqual('100000.21');
  });

  it('should panic on failed call', async () => {
    server.use(
      rest.post(productPriceURL, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'request failed' }));
      }),
    );

    await getPriceData('BTC-USD');
    expect(panic).toHaveBeenCalled();
  });

  it('should panic when invalid product id is submitted', async () => {
    await getPriceData('abcxyz-USD');
    expect(panic).toHaveBeenCalled();
  });
});
