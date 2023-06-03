import { AxiosResponse } from 'axios';
import { axiosInstance } from 'axiosInstance';
import { useUser } from 'user/hooks/useUser';
import { User } from 'shared/types';
import { useGlobalContext } from 'context';

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
  const { showToast } = useGlobalContext();

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
        showToast(message, 'error');
        return;
      }

      if ('email' in data.record && 'token' in data) {
        showToast(`Logged in as ${data.record.email}`, 'success');

        // update stored user data
        updateUser(data.record);
      }
    } catch (errorResponse) {
      // let message = SERVER_ERROR; //default error message

      // if (axios.isAxiosError(errorResponse)) message = errorResponse?.message;

      setToast('Invalid email / password combo', 'warning');
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
