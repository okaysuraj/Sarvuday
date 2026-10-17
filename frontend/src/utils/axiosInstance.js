import axios from 'axios';
import { createApi, apiErrorMessage } from '../../../shared/api';
import { toast } from 'react-toastify';
import BASE_URL from '../config/apiConfig';
import { clearSession, getAccessToken } from './session';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Every API consumer gets the same message format and expired-session policy.
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);
    const message = apiErrorMessage(error);
    error.userMessage = message;
    if (error.response) {
      // Handle unauthorized errors (e.g., token expiration)
      if (
        error.response.status === 401 &&
        getAccessToken() &&
        !error.config?.url?.startsWith('/auth/')
      ) {
        toast.error('Session expired. Please log in again.', {
          toastId: 'session-expired',
        });
        clearSession();
        window.location.href = '/login';
      } else if (!error.config?.silent) {
        // Show generic error or specific backend message
        toast.error(message);
      }
    } else if (!error.config?.silent) {
      toast.error(message, { toastId: 'network-error' });
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

export const api = createApi(axiosInstance);
