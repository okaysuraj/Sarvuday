import { apiClient as api } from './client';

export const sessionApi = {
  submitSessionNotes: async (sessionId: string, notes: string) => {
    const response = await api.post(`/session/${sessionId}/notes`, { notes });
    return response.data;
  },
  
  submitSessionRating: async (sessionId: string, rating: number, feedback?: string) => {
    const response = await api.post(`/session/${sessionId}/rate`, { rating, feedback });
    return response.data;
  }
};
