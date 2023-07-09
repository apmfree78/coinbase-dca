import { axiosDatabaseInstance } from '../../axios/databaseConfig';
import type {
  PaginationData,
  PurchaseOrder,
  PostSubmittedOrderPayload,
  PostSubmittedResponse,
  PatchSubmittedOrderPayload,
  User,
  AbbreviatedUserWithOrders,
  PatchUserPayload,
  SubmittedOrder,
} from '../../shared/databaseTypes';
import {
  purchaseOrdersPath,
  userPath,
  submittedOrderPath,
} from '../../axios/constants';
import {
  fetchPaginatedData,
  fetchPaginatedExpandedData,
} from '../fetchPaginatedData';
import { patchData } from '../patchData';
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
export const patchUser = (userId: string, payload: PatchUserPayload) =>
  patchData<User, PatchUserPayload>(
    userId,
    userPath,
    payload,
    axiosDatabaseInstance,
  );

// obtain purchase orders for all users by page number
export const getActiveUserWithOrders = (page: number) =>
  fetchPaginatedExpandedData<PaginationData<AbbreviatedUserWithOrders>>(
    page,
    userPath,
    'dca_orders',
    'id,email,expand,membership,submitted_orders,status',
    "(status = 'active')",
    axiosDatabaseInstance,
  );

// obtain purchase orders for all users by page number
export const getSubmittedOrders = (page: number) =>
  fetchPaginatedExpandedData<PaginationData<SubmittedOrder>>(
    page,
    submittedOrderPath,
    '',
    '',
    '(isFilled = false)',
    axiosDatabaseInstance,
  );

// obtain submitted orders for all users by page number
export const patchSubmittedOrder = (
  id: string,
  payload: PatchSubmittedOrderPayload,
) =>
  patchData<SubmittedOrder, PatchSubmittedOrderPayload>(
    id,
    submittedOrderPath,
    payload,
    axiosDatabaseInstance,
  );

// post submitted order to database
export const postSubmittedOrder = (payload: PostSubmittedOrderPayload) =>
  postData<PostSubmittedResponse, PostSubmittedOrderPayload>(
    submittedOrderPath,
    payload,
    axiosDatabaseInstance,
  );
