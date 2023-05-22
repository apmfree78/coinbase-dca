import {
  rest,
  RequestHandler,
  RestContext,
  MockedRequest,
  ResponseComposition,
} from 'msw';
import {
  CoinbaseOrderRequest,
  OrderResponseSuccess,
  OrderResponseError,
} from '../coin.config';
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
        const cbAccessKey = req.headers.get('CB-ACCESS-KEY');
        const cbAccessSign = req.headers.get('CB-ACCESS-SIGN');
        const cbAccessTimeStamp = req.headers.get('CB-ACCESS-TIMESTAMP');
        if (!cbAccessTimeStamp || !cbAccessSign || !cbAccessKey)
          return res(ctx.status(400), ctx.json({message: 'buy failure'}));
        else
          return res(
            ctx.json({
              success: true,
              failure_reason: 'unknown',
              order_id: '1',
              success_response: {
                order_id: '1',
                product_id: req.body.product_id,
                side: req.body.side,
                client_order_id: req.body.client_order_id,
              },
              order_configuration: {
                market_market_ioc: {
                  quote_size:
                    req.body.order_configuration.market_market_ioc.quote_size,
                },
              },
            }),
          );
      } else {
        return res(ctx.status(400), ctx.json({message: 'buy failure'}));
      }
    },
  ),
];
