import { AxiosResponse } from 'axios';
import { axiosInstance, getJWTHeader } from 'axiosInstance';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { queryKeys } from 'react-query/constants';
import type { PaginationData, User } from 'shared/types';
import { useAuthContext } from 'auth/authContext';

const ordersPerPage = 8;

//fetch user posts with authorization token
async function fetchPaginatedData<T>(
  user: User | null,
  pageNumber: number,
  urlPath: string,
  sort = ''
): Promise<PaginationData<T> | null> {
  if (!user) return null;
  const { data }: AxiosResponse<PaginationData<T>> = await axiosInstance.get(
    `${urlPath}?perPage=${ordersPerPage}&page=${pageNumber}&sort=${sort}`,
    { headers: getJWTHeader() }
  );
  return data;
}

export interface UsePaginatedData<T> {
  paginatedData: T[] | null;
  isLoading: boolean;
  page: number;
  totalPages: number;
  totalItems: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

// hooks that returns user data by page
export function useUserPaginatedData<T>(
  urlPath: string,
  queryKey: string,
  sort = ''
): UsePaginatedData<T> {
  // userUserPosts will handle page state
  const [page, setPage] = useState(1);
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  // get user orders from pocketbase
  const { data: orderData, isLoading } = useQuery(
    [queryKey, queryKeys.user, page],
    () => fetchPaginatedData<T>(user, page, urlPath, sort),
    { enabled: !!user }
  );

  const paginatedData = orderData?.items || null;
  const totalPages = orderData?.totalPages || 0;
  const totalItems = orderData?.totalItems || 0;

  // prefetch next page data, if not at last page
  useEffect(() => {
    if (page < totalPages) {
      queryClient.prefetchQuery([queryKey, queryKeys.user, page + 1], () =>
        fetchPaginatedData<T>(user, page + 1, urlPath, sort)
      );
    }
  }, [page, user, queryClient, queryKey, sort, totalPages, urlPath]);

  return {
    paginatedData,
    isLoading,
    totalPages,
    totalItems,
    page,
    setPage,
  };
}
