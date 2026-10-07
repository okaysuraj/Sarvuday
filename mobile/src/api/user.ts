import { apiClient } from './client';

export const userApi = {
  getProfile: async () => {
    const response = await apiClient.get('/user/dashboard/profile');
    return response.data;
  },
  
  updateProfile: async (data: any) => {
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
