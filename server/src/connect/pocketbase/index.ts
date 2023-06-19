import { axiosDatabaseInstance } from '../../axios/databaseConfig';
import type { PaginationData, PurchaseOrder, User } from '../../shared/types';
import { purchaseOrdersPath, userPath } from '../../axios/constants';
import {
  fetchPaginatedData,
  fetchPaginatedExpandedData,
} from '../fetchPaginatedData';

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
export const getUserWithOrders = (page: number) =>
  fetchPaginatedExpandedData<PaginationData<User>>(
    page,
    userPath,
    'dca_orders',
    'id,email,expand',
    axiosDatabaseInstance,
  );
