import { apiClient as api } from './client';

export const trackingApi = {
  logMood: async (data: { moodIndex: number, energy_level?: number, anxiety_level?: number, sleep_quality?: string, notes?: string }) => {
    const response = await api.post('/user/tracking/mood', data);
    return response.data;
  },

  getMoodHistory: async () => {
    const response = await api.get('/user/tracking/mood/history');
    return response.data;
  },

  submitJournal: async (data: { text: string }) => {
    const response = await api.post('/user/tracking/journal', data);
    return response.data;
  },

  getJournalEntries: async () => {
    const response = await api.get('/user/tracking/journal');
    return response.data;
  },

  logSleep: async (data: { date: string, duration_hours: number, quality: string }) => {
    const response = await api.post('/user/tracking/sleep', data);
    return response.data;
  },

  getSleepHistory: async () => {
    const response = await api.get('/user/tracking/sleep');
    return response.data;
  },

  getMedications: async () => {
    const response = await api.get('/user/tracking/medications');
    return response.data;
  },

  getGoals: async () => {
    const response = await api.get('/user/tracking/goals');
    return response.data;
  }
};
