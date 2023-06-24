import { accountstatusURL, buyOrderURL } from './mocks/constants';
import { panic, AppState } from './utils';
import { purchaseCrypto, submitPurchaseOrdersForAllUsers } from './purchase';
import { server } from './mocks/server';
import { rest } from 'msw';
import { checkAccountStatus } from './orders/accountStatus';
import type { AccountStatusSuccessResponse } from './coin.config';
import { mockActiveUserOrders, mockPriceDataResponse } from './mocks/mockData';
import { PurchaseOrder } from './shared/types';

describe('submitPurchaseOrderForAllUsers', () => {
  it('correctly returns list of submitted limit orders', async () => {
    const limitOrders = await submitPurchaseOrdersForAllUsers();

    // extract expected response from mock data
    const { dca_orders } = mockActiveUserOrders.items[0].expand as {
      dca_orders: PurchaseOrder[];
    };
    const orders = dca_orders.filter(
      (order: PurchaseOrder) => order.exchange === 'coinbase',
    );
    const limitPrice = parseFloat(
      (0.9999 * parseFloat(mockPriceDataResponse.price)).toFixed(2),
    );

    if (limitOrders === null) throw new Error('fail');
    else {
      limitOrders.forEach((limitOrder, i) => {
        expect(limitOrder.order_id).toEqual('1');
        expect(limitOrder.amount).toEqual(orders[i].amount);
        expect(limitOrder.product_id).toEqual(`${orders[i].asset}-USD`);
        expect(limitOrder.limit_price).toEqual(limitPrice);
      });
    }
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
