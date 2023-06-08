import { AxiosResponse } from 'axios';
import { axiosInstance } from 'axiosInstance';
import { useUser } from 'user/hooks/useUser';
import { User } from 'shared/types';
import { customToast } from 'components/Toast';

interface UseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    passwordConfirm: string
  ) => Promise<void>;
  signout: () => void;
}

type UserSignInResponse = { token: string; record: User };
type UserSignUpResponse = User;
type ErrorResponse = { message: string };
type CustomAxiosResponse = AxiosResponse<UserSignInResponse> &
  AxiosResponse<UserSignUpResponse> &
  AxiosResponse<ErrorResponse>;

export function useAuth(): UseAuth {
  // const SERVER_ERROR = 'There was an error contacting the server.';
  const { clearUser, updateUser } = useUser();

  async function authServerCall(
    urlEndpoint: string,
    email: string,
    password: string,
    passwordConfirm?: string
  ): Promise<void> {
    let requestData: object; // body of request , holds email , password etc

    // if sign up passwordConfirm exists, other wise it's a user sign in
    if (passwordConfirm) requestData = { email, password, passwordConfirm };
    else requestData = { identity: email, password };

    try {
      const { data, status }: CustomAxiosResponse = await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: requestData,
        headers: { 'Content-Type': 'application/json' },
      });

      if (status === 400) {
        const message = 'message' in data ? data.message : 'Unauthorized';
        customToast(message, 'is-warning');
        return;
      }

      if ('email' in data.record && 'token' in data) {
        customToast(`Logged in as ${data.record.email}`, 'is-success');

        const user: User = data.record;

        // add user token to user object
        user.token = data.token;

        // update stored user data
        updateUser(data.record);
      }
    } catch (errorResponse) {
      customToast('Invalid email / password combo', 'is-warning');
    }
  }

  async function signin(email: string, password: string): Promise<void> {
    authServerCall('/collections/users/auth-with-password', email, password);
  }
  async function signup(
    email: string,
    password: string,
    passwordConfirm: string
  ): Promise<void> {
    authServerCall(
      '/collections/users/records',
      email,
      password,
      passwordConfirm
    );
  }

  function signout(): void {
    // clear user from stored user data
    clearUser();
    customToast('Logged out!', 'is-info');
  }

  // Return the user object and auth methods
  return {
    signin,
    signup,
    signout,
  };
}
