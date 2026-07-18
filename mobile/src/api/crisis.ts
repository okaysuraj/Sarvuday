import { apiClient as api } from './client';

export const crisisApi = {
  triggerSOS: async (data: { user_id: string, risk_level: string, source: string }) => {
    const response = await api.post('/ai-insights/ai/crisis-alert', data);
    return response.data;
  }
};
