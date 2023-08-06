import { axiosInstance } from 'axiosInstance';
import axios, { AxiosResponse } from 'axios';
import { setStoredToken, clearStoredToken } from 'user-storage';
import { User } from 'shared/types';
import { useAuthContext } from 'auth/authContext';
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
  const { saveUser } = useAuthContext();

  async function authServerCall(
    urlEndpoint: string,
    email: string,
    password: string,
    passwordConfirm?: string
  ): Promise<void> {
    let requestData: object; // body of request , holds email , password etc

    // if sign up passwordConfirm exists, other wise it's a user sign in
    if (passwordConfirm)
      requestData = {
        email,
        password,
        passwordConfirm,
        status: 'active',
        membership: 'free',
      };
    else requestData = { identity: email, password };

    try {
      const { data, status }: CustomAxiosResponse = await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: requestData,
        headers: { 'Content-Type': 'application/json' },
      });

      if (status !== 200) {
        const message = 'message' in data ? data.message : 'Unauthorized';
        customToast(message, 'is-warning');
        return;
      }

      // if new user was created then show success message and exit
      if (passwordConfirm) {
        customToast(
          'sign up successful...go to sign in page to login',
          'is-success',
          7000
        );
        return;
      }

      if ('email' in data.record && 'token' in data) {
        customToast(`Logged in as ${data.record.email}`, 'is-success');

        const user: User = data.record;

        //update global auth context
        saveUser(user);

        // add user token to user object
        setStoredToken(data.token);
      }
    } catch (err) {
      console.info(err);
      let message: string;
      if (axios.isAxiosError(err)) {
        message = err?.response?.data.message;
      } else if (err instanceof Error) {
        message = err.message;
      } else {
        message = 'unknown error occurred';
      }
      customToast(message, 'is-warning');
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
    clearStoredToken();
    saveUser(null);
    customToast('Logged out!', 'is-info');
  }

  // Return the user object and auth methods
  return {
    signin,
    signup,
    signout,
  };
}
