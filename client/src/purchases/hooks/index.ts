import { submittedOrdersPath } from 'react-query/constants';
import { queryKeys } from 'react-query/constants';
import {
  useUserPaginatedData,
  UsePaginatedData,
} from 'react-query/hooks/useUserPaginatedData';
import type { SubmittedOrder } from 'shared/types';

// **********************************************************
// **********************************************************
// export custom hook to obtain specific data types
// **********************************************************
// **********************************************************

export const useUserSubmittedOrders = (): UsePaginatedData<SubmittedOrder> =>
  useUserPaginatedData<SubmittedOrder>(
    submittedOrdersPath,
    queryKeys.purchases,
    '-created'
  );
