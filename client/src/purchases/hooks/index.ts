import { submittedOrdersPath } from 'react-query/constants';
import { queryKeys } from 'react-query/constants';
import { useUserPaginatedData } from 'react-query/hooks/useUserPaginatedData';
import type { SubmittedOrder } from 'shared/types';

// **********************************************************
// **********************************************************
// export custom hook to obtain specific data types
// **********************************************************
// **********************************************************

export const useUserSubmittedOrders = () =>
  useUserPaginatedData<SubmittedOrder>(
    submittedOrdersPath,
    queryKeys.purchases
  );
