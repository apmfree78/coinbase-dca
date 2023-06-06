import { AxiosResponse } from 'axios';
import { axiosInstance, getJWTHeader } from 'axiosInstance';
import { customToast } from 'components/Toast';
import { useUser } from 'user/hooks/useUser';
import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';
import { queryKeys } from 'react-query/constants';
import type { User } from 'shared/types';

//fetch user posts with authorization token
async function deleteUserData<T>(
  user: User | null,
  id: string,
  urlPath: string
): Promise<T | null> {
  if (!user) return null;
  const { data }: AxiosResponse<T> = await axiosInstance.delete(
    `${urlPath}/${id}`,
    { headers: getJWTHeader(user) }
  );
  return data;
}

type useDelete<T> = UseMutateFunction<T | null, unknown, string, unknown>;

export function useDeleteData<T>(urlPath: string): useDelete<T> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate } = useMutation(
    (id: string) => deleteUserData<T>(user, id, urlPath),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.orders]);
        customToast('Purchase Order has been deleted!', 'is-warning');
      },
    }
  );
  return mutate;
}
