import {
  rest,
  RequestHandler,
  RestContext,
  MockedRequest,
  ResponseComposition,
} from 'msw';
import {
  buyOrderURL,
  accountstatusURL,
  productPriceURL,
  databaseAdminAccessURL,
  databaseOrdersURL,
  databaseUserURL,
  databaseSubmittedOrdersURL,
} from './constants';
import { buyOrderResponse } from './orderResponse';
import {
  mockAccountDataResponse,
  mockPriceDataResponse,
  mockAdminResponse,
  mockDatabaseOrderResonse,
  mockActiveUserOrders,
} from './mockData';
import { PostSubmittedOrderPayload } from '../shared/types';

export const handlers: RequestHandler[] = [
  rest.post(buyOrderURL, buyOrderResponse),
  rest.post(
    databaseSubmittedOrdersURL,
    (req: MockedRequest, res: ResponseComposition, ctx: RestContext) => {
      const body = req.body as PostSubmittedOrderPayload;
      const { order_id, product_id, limit_price, owner, isFilled, amount } = body;
      return res(
        ctx.status(200),
        ctx.json({
          id: '1abc',
          collectionId: '2a43akece',
          collectionName: 'submitted_orders',
          created: Date(),
          updated: Date(),
          order_id,
          product_id,
          limit_price,
          owner,
          isFilled,
          amount,
        }),
      );
    },
  ),
  rest.get(
    databaseUserURL,
    (req: MockedRequest, res: ResponseComposition, ctx: RestContext) =>
      res(ctx.status(200), ctx.json(mockActiveUserOrders)),
  ),
  rest.post(
    databaseAdminAccessURL,
    (req: MockedRequest, res: ResponseComposition, ctx: RestContext) => {
      const body = req.body as { identity: string; password: string };
      if (body?.identity && body?.password)
        return res(ctx.status(200), ctx.json(mockAdminResponse));
      else
        return res(
          ctx.status(400),
          ctx.json({ message: 'missing identity or password' }),
        );
    },
  ),
  rest.get(
    databaseOrdersURL,
    (req: MockedRequest, res: ResponseComposition, ctx: RestContext) => {
      const authHeader = req.headers.get('Authorization');
      // Check if the Authorization header exists and starts with "Bearer "
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res(
          ctx.status(400),
          ctx.json({ message: 'Missing or invalid Authorization header' }),
        );
      }

      // Extract the token
      const token = authHeader.slice('Bearer '.length);

      // Check if the token is null
      if (!token) {
        return res(
          ctx.status(400),
          ctx.json({ message: 'Missing token in Authorization header' }),
        );
      }
      return res(ctx.status(200), ctx.json(mockDatabaseOrderResonse));
    },
  ),
  rest.get(
    accountstatusURL,
    (req: MockedRequest, res: ResponseComposition, ctx: RestContext) => {
      return res(ctx.json(mockAccountDataResponse));
    },
  ),
  rest.get(
    productPriceURL,
    (req: MockedRequest, res: ResponseComposition, ctx: RestContext) => {
      const urlContents = req.url.toString().split('/');
      if (urlContents.includes('BTC-USD')) {
        return res(ctx.json(mockPriceDataResponse));
      } else
        return res(ctx.status(400), ctx.json({ message: 'invalid product id' }));
    },
  ),
];
