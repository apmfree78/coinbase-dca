import { AxiosResponse } from 'axios';
import { axiosInstance, getJWTHeader } from 'axiosInstance';
import { useUser } from 'user/hooks/useUser';
import { useQuery } from 'react-query';
import { queryKeys } from 'react-query/constants';
import type { User } from 'shared/types';

async function fetchUserDataById<T>(
  id: string | null,
  user: User | null,
  urlPath: string
): Promise<T | null> {
  if (!user || !id) return null;
  const { data }: AxiosResponse<T> = await axiosInstance.get(
    `${urlPath}/${id}`,
    { headers: getJWTHeader(user) }
  );
  return data;
}

interface UseData<T> {
  data: T | null;
}

// hook that returns post by ID and function to create new post and save posts
export function useGetDataById<T>(
  id: string | null = null,
  urlPath: string
): UseData<T> {
  const { user } = useUser();

  // load initial post
  // get post by id from pocketbase
  const { data } = useQuery(
    [queryKeys.orders, queryKeys.user, id],
    () => fetchUserDataById<T>(id, user, urlPath),
    { enabled: !!user }
  );

  return {
    data: data || null,
  };
}
