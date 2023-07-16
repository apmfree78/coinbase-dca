import axios, { InternalAxiosRequestConfig } from 'axios';
import { generateSignature } from './generateSignature';
import { CoinbaseOrderRequest } from '../shared/coin.config';

const axiosInstance = axios.create({
  baseURL: 'https://api.coinbase.com',
  responseType: 'json',
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<CoinbaseOrderRequest>) => {
    // geting signature for axios call using api secret
    // console.log('body', config.data);
    // console.log('method', config.method?.toUpperCase());
    // console.log('url', config.url);
    const method = config.method?.toUpperCase();
    const body = method === 'POST' ? JSON.stringify(config.data) : '';

    const { signature, timestamp } = generateSignature(
      config.method?.toUpperCase() || 'GET',
      config.url as string,
      body,
    );

    config.headers.accept = 'application/json';
    config.headers['CB-ACCESS-KEY'] = process.env.API_KEY;
    config.headers['CB-ACCESS-SIGN'] = signature;
    config.headers['CB-ACCESS-TIMESTAMP'] = parseInt(timestamp);
    // console.log('API KEY', config.headers['CB-ACCESS-KEY']);
    // console.log('signature', config.headers['CB-ACCESS-SIGN']);
    // console.log('timestamp', config.headers['CB-ACCESS-TIMESTAMP']);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { axiosInstance };
