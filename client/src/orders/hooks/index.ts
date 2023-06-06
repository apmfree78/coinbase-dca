import { purchaseOrdersPath } from 'react-query/constants';
import { useDeleteData } from 'react-query/hooks/useDeleteData';
import { useGetDataById } from 'react-query/hooks/useGetDataById';
import { usePostData } from 'react-query/hooks/usePostData';
import { useUserPosts } from 'react-query/hooks/useUserPaginatedData';
import type { PurchaseOrder, PurchaseOrderPayload } from 'shared/types';

// **********************************************************
// **********************************************************
// export custom hook to obtain specific data types
// **********************************************************
// **********************************************************
export const useDeletePurchaseOrder = () =>
  useDeleteData<PurchaseOrder>(purchaseOrdersPath);

export const usePostPurchaseOrder = () =>
  usePostData<PurchaseOrder, PurchaseOrderPayload>(purchaseOrdersPath);

export const useGetPurchaseOrderById = (id: string) =>
  useGetDataById<PurchaseOrder>(id, purchaseOrdersPath);

export const useUserPurchaseOrders = () =>
  useUserPosts<PurchaseOrder>(purchaseOrdersPath);
