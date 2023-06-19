import { AxiosResponse } from 'axios';
import { axiosDatabaseInstance } from '../axios/databaseConfig';
import type { PaginationData, PurchaseOrder } from '../shared/types';
import { purchaseOrdersPath } from '../axios/constants';

//fetch user posts with authorization token
async function fetchPaginatedData<T>(
  pageNumber: number,
  urlPath: string,
): Promise<T | undefined> {
  try {
    const response: AxiosResponse<T> = await axiosDatabaseInstance.get(
      `${urlPath}?page=${pageNumber}`,
    );
    console.log('data', response.data);

    return response.data;
  } catch (err) {
    console.warn(err);
  }
}

export const getOrders = (page: number) =>
  fetchPaginatedData<PaginationData<PurchaseOrder>>(page, purchaseOrdersPath);
