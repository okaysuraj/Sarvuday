import { apiClient as api } from './client';

export const chatApi = {
  getRooms: async (userId: string) => {
    const response = await api.get('/chat/rooms', { params: { user_id: userId } });
    return response.data;
  },

  getMessages: async (roomId: string, limit: number = 100) => {
    const response = await api.get(`/chat/rooms/${roomId}/messages`, { params: { limit } });
    return response.data;
  },

  sendMessage: async (roomId: string, data: { content: string, sender_type: string, message_type?: string }, userId: string) => {
    const response = await api.post(`/chat/rooms/${roomId}/messages`, data, { params: { user_id: userId } });
    return response.data;
  }
};
