import axios from 'axios';
import { endpoints } from './endpoints';

const authApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

export const login = async (username: string): Promise<string> => {
  const res = await authApi.get(endpoints.auth(), {
    params: { user: username },
  });
  const token = res.headers['authorization']?.replace('Bearer ', '');

  if (!token) {
    throw new Error('No token received');
  }

  document.cookie = `access_token=${token}; path=/; max-age=3600`;

  return token;
};
