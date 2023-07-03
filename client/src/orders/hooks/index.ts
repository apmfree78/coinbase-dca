import { purchaseOrdersPath, submittedOrdersPath } from 'react-query/constants';
import { useDeleteData } from 'react-query/hooks/useDeleteData';
import { useGetDataById } from 'react-query/hooks/useGetDataById';
import { usePostData } from 'react-query/hooks/usePostData';
import { usePatchData } from 'react-query/hooks/usePatchData';
import { useUserPaginatedData } from 'react-query/hooks/useUserPaginatedData';
import type {
  PurchaseOrder,
  PostOrderPayload,
  PatchOrderPayload,
  SubmittedOrder,
} from 'shared/types';

// **********************************************************
// **********************************************************
// export custom hook to obtain specific data types
// **********************************************************
// **********************************************************
export const useDeletePurchaseOrder = () =>
  useDeleteData<PurchaseOrder>(purchaseOrdersPath);

export const usePostPurchaseOrder = () =>
  usePostData<PurchaseOrder, PostOrderPayload>(purchaseOrdersPath);

export const usePatchPurchaseOrder = () =>
  usePatchData<PurchaseOrder, PatchOrderPayload>(purchaseOrdersPath);

export const useGetPurchaseOrderById = (id: string) =>
  useGetDataById<PurchaseOrder>(id, purchaseOrdersPath);

export const useUserPurchaseOrders = () =>
  useUserPaginatedData<PurchaseOrder>(purchaseOrdersPath);

export const useUserSubmittedOrders = () =>
  useUserPaginatedData<SubmittedOrder>(submittedOrdersPath);
