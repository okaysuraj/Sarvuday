// Payloads and responses come from the backend contract shared with the web app.
import type { components } from '../../../shared/api-types';
import { api } from './client';
type Schema = components['schemas'];

export const trackingApi = {
  logMood: (body: Schema['MoodCreate']) => api.post('/user/tracking/mood', { body }),
  getMoodHistory: () => api.get('/user/tracking/mood/history'),
  submitJournal: (body: Schema['JournalCreate']) => api.post('/user/tracking/journal', { body }),
  getJournalEntries: () => api.get('/user/tracking/journal'),
  logSleep: (body: Schema['SleepCreate']) => api.post('/user/tracking/sleep', { body }),
  getSleepHistory: () => api.get('/user/tracking/sleep'),
  getMedications: () => api.get('/user/tracking/medications'),
  toggleMedication: (med_id: string) =>
    api.patch('/user/tracking/medications/{med_id}/toggle', { path: { med_id } }),
  addMedication: (body: Schema['MedicationCreate']) =>
    api.post('/user/tracking/medications', { body }),
  getGoals: () => api.get('/user/tracking/goals'),
};
