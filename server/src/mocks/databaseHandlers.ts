import {
  rest,
  RequestHandler,
  RestContext,
  MockedRequest,
  ResponseComposition,
} from 'msw';
import {
  databaseAdminAccessURL,
  databaseOrdersURL,
  databaseUserURL,
  databaseSubmittedOrdersURL,
  databaseUserURLbyId,
  databaseSubmittedOrdersURLbyId,
} from './constants';
import {
  mockActiveUser,
  mockAdminResponse,
  mockDatabaseOrderResonse,
  mockActiveUserOrders,
  mockSubmittedOrder,
  mockDatabaseSubmittedOrderResonse,
} from './mockData';
import { PostSubmittedOrderPayload } from '../shared/databaseTypes';

export const databaseHandlers: RequestHandler[] = [
  rest.patch(
    databaseSubmittedOrdersURLbyId,
    (req: MockedRequest, res: ResponseComposition, ctx: RestContext) => {
      const body = req.body as object;
      const updatedOrder = {
        ...mockSubmittedOrder,
        ...body,
      };

      return res(ctx.status(200), ctx.json(updatedOrder));
    },
  ),
  rest.get(
    databaseSubmittedOrdersURL,
    (req: MockedRequest, res: ResponseComposition, ctx: RestContext) =>
      res(ctx.status(200), ctx.json(mockDatabaseSubmittedOrderResonse)),
  ),
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
  rest.patch(
    databaseUserURLbyId,
    (req: MockedRequest, res: ResponseComposition, ctx: RestContext) => {
      const body = req.body as {
        submitted_orders: string[];
      };
      const updatedUser = {
        ...mockActiveUser,
        ...body,
      };

      return res(ctx.status(200), ctx.json(updatedUser));
    },
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
];
