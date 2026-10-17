import type { components } from '../../../shared/api-types';
import { api } from './client';

type Schema = components['schemas'];
export const communityApi = {
  getGroups: () => api.get('/community/groups'),
  getGroupFeed: (group_id: string) =>
    api.get('/community/groups/{group_id}/feed', { path: { group_id } }),
  getFeed: (group_id?: string) =>
    group_id
      ? api.get('/community/groups/{group_id}/feed', { path: { group_id } })
      : api.get('/community/feed'),
  createPost: (body: Schema['PostCreate']) => api.post('/community/posts', { body }),
  interactWithPost: (post_id: string, action: Schema['PostInteract']['action']) =>
    api.post('/community/posts/{post_id}/interact', { path: { post_id }, body: { action } }),
};
