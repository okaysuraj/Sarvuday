import { apiClient as api } from './client';

export const notificationsApi = {
  getNotifications: async () => {
    // According to backend/app/routes/__init__.py, prefix is /notifications
    const response = await api.get('/notifications/');
    return response.data;
  },

  markAsRead: async (notificationId: string) => {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response.data;
  }
};
