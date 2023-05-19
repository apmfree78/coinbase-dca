import dotenv from 'dotenv';
import {AppResult, AppState, panic} from './utils';
import {fileURLToPath} from 'url';
import path, {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function validateEnvironment(): void {
  const invalidArgs = ['API_KEY', 'API_SECRET', 'NODE_ENV'].filter(
    (arg) => process.env[arg] == null,
  );
  if (invalidArgs.length > 0) {
    const result: AppResult = {
      state: AppState.INVALID_ENV,
      message: `The following args were not supplied: ${invalidArgs}`,
    };
    panic(result);
  }
}

export function setupEnvironment(): void {
  dotenv.config({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
  });
  validateEnvironment();
}
