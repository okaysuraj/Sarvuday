import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// The base URL should ideally come from environment variables.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:8000'; // Adjust for Android emulator if needed

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
