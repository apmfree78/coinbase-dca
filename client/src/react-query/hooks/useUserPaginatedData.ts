import { AxiosResponse } from 'axios';
import { axiosInstance, getJWTHeader } from 'axiosInstance';
import { useUser } from 'user/hooks/useUser';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { queryKeys } from 'react-query/constants';
import type { PaginationData, User } from 'shared/types';

const maxOrderPage = 5;
const ordersPerPage = 10;

//fetch user posts with authorization token
async function fetchPaginatedData<T>(
  user: User | null,
  pageNumber: number,
  urlPath: string
): Promise<PaginationData<T> | null> {
  if (!user) return null;
  const { data }: AxiosResponse<PaginationData<T>> = await axiosInstance.get(
    `${urlPath}?perPage=${ordersPerPage}&page=${pageNumber}`,
    { headers: getJWTHeader(user) }
  );
  return data;
}

interface UsePaginatedData<T> {
  paginatedData: T[] | null;
  isLoading: boolean;
  page: number;
  totalPages: number;
  totalItems: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

// hooks that returns user data by page
export function useUserPosts<T>(urlPath: string): UsePaginatedData<T> {
  // userUserPosts will handle page state
  const [page, setPage] = useState(1);
  const { user } = useUser();
  const queryClient = useQueryClient();

  // get user orders from pocketbase
  const { data: orderData, isLoading } = useQuery(
    [queryKeys.orders, queryKeys.user, page],
    () => fetchPaginatedData<T>(user, page, urlPath),
    { enabled: !!user }
  );

  // prefetch next page data, if not at last page
  useEffect(() => {
    if (page < maxOrderPage) {
      queryClient.prefetchQuery(
        [queryKeys.orders, queryKeys.user, page + 1],
        () => fetchPaginatedData<T>(user, page + 1, urlPath)
      );
    }
  }, [page, user, queryClient]);

  const paginatedData = orderData?.items || null;
  const totalPages = orderData?.totalPages || 0;
  const totalItems = orderData?.totalItems || 0;

  return {
    paginatedData,
    isLoading,
    totalPages,
    totalItems,
    page,
    setPage,
  };
}
