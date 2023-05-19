import axios, {InternalAxiosRequestConfig} from 'axios';
import {generateSignature} from './generateSignature';
import {CoinbaseOrderRequest} from '../coin.config';

const axiosInstance = axios.create({
  baseURL: 'https://api.coinbase.com/api/v3/brokerage',
  responseType: 'json',
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<CoinbaseOrderRequest>) => {
    // geting signature for axios call using api secret
    const {signature, timestamp} = generateSignature(
      config.method || 'get',
      config.url as string,
      config.data as CoinbaseOrderRequest,
    );

    config.headers['cb-access-key'] = process.env.API_KEY;
    config.headers['cb-access-sign'] = signature;
    config.headers['cb-access-timestamp'] = timestamp;
    console.log('API KEY', config.headers['cb-access-key']);
    console.log('signature', config.headers['cb-access-sign']);
    console.log('timestamp', config.headers['cb-access-timestamp']);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export {axiosInstance};
