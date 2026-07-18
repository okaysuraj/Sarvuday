import { apiClient as api } from './client';

export const insightsApi = {
  getSummary: async () => {
    // The router is mounted at /ai-insights and internal prefix is /ai
    const response = await api.get('/ai-insights/ai/summary');
    return response.data;
  }
};
