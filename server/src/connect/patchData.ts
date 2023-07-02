import { AxiosResponse, AxiosInstance } from 'axios';

export async function patchData<T, K>(
  userId: string,
  urlPath: string,
  payload: K,
  axiosConnectionInstance: AxiosInstance,
): Promise<T | undefined> {
  try {
    const { data }: AxiosResponse<T> = await axiosConnectionInstance.patch(
      `${urlPath}/${userId}`,
      payload,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}
