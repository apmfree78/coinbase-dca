import axios from 'axios';
import { databaseAPI } from './constants';
import { adminUser } from '../connect/authenticate';

const axiosDatabaseInstance = axios.create({
  baseURL: databaseAPI,
  responseType: 'json',
  headers: { Authorization: `Bearer ${adminUser.getToken()}` },
});

export { axiosDatabaseInstance };
