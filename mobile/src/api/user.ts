import { useAuthStore } from '../store/authStore';
import { apiClient } from './client';

function profilePath() {
  const role = useAuthStore.getState().user?.role;
  const prefix = role === 'admin' ? 'admin' : role === 'therapist' ? 'counsellor' : 'user';
  return `/${prefix}/dashboard/profile`;
}

export const userApi = {
  getProfile: async () => {
    const response = await apiClient.get(profilePath());
    return response.data;
  },

  updateProfile: async (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    const response = await apiClient.patch(profilePath(), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
