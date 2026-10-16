import axios from 'axios';
import BASE_URL from '../config/apiConfig';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);
    const detail = error.response?.data?.detail;
    const message = typeof detail === 'string' ? detail : Array.isArray(detail)
      ? detail.map(item => item.msg).filter(Boolean).join('. ')
      : typeof error.response?.data?.message === 'string' ? error.response.data.message
      : error.response ? 'The request could not be completed.' : 'Unable to reach the server. Please try again.';
    error.userMessage = message;
    if (error.response) {
      // Handle unauthorized errors (e.g., token expiration)
      if (error.response.status === 401 && localStorage.getItem('accessToken') && !error.config?.url?.startsWith('/auth/')) {
        toast.error("Session expired. Please log in again.", { toastId: 'session-expired' });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('onboardingData');
        window.location.href = '/login';
      } else if (!error.config?.silent) {
        // Show generic error or specific backend message
        toast.error(message);
      }
    } else if (!error.config?.silent) {
      toast.error(message, { toastId: 'network-error' });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
