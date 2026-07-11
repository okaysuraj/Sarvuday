import { apiClient as api } from './client';

export const trackingApi = {
  logMood: async (data: { moodIndex: number, emotions?: string[], energy_level?: number, anxiety_level?: number, sleep_quality?: string, notes?: string }) => {
    const response = await api.post(`/user/tracking/mood`, data);
    return response.data;
  },
  
  submitJournalEntry: async (data: { text: string, triggers?: string[] }) => {
    const response = await api.post(`/user/tracking/journal`, data);
    return response.data;
  },
  
  getMoodHistory: async (params?: { startDate?: string, endDate?: string }) => {
    const response = await api.get(`/user/tracking/mood/history`, { params });
    return response.data;
  },
  
  getJournalEntries: async () => {
    const response = await api.get(`/user/tracking/journal`);
    return response.data;
  }
};
