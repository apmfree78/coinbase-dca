import { AxiosResponse } from 'axios';
import { axiosInstance, getJWTHeader } from 'axiosInstance';
import type { User } from 'shared/types';

async function patchUser(user: User | null): Promise<User | null> {
  if (!user) return null;
  const payload: Partial<User> = { ...user };
  delete payload.id;
  delete payload.token;
  const { data }: AxiosResponse<User> = await axiosInstance.patch(
    `/collections/users/records/${user.id}`,
    payload,
    { headers: getJWTHeader() }
  );
  return data;
}

interface UseUser {
  updateUser: (user: User) => void;
}

export function useUser(): UseUser {
  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    console.log('updating user', newUser);
    patchUser(newUser);
  }

  return { updateUser };
}
