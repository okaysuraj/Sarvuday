import axios from 'axios';
import BASE_URL from '../config/apiConfig';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
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
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle unauthorized errors (e.g., token expiration)
      if (error.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('onboardingData');
        window.location.href = '/login';
      } else {
        // Show generic error or specific backend message
        const message = error.response.data?.detail || error.response.data?.message || "An error occurred";
        toast.error(message);
      }
    } else {
      toast.error("Network error. Please try again later.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
