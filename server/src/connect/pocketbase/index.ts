import { axiosDatabaseInstance } from '../../axios/databaseConfig';
import type {
  PaginationData,
  PurchaseOrder,
  PostSubmittedOrderPayload,
  PostSubmittedResponse,
  User,
  AbbreviatedUserWithOrders,
} from '../../shared/types';
import {
  purchaseOrdersPath,
  userPath,
  submittedOrderPath,
} from '../../axios/constants';
import {
  fetchPaginatedData,
  fetchPaginatedExpandedData,
} from '../fetchPaginatedData';
import { postData } from '../../connect/postData';

// obtain purchase orders for all users by page number
export const getOrders = (page: number) =>
  fetchPaginatedData<PaginationData<PurchaseOrder>>(
    page,
    purchaseOrdersPath,
    axiosDatabaseInstance,
  );

// obtain purchase orders for all users by page number
export const getUsers = (page: number) =>
  fetchPaginatedData<PaginationData<User>>(
    page,
    userPath,
    axiosDatabaseInstance,
  );

// obtain purchase orders for all users by page number
export const getActiveUserWithOrders = (page: number) =>
  fetchPaginatedExpandedData<PaginationData<AbbreviatedUserWithOrders>>(
    page,
    userPath,
    'dca_orders',
    'id,email,expand,membership',
    "(status = 'active')",
    axiosDatabaseInstance,
  );

export const postSubmittedOrder = (payload: PostSubmittedOrderPayload) =>
  postData<PostSubmittedResponse, PostSubmittedOrderPayload>(
    submittedOrderPath,
    payload,
    axiosDatabaseInstance,
  );
