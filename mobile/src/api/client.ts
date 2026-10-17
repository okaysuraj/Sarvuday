import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { API_CONFIGURATION_ERROR, BASE_URL } from './config';

export { BASE_URL } from './config';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    if (API_CONFIGURATION_ERROR) throw new Error(API_CONFIGURATION_ERROR);
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) useAuthStore.getState().logout();
    return Promise.reject(error);
  },
);
