import { purchaseOrdersPath } from 'react-query/constants';
import { useDeleteData } from 'react-query/hooks/useDeleteData';
import { queryKeys } from 'react-query/constants';
import { useGetDataById } from 'react-query/hooks/useGetDataById';
import { usePostData } from 'react-query/hooks/usePostData';
import { usePatchData } from 'react-query/hooks/usePatchData';
import { useUserPaginatedData } from 'react-query/hooks/useUserPaginatedData';
import type {
  PurchaseOrder,
  PostOrderPayload,
  PatchOrderPayload,
} from 'shared/types';

// **********************************************************
// **********************************************************
// export custom hook to obtain specific data types
// **********************************************************
// **********************************************************
export const useDeletePurchaseOrder = () =>
  useDeleteData<PurchaseOrder>(purchaseOrdersPath, queryKeys.orders);

export const usePostPurchaseOrder = () =>
  usePostData<PurchaseOrder, PostOrderPayload>(
    purchaseOrdersPath,
    queryKeys.orders
  );

export const usePatchPurchaseOrder = () =>
  usePatchData<PurchaseOrder, PatchOrderPayload>(
    purchaseOrdersPath,
    queryKeys.orders
  );

export const useGetPurchaseOrderById = (id: string) =>
  useGetDataById<PurchaseOrder>(id, purchaseOrdersPath, queryKeys.orders);

export const useUserPurchaseOrders = () =>
  useUserPaginatedData<PurchaseOrder>(purchaseOrdersPath, queryKeys.orders);
