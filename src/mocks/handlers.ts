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
import {buyOrderURL, accountstatusURL} from './constants';

export const handlers: RequestHandler[] = [
  rest.post(
    buyOrderURL,
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
  rest.get(
    accountstatusURL,
    (req: MockedRequest, res: ResponseComposition, ctx: RestContext) => {
      return res(
        ctx.json({
          accounts: [
            {
              uuid: 'dcb98ebf-10d1-5805-b04a-c2235b11e9f1',
              name: 'ETH Wallet',
              currency: 'ETH',
              available_balance: {
                value: '11000000',
                currency: 'USD',
              },
              default: true,
              active: true,
              created_at: '2019-06-20T16:44:53.357Z',
              updated_at: '2019-06-20T16:44:53.357Z',
              deleted_at: null,
              type: 'ACCOUNT_TYPE_CRYPTO',
              ready: true,
            },
            {
              uuid: 'd772a88c-b40c-593a-8e58-aaaf9dab3241',
              name: 'USD Wallet',
              currency: 'USD',
              available_balance: {
                value: '3489021',
                currency: 'USD',
              },
              default: false,
              active: true,
              created_at: '2017-09-04T13:57:35.500Z',
              updated_at: '2023-05-22T00:57:57.040Z',
              deleted_at: null,
              type: 'ACCOUNT_TYPE_FIAT',
              ready: true,
            },
            {
              uuid: 'c11b9142-1527-57e9-b9ed-0ca67b52ef93',
              name: 'BTC Wallet',
              currency: 'BTC',
              available_balance: {
                value: '10000000',
                currency: 'USD',
              },
              default: true,
              active: true,
              created_at: '2017-08-29T16:35:15.557Z',
              updated_at: '2023-05-22T00:58:03.289Z',
              deleted_at: null,
              type: 'ACCOUNT_TYPE_CRYPTO',
              ready: true,
            },
          ],
          has_next: false,
          cursor: '',
          size: 3,
        }),
      );
    },
  ),
];
