import { AxiosResponse } from 'axios';
import { axiosInstance, getJWTHeader } from 'axiosInstance';
import { customToast } from 'components/Toast';
import { useUser } from 'user/hooks/useUser';
import { useMutation } from 'react-query';
import { queryKeys } from 'react-query/constants';
import { queryClient } from 'react-query/queryClient';
import type { User, CollectionId } from 'shared/types';

async function patchData<T extends CollectionId, K>(
  id: string,
  user: User | null,
  urlPath: string,
  payload: K
): Promise<T | null> {
  if (!user) return null;
  const { data }: AxiosResponse<T> = await axiosInstance.patch(
    `${urlPath}/${id}`,
    payload,
    { headers: getJWTHeader(user) }
  );
  return data;
}

// hook to create new post
export function usePatchData<T extends CollectionId, K>(urlPath: string) {
  const { user } = useUser();

  const { isSuccess, isLoading, isError, error, mutate } = useMutation(
    ({ id, payload }: { id: string; payload: K }) =>
      patchData<T, K>(id, user, urlPath, payload),
    {
      onSuccess: () => {
        //clear cache
        queryClient.invalidateQueries([queryKeys.orders]);
        customToast(`${queryKeys.orders} updated`, 'is-success');
      },
    }
  );

  return { mutate, isSuccess, isLoading, isError, error };
}
