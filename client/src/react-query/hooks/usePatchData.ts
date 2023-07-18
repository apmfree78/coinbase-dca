import { AxiosResponse } from 'axios';
import { axiosInstance, getJWTHeader } from 'axiosInstance';
import { customToast } from 'components/Toast';
import { useMutation } from 'react-query';
import { queryClient } from 'react-query/queryClient';
import type { User, CollectionId } from 'shared/types';
import { useAuthContext } from 'auth/authContext';

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
    { headers: getJWTHeader() }
  );
  return data;
}

// hook to create new post
export function usePatchData<T extends CollectionId, K>(
  urlPath: string,
  queryKey: string
) {
  const { user } = useAuthContext();

  const { isSuccess, isLoading, isError, error, mutate } = useMutation(
    ({ id, payload }: { id: string; payload: K }) =>
      patchData<T, K>(id, user, urlPath, payload),
    {
      onSuccess: () => {
        //clear cache
        queryClient.invalidateQueries([queryKey]);
        customToast(`${queryKey} updated`, 'is-success');
      },
    }
  );

  return { mutate, isSuccess, isLoading, isError, error };
}
