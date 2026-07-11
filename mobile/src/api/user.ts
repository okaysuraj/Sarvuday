import { apiClient } from './client';

export const userApi = {
  getProfile: async () => {
    const response = await apiClient.get('/user/dashboard/profile');
    return response.data;
  },
  
  updateProfile: async (data: any) => {
    // The backend uses Form data for update_profile, so we might need to send a FormData object if it includes files,
    // otherwise if it accepts JSON despite being Form(), we'd need to adapt.
    // For now, let's use FormData
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    const response = await apiClient.patch('/user/dashboard/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  
  getPatientDashboard: async () => {
    const response = await apiClient.get('/user/dashboard');
    return response.data;
  },
  
  getTherapistDashboard: async () => {
    const response = await apiClient.get('/counsellor/dashboard');
    return response.data;
  }
};
