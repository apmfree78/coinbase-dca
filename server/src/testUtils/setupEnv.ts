import { setupEnvironment } from '../env';
import { server } from '../mocks/server';

process.env.POCKETBASE_URL = 'http://127.0.0.1:8090';

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
