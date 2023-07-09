import {
  RequestHandler,
} from 'msw';
import { coinbaseHandlers } from './coinbaseHandlers';
import { databaseHandlers } from './databaseHandlers';

export const handlers: RequestHandler[] = [
  ...databaseHandlers,
  ...coinbaseHandlers,
];
