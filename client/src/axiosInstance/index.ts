import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "axiosInstance/constants";
import { User } from "shared/types";

export function getJWTHeader(user: User): Record<string, string> {
  return { Authorization: `Bearer ${user.token}` };
}

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
