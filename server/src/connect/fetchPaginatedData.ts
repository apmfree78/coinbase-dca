import { AxiosResponse, AxiosInstance } from 'axios';

//fetch user posts with authorization token
export async function fetchPaginatedData<T>(
  pageNumber: number,
  urlPath: string,
  axiosConnectionInstance: AxiosInstance,
): Promise<T | undefined> {
  try {
    const response: AxiosResponse<T> = await axiosConnectionInstance.get(
      `${urlPath}?page=${pageNumber}`,
    );
    return response.data;
  } catch (err) {
    console.warn('error fetching paginated data');
  }
}

//fetch user data with chosen relation fields expanded with authorization token
export async function fetchPaginatedExpandedData<T>(
  pageNumber: number,
  urlPath: string,
  expandFields: string, // "field1,field2,field3.."
  fields: string,
  filter: string, // (id = 'abc' && ..)
  axiosConnectionInstance: AxiosInstance,
): Promise<T | undefined> {
  try {
    const response: AxiosResponse<T> = await axiosConnectionInstance.get(
      `${urlPath}?page=${pageNumber}&expand=${expandFields}&fields=${fields}&filter=${filter}`,
    );
    // console.log('data', response.data);
    return response.data;
  } catch (err) {
    console.warn('error fetching paginated expanded data');
  }
}
