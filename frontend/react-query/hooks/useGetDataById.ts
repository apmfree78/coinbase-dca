import { AxiosResponse } from 'axios';
import { axiosInstance, getJWTHeader } from 'axiosInstance';
import { useQuery } from 'react-query';
import { queryKeys } from 'react-query/constants';
import type { User } from 'shared/types';
import { useAuthContext } from 'auth/authContext';

async function fetchUserDataById<T>(
  id: string | null,
  user: User | null,
  urlPath: string
): Promise<T | null> {
  if (!user || !id) return null;
  const { data }: AxiosResponse<T> = await axiosInstance.get(
    `${urlPath}/${id}`,
    { headers: getJWTHeader() }
  );
  return data;
}

interface UseData<T> {
  data: T | null;
}

// hook that returns post by ID and function to create new post and save posts
export function useGetDataById<T>(
  id: string | null = null,
  urlPath: string,
  queryKey: string
): UseData<T> {
  const { user } = useAuthContext();

  // load initial post
  // get post by id from pocketbase
  const { data } = useQuery(
    [queryKey, queryKeys.user, id],
    () => fetchUserDataById<T>(id, user, urlPath),
    { enabled: !!user }
  );

  return {
    data: data || null,
  };
}
