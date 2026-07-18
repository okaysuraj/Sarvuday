import api from './client';

export const therapistApi = {
  getTherapists: async () => {
    const response = await api.get('/user/therapists');
    return response.data;
  },
};
