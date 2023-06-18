import axios, { InternalAxiosRequestConfig } from 'axios';
import { databaseAPI } from './constants';
import { adminUser } from '../connect/authenticate';

export const axiosDatabaseInstance = axios.create({
  baseURL: databaseAPI,
  responseType: 'json',
});

axiosDatabaseInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('token', adminUser.getToken());
    const token = adminUser.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);
