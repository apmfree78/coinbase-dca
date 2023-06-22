import dotenv from 'dotenv';
import { AppResult, AppState, panic } from 'utils';
import { adminUser } from 'connect/authenticate';
import path from 'path';

function validateEnvironment(): void {
  const invalidArgs = [
    'API_KEY',
    'API_SECRET',
    'NODE_ENV',
    'ADMIN_USERNAME',
    'ADMIN_PASSWORD',
  ].filter((arg) => process.env[arg] == null);
  if (invalidArgs.length > 0) {
    const result: AppResult = {
      state: AppState.INVALID_ENV,
      message: `The following args were not supplied: ${invalidArgs}`,
    };
    panic(result);
  }
}

export async function setupEnvironment(): Promise<void> {
  dotenv.config({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
  });
  validateEnvironment();
  await adminUser.signin(
    process.env.ADMIN_USERNAME || '',
    process.env.ADMIN_PASSWORD || '',
  );
}
