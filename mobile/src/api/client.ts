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
apiClient.interceptors.request.use((config) => {
  if (API_CONFIGURATION_ERROR) throw new Error(API_CONFIGURATION_ERROR);
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401) useAuthStore.getState().logout();
  return Promise.reject(error);
});

/** Compatibility for older screens while sharing the same auth and URL policy. */
export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  if (API_CONFIGURATION_ERROR) throw new Error(API_CONFIGURATION_ERROR);
  const target = new URL(url);
  if (target.origin !== new URL(BASE_URL).origin) throw new Error('Unexpected API server.');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  const headers = new Headers(options.headers);
  const token = useAuthStore.getState().token;
  if (token) headers.set('Authorization', `Bearer ${token}`);
  try {
    const response = await fetch(url, { ...options, headers, signal: controller.signal });
    if (response.status === 401) useAuthStore.getState().logout();
    return response;
  } finally {
    clearTimeout(timeout);
  }
}
