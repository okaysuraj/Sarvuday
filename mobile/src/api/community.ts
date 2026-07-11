import { apiClient as api } from './client';

export const communityApi = {
  getGroups: async () => {
    const response = await api.get(`/community/groups`);
    return response.data;
  },
  
  getFeed: async (groupId?: string) => {
    const endpoint = groupId ? `/community/groups/${groupId}/feed` : `/community/feed`;
    const response = await api.get(endpoint);
    return response.data;
  },
  
  createPost: async (data: { content: string, isAnonymous: boolean, hasTriggerWarning: boolean, groupId?: string }) => {
    const response = await api.post(`/community/posts`, data);
    return response.data;
  },
  
  interactWithPost: async (postId: string, action: 'hug' | 'relate') => {
    const response = await api.post(`/community/posts/${postId}/interact`, { action });
    return response.data;
  }
};
