import {rest} from 'msw';
import {
  RequestHandler,
  RestContext,
  MockedRequest,
  ResponseComposition,
} from 'msw';
import {CoinbaseOrderRequest} from '../coin.config';

export const handlers: RequestHandler[] = [
  rest.post(
    'https://api.exchange.coinbase.com/orders',
    (
      req: MockedRequest<CoinbaseOrderRequest>,
      res: ResponseComposition,
      ctx: RestContext,
    ) => {
      if (req?.body?.type === 'market' && req?.body?.side === 'buy') {
        // Validate that headers are present
        const cbAccessKey = req.headers.get('cb-access-key');
        const cbAccessSign = req.headers.get('cb-access-sign');
        const cbAccessTimeStamp = req.headers.get('cb-access-timestamp');
        if (!cbAccessTimeStamp || !cbAccessSign || !cbAccessKey)
          return res(ctx.status(400), ctx.json({message: 'buy failure'}));
        else
          return res(
            ctx.json({
              id: '1',
              product_id: req.body.product_id,
            }),
          );
      } else {
        return res(ctx.status(400), ctx.json({message: 'buy failure'}));
      }
    },
  ),
];
