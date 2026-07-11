import { apiClient as api } from './client';

export const chatApi = {
  // --- Direct Messaging ---
  getChatRooms: async (userId: string) => {
    const response = await api.get(`/chat/rooms`, { params: { user_id: userId } });
    return response.data;
  },

  getChatHistory: async (roomId: string) => {
    const response = await api.get(`/chat/rooms/${roomId}/messages`);
    return response.data;
  },
  
  sendMessageREST: async (roomId: string, userId: string, message: string, senderType: string) => {
    const response = await api.post(`/chat/rooms/${roomId}/messages`, {
      content: message,
      sender_type: senderType,
      message_type: 'text'
    }, {
      params: { user_id: userId }
    });
    return response.data;
  },
  
  // --- AI Chat ---
  getAiSessions: async () => {
    const response = await api.get(`/ai/sessions`);
    return response.data;
  },

  getAiChatHistory: async (sessionId: string) => {
    const response = await api.get(`/ai/chat/${sessionId}`);
    return response.data;
  },

  sendAiMessage: async (message: string, sessionId?: string) => {
    const response = await api.post(`/ai/chat`, { message, session_id: sessionId });
    return response.data;
  },

  deleteAiSession: async (sessionId: string) => {
    const response = await api.delete(`/ai/sessions/${sessionId}`);
    return response.data;
  },

  getAiInsights: async () => {
    // We map this to match-counsellor for now or something similar.
    // The backend provides /ai/match-counsellor
    const response = await api.get(`/ai/match-counsellor`);
    return response.data;
  },
};
