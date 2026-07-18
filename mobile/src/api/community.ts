import { apiClient as api } from './client';

export const communityApi = {
  getGroups: async () => {
    const response = await api.get('/community/groups');
    return response.data;
  },

  getGroupFeed: async (groupId: string) => {
    const response = await api.get(`/community/groups/${groupId}/feed`);
    return response.data;
  },

  createPost: async (data: { content: string, is_anonymous: boolean, has_trigger_warning: boolean, group_id?: string }) => {
    const response = await api.post('/community/posts', data);
    return response.data;
  },

  interactWithPost: async (postId: string, action: 'hug' | 'relate' | 'like') => {
    const response = await api.post(`/community/posts/${postId}/interact`, { action });
    return response.data;
  }
};
