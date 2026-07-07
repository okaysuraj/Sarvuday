import axios from 'axios';

// The base URL should ideally come from environment variables.
// For now, we will assume the backend is running locally.
// Android emulator uses 10.0.2.2 for localhost.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:8000';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for auth token if available
apiClient.interceptors.request.use((config) => {
  // TODO: Add token to headers from secure storage
  return config;
});
