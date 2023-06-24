import { AxiosResponse, AxiosInstance } from 'axios';
import type { CollectionId } from 'shared/types';

export async function postData<T extends CollectionId, K>(
  urlPath: string,
  payload: K,
  axiosConnectionInstance: AxiosInstance,
): Promise<T | null> {
  try {
    const { data }: AxiosResponse<T> = await axiosConnectionInstance.post(
      urlPath,
      payload,
    );
    return data;
  } catch (err) {
    console.warn('error posting data');
    return null;
  }
}
