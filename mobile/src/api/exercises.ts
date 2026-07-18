import { apiClient as api } from './client';

export const exercisesApi = {
  getExercises: async () => {
    const response = await api.get('/exercises/');
    return response.data;
  },

  getExerciseById: async (id: string) => {
    const response = await api.get(`/exercises/${id}`);
    return response.data;
  }
};
