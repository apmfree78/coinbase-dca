import { setupEnvironment } from '../env';
import { server } from '../mocks/server';

beforeAll(async () => {
  server.listen();
  await setupEnvironment();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('../shared/utils', () => ({
  ...jest.requireActual('../shared/utils'),
  panic: jest.fn(),
}));
