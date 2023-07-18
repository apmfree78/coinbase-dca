import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from 'axiosInstance/constants';
import { getStoredToken } from 'user-storage';

export function getJWTHeader(): Record<string, string> {
  return { Authorization: `Bearer ${getStoredToken()}` };
}

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
