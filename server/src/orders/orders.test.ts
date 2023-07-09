import {
  CoinbaseCurrency,
  PriceDataSuccessResponse,
} from '../shared/coin.config';
import { buyOrderURL, filledOrderURL, productPriceURL } from '../mocks/constants';
import { panic } from '../shared/utils';
import { limitOrderBuy } from './limitOrderBuy';
import { getFilledOrders } from './getFilledOrders';
import { marketBuy } from './marketBuy';
import { server } from '../mocks/server';
import { rest } from 'msw';
import { getPriceData } from '../orders/getPriceData';
import {
  mockFilledOrderResponse,
  mockPriceDataResponse,
} from '../mocks/mockData';
import type { FilledOrder } from '../shared/coin.config';

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
  jest.mock('../orders/getPriceData', () => {
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

describe('getFilledOrders', () => {
  it('should successfully return filled orders', async () => {
    const filledOrders: FilledOrder[] =
      (await getFilledOrders()) as FilledOrder[];

    expect(filledOrders.length).toEqual(7);

    filledOrders.forEach((order, i) => {
      expect(order.order_id).toEqual(
        mockFilledOrderResponse.orders[i].order_id,
      );
      expect(order.product_id).toEqual(
        mockFilledOrderResponse.orders[i].product_id,
      );

      expect(order.user_id).toEqual(mockFilledOrderResponse.orders[i].user_id);
      expect(order.created_time).toEqual(
        mockFilledOrderResponse.orders[i].created_time,
      );
      expect(order.filled_value).toEqual(
        mockFilledOrderResponse.orders[i].filled_value,
      );
    });
  });

  it('should panic on failed call', async () => {
    server.use(
      rest.post(filledOrderURL, (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'request failed' }));
      }),
    );

    await getFilledOrders();
    expect(panic).toHaveBeenCalled();
  });
});
