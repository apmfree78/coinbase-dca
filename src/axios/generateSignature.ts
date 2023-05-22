import CryptoJS from 'crypto-js';
import url from 'url';
import {CoinbaseOrderRequest} from '../coin.config';

export function generateSignature(
  method: string,
  apiUrl: string,
  requestBody: string,
): {
  signature: string;
  timestamp: string;
} {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const path = '/' + url.parse(apiUrl).pathname;
  const str = timestamp + method + path + requestBody;
  const sig = sign(str, process.env.API_SECRET || '');
  return {signature: sig, timestamp};
}

function sign(str: string, secret: string) {
  const hash = CryptoJS.HmacSHA256(str, secret);
  return hash.toString();
}
