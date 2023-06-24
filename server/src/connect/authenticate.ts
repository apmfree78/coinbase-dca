import axios, { AxiosResponse } from 'axios';
import { databaseAPI } from '../axios/constants';
import { AdminResponse } from '../shared/types';

interface ErrorResponse {
  message: string;
}

export type AdminType = {
  id: string;
  token: string;
  email: string;
};

type CustomAxiosResponse = AxiosResponse<AdminResponse> &
  AxiosResponse<ErrorResponse>;

export class Auth {
  private Admin: AdminType | null;

  constructor() {
    this.Admin = null;
  }

  getToken(): string | null {
    return this.Admin?.token || null;
  }

  getEmail(): string | null {
    return this.Admin?.email || null;
  }

  private async authServerCall(
    urlEndpoint: string,
    email: string,
    password: string,
  ): Promise<void> {
    let requestData = { identity: email, password };

    try {
      const { data, status }: CustomAxiosResponse = await axios.post(
        `${databaseAPI}${urlEndpoint}`,
        requestData,
      );

      if (status === 400) {
        const message = 'message' in data ? data.message : 'Unauthorized';
        console.log(message);
        return;
      }

      if ('email' in data.admin && 'token' in data) {
        console.log(`Logged in as ${data.admin.email} as admin`);

        const admin: AdminType = {
          id: data.admin.id,
          token: data.token,
          email: data.admin.email,
        };

        // update Admin data
        this.Admin = { ...admin };
      } else throw new Error('response missing token or email');
    } catch (errorResponse) {
      console.log('Invalid email / password combo');
    }
  }

  public async signin(email: string, password: string): Promise<void> {
    await this.authServerCall('admins/auth-with-password', email, password);
  }

  public signout(): void {
    // clear user from stored user data
    this.Admin = null;
    console.log('Logged out!');
  }
}

export const adminUser = new Auth();
