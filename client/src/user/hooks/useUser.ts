import { AxiosResponse } from 'axios';
import { axiosInstance, getJWTHeader } from 'axiosInstance';
import { useQuery, useQueryClient } from 'react-query';
import { queryKeys } from 'react-query/constants';
import type { User } from 'shared/types';
import { clearStoredUser, getStoredUser, setStoredUser } from 'user-storage';

async function getUser(user: User | null): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<User> = await axiosInstance.get(
    `/collections/users/records/${user.id}`
  );
  return data;
}

async function patchUser(user: User | null): Promise<User | null> {
  if (!user) return null;
  const payload: any = { ...user };
  delete payload.id;
  delete payload.token;
  const { data }: AxiosResponse<User> = await axiosInstance.patch(
    `/collections/users/records/${user.id}`,
    payload,
    { headers: getJWTHeader(user) }
  );
  return data;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();
  const { data: user } = useQuery<any, unknown, User | null, string>(
    queryKeys.user,
    () => getUser(user || null),
    {
      initialData: getStoredUser(),
      onSuccess: (received: User | null) => {
        if (!received) {
          clearStoredUser();
        } else {
          setStoredUser(received);
        }
      },
    }
  );

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    console.log('updating user', newUser);
    patchUser(newUser);
    queryClient.setQueryData(queryKeys.user, newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    queryClient.setQueryData(queryKeys.user, null);
    queryClient.removeQueries([queryKeys.orders, queryKeys.user]);
  }

  if (user === undefined) return { user: null, updateUser, clearUser };
  else return { user, updateUser, clearUser };
}
