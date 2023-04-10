import axios from 'axios';
import { ApiUrls, LocalStorageKeys } from '@utils';

export const api = axios.create({
  baseURL: ApiUrls.Base,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(LocalStorageKeys.Token);

    if (!token) return config;

    config.headers.set('Authorization', `Bearer ${JSON.parse(token)}`);

    return config;
  },
  (err) => {
    console.log('Authorization error', err);
  }
);
