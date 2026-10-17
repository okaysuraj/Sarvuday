import { apiClient as api } from './client';

export const chatApi = {
  getRooms: async (userId: string) => {
    const response = await api.get('/chat/rooms', {
      params: { user_id: userId },
    });
    return response.data;
  },
};
