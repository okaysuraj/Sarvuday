import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// The base URL should ideally come from environment variables.
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.37:8000';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
