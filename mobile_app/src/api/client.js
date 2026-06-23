import axios from 'axios';

// IMPORTANT: When running on an Android Emulator, use 10.0.2.2 instead of localhost
// If testing on a physical device, use your computer's local IP address (e.g. 192.168.1.x)
const API_URL = 'http://10.0.2.2:8000'; // Default for Android Emulator to host

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example API call to test backend connection
export const fetchWelcomeMessage = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default apiClient;
