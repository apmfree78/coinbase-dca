import { AxiosResponse } from 'axios';
import { axiosInstance, getJWTHeader } from 'axiosInstance';
import { customToast } from 'components/Toast';
import { useUser } from 'user/hooks/useUser';
import { useMutation } from 'react-query';
import { queryClient } from 'react-query/queryClient';
import type { User, CollectionId } from 'shared/types';
import { useAuthContext } from 'auth/authContext';

async function postNewData<T extends CollectionId, K>(
  user: User | null,
  urlPath: string,
  payload: K
): Promise<T | null> {
  if (!user) return null;
  const { data }: AxiosResponse<T> = await axiosInstance.post(
    urlPath,
    { ...payload, owner: user.id },
    { headers: getJWTHeader() }
  );
  return data;
}

// hook to create new post
export function usePostData<T extends CollectionId, K>(
  urlPath: string,
  queryKey: string
) {
  const { updateUser } = useUser();
  const { user } = useAuthContext();

  const { data, isSuccess, isLoading, isError, error, mutate } = useMutation(
    (payload: K) => postNewData<T, K>(user, urlPath, payload),
    {
      onSuccess: (data) => {
        // grab user
        if (user && data) {
          const newUser = {
            ...user,
            dca_orders: [...user.dca_orders, data.id],
          };
          updateUser(newUser);
        }
        //clear cache
        queryClient.invalidateQueries([queryKey]);
        customToast(`${queryKey} created`, 'is-success');
      },
    }
  );

  const id = data?.id;
  return { mutate, id, isSuccess, isLoading, isError, error };
}
