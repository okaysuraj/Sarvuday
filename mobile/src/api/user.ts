import { apiClient } from './client';

export const userApi = {
  getProfile: async () => {
    const response = await apiClient.get('/normal_user/dashboard/profile');
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

    const response = await apiClient.patch('/normal_user/dashboard/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  
  getPatientDashboard: async () => {
    const response = await apiClient.get('/normal_user/dashboard');
    return response.data;
  },
  
  getTherapistDashboard: async () => {
    const response = await apiClient.get('/counsellor/dashboard');
    return response.data;
  },

  getAdminDashboard: async () => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  },

  getTherapists: async () => {
    const response = await apiClient.get('/content/counsellors');
    return response.data;
  },

  getTherapistById: async (id: string) => {
    const response = await apiClient.get(`/content/counsellors/${id}`);
    return response.data;
  }
};
