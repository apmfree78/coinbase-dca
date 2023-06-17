import { AxiosResponse } from 'axios';
import { axiosDatabaseInstance, getJWTHeader } from '../axios/databaseConfig';
import type { PaginationData, PurchaseOrder, User } from '../shared/types';
import { purchaseOrdersPath } from '../axios/constants';

const ordersPerPage = 1000;

//fetch user posts with authorization token
async function fetchData<T>(
  // user: User | null,
  pageNumber: number,
  urlPath: string,
): Promise<PaginationData<T> | undefined> {
  // if (!user) return null;
  try {
    const { data }: AxiosResponse<PaginationData<T>> =
      await axiosDatabaseInstance.get(
        `${urlPath}?perPage=${ordersPerPage}&page=${pageNumber}`,
      );
    console.log(data);
    return data;
  } catch (err) {
    console.warn(err);
  }
}

export const getOrders = (page: number) =>
  fetchData<PaginationData<PurchaseOrder>>(page, purchaseOrdersPath);
