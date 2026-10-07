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

  getChatHistory: async (roomId: string) => {
    const response = await api.get(`/chat/rooms/${roomId}/messages`);
    return response.data;
  },

  sendMessage: async (roomId: string, data: { content: string, sender_type: string, message_type?: string }, userId: string) => {
    const response = await api.post(`/chat/rooms/${roomId}/messages`, data, { params: { user_id: userId } });
    return response.data;
  },

  sendMessageREST: async (roomId: string, userId?: string, content?: string, senderType?: string) => {
    const response = await api.post(
      `/chat/rooms/${roomId}/messages`,
      { content: content || '', sender_type: senderType || 'patient' },
      { params: userId ? { user_id: userId } : undefined }
    );
    return response.data;
  },

  getAiSessions: async (userId?: string) => {
    const response = await api.get('/ai/sessions', { params: userId ? { user_id: userId } : undefined });
    return response.data;
  },

  getAiChatHistory: async (sessionId: string) => {
    const response = await api.get(`/ai/sessions/${sessionId}/history`);
    return response.data;
  },

  sendAiMessage: async (sessionId?: string, message?: string) => {
    const response = await api.post('/ai/chat', { session_id: sessionId, message });
    return response.data;
  }
};
