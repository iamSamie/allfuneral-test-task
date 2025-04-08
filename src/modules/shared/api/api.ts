import axios, { AxiosError } from 'axios';
import {
  login,
  clearToken,
  getTokenFromCookie,
} from '@/modules/auth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getTokenFromCookie();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    if (axios.isAxiosError(error) && error.response?.status === 401 && error.config) {
      const config = error.config;

      try {
        const newToken = await login('USERNAME');

        if (config.headers && typeof config.headers.set === 'function') {
          config.headers.set('Authorization', `Bearer ${newToken}`);
        }

        return await api.request(config);
      } catch (err) {
        clearToken();
        console.warn('Не удалось обновить токен');
      }
    }

    return Promise.reject(error);
  },
);
