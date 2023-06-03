// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { baseUrl } from 'axiosInstance/constants';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

type SuccessResponse = {
  token: string;
};

type ErrorResponse = {
  message: string;
};

console.log('setting up servers');

export const mockUserResponse = {
  token: '123',
  record: {
    id: 'abc',
    email: 'test@example.com',
    posts: [],
  },
};

interface handlerType {
  path: string | RegExp;
  method?: 'get' | 'post' | 'delete' | 'put';
  res: (req: any, res: any, ctx: any) => object[];
}

export function createServer(handlerConfig: handlerType[]) {
  const handlers = handlerConfig.map((config) => {
    return rest[config.method || 'get'](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
}

export const handlers = [
  rest.post<string, SuccessResponse | ErrorResponse, any>(
    `${baseUrl}/collections/users/auth-with-password`,
    (req, res, ctx) => {
      console.log('intercepting server request');
      console.log(req.body);
      console.log('identity validated');
      // return res(ctx.status(200), ctx.json(mockUserResponse));
      //const { identity, password } = JSON.parse(req.body);
      // console.log("invalide request");
      return res(
        ctx.status(401),
        ctx.json({ message: 'Invalid email or password' })
      );
    }
  ),
  rest.get<string, SuccessResponse | ErrorResponse, any>(
    `${baseUrl}/collections/users/records/:id`,
    (req, res, ctx) => {
      return res(ctx.json({ user: null }));
    }
  ),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
