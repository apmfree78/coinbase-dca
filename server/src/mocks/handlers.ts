import {
  rest,
  RequestHandler,
  RestContext,
  MockedRequest,
  ResponseComposition,
} from 'msw';
import {buyOrderURL, accountstatusURL, productPriceURL} from './constants';
import {buyOrderResponse} from './orderResponse';
import {mockAccountDataResponse, mockPriceDataResponse} from './mockData';

export const handlers: RequestHandler[] = [
  rest.post(buyOrderURL, buyOrderResponse),
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
        return res(ctx.status(400), ctx.json({message: 'invalid product id'}));
    },
  ),
];
