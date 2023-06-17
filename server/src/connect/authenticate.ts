import { AxiosResponse } from 'axios';
import { axiosDatabaseInstance } from '../axios/databaseConfig';
import { User } from '../shared/types';

interface UserSignInResponse {
  token: string;
  record: User;
}

interface ErrorResponse {
  message: string;
}

type CustomAxiosResponse = AxiosResponse<UserSignInResponse> &
  AxiosResponse<ErrorResponse>;

export class Auth {
  private Admin: User | null;

  constructor() {
    this.Admin = null;
  }


  private async authServerCall(
    urlEndpoint: string,
    email: string,
    password: string,
  ): Promise<void> {
    let requestData = { identity: email, password };

    try {
      const { data, status }: CustomAxiosResponse = await axiosDatabaseInstance({
        url: urlEndpoint,
        method: 'POST',
        data: requestData,
        headers: { 'Content-Type': 'application/json' },
      });

      if (status === 400) {
        const message = 'message' in data ? data.message : 'Unauthorized';
        console.log(message);
        return;
      }

      if ('email' in data.record && 'token' in data) {
        console.log(`Logged in as ${data.record.email}`);

        const user: User = data.record;

        // add user token to user object
        user.token = data.token;

        // update Admin data
        this.Admin = data.record;
      }
    } catch (errorResponse) {
      console.log('Invalid email / password combo');
    }
  }

  public async signin(email: string, password: string): Promise<void> {
    await this.authServerCall(
      '/collections/users/auth-with-password',
      email,
      password,
    );
  }

  public signout(): void {
    // clear user from stored user data
    this.Admin = null;
    console.log('Logged out!');
  }
}
