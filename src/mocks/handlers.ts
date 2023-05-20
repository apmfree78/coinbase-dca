import {
  rest,
  RequestHandler,
  RestContext,
  MockedRequest,
  ResponseComposition,
} from 'msw';
import {CoinbaseOrderRequest} from '../coin.config';
import {coinbaseURL} from './constants';

export const handlers: RequestHandler[] = [
  rest.post(
    coinbaseURL,
    (
      req: MockedRequest<CoinbaseOrderRequest>,
      res: ResponseComposition,
      ctx: RestContext,
    ) => {
      if (req?.body?.client_order_id && req?.body?.side === 'BUY') {
        // Validate that headers are present
        const cbAccessKey = req.headers.get('cb-access-key');
        const cbAccessSign = req.headers.get('cb-access-sign');
        const cbAccessTimeStamp = req.headers.get('cb-access-timestamp');
        if (!cbAccessTimeStamp || !cbAccessSign || !cbAccessKey)
          return res(ctx.status(400), ctx.json({message: 'buy failure'}));
        else
          return res(
            ctx.json({
              success: true,
              order_id: '1',
              success_response: {
                order_id: '1',
                product_id: req.body.product_id,
                side: req.body.side,
                client_order_id: req.body.client_order_id,
              },
            }),
          );
      } else {
        return res(ctx.status(400), ctx.json({message: 'buy failure'}));
      }
    },
  ),
];
