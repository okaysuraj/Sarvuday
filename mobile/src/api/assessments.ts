import type { components } from '../../../shared/api-types';
import { api } from './client';

type Schema = components['schemas'];
export type AssessmentQuestion = Schema['QuestionSchema'];
export type AssessmentResponse = Schema['AssessmentSchema'];
export type ScoreResponse = Schema['ScoreResponseSchema'];

export const assessmentsApi = {
  submitScore(type: 'phq9' | 'bdi' | 'hdrs', responses: Schema['ScoreRequestSchema']['responses']) {
    return api.post(`/assessments/score/${type}`, { body: { responses } });
  },
};
