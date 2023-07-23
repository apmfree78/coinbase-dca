import { databaseOrdersURL } from '../mocks/constants';
import {
  AbbreviatedUserWithOrders,
  PaginationData,
  PostSubmittedOrderPayload,
  PostSubmittedResponse,
  PatchUserPayload,
} from '../shared/databaseTypes';
import {
  getOrders,
  getActiveUserWithOrders,
  postSubmittedOrder,
  patchUser,
} from '../connect/pocketbase';
import { server } from '../mocks/server';
import { rest } from 'msw';
import { adminUser } from '../connect/authenticate';
import {
  mockAdminResponse,
  mockDatabaseOrderResonse,
  mockActiveUserOrders,
  mockActiveUser,
} from '../mocks/mockData';

describe('admin autehentication', () => {
  it('admin is successfully authenticated and logged into database', () => {
    expect(adminUser.getToken()).toEqual(mockAdminResponse.token);
    expect(adminUser.getEmail()).toEqual(mockAdminResponse.admin.email);
  });
});

describe('patchUser', () => {
  it('returns update User', async () => {
    const payload: PatchUserPayload = {
      membership: 'gold',
      status: 'active',
      submitted_orders: [
        ...(mockActiveUser.submitted_orders || []),
        'new_order',
      ],
    };
    const id = mockActiveUser.id;
    console.log(payload);

    const patchUserResponse = await patchUser(id, payload);

    expect(patchUserResponse?.submitted_orders).toContain('new_order');
    expect(patchUserResponse?.submitted_orders?.length).toEqual(2);
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

describe('getActiveUsersWithOrders', () => {
  it('should successfully return account data', async () => {
    const orders: PaginationData<AbbreviatedUserWithOrders> | undefined =
      await getActiveUserWithOrders(1);

    expect(orders?.page).toEqual(mockActiveUserOrders.page);
    expect(orders?.totalItems).toEqual(mockActiveUserOrders.totalItems);
    expect(orders?.perPage).toEqual(mockActiveUserOrders.perPage);
    expect(orders?.items.length).toEqual(mockActiveUserOrders.items.length);
    orders?.items[0].expand?.dca_orders.forEach((order, i) => {
      expect(order.amount).toEqual(
        mockActiveUserOrders.items[0].expand?.dca_orders[i].amount,
      );
    });
  });
});

describe('postSubmittedOrder', () => {
  it('success response to posting limit orders to database', async () => {
    const payload: PostSubmittedOrderPayload = {
      order_id: '1',
      product_id: 'BTC-USD',
      limit_price: 27000,
      exchange: 'coinbase',
      owner: '1bc',
      isFilled: false,
      amount: 1000,
    };

    const response: PostSubmittedResponse | null = await postSubmittedOrder(
      payload,
    );

    if (response !== null) {
      expect(response.order_id).toEqual(payload.order_id);
      expect(response.product_id).toEqual(payload.product_id);
      expect(response.limit_price).toEqual(payload.limit_price);
      expect(response.owner).toEqual(payload.owner);
      expect(response.isFilled).toEqual(payload.isFilled);
      expect(response.amount).toEqual(payload.amount);
    }
  });
});
