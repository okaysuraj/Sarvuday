import { apiClient } from './client';

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

export interface AssessmentResponse {
  questions: AssessmentQuestion[];
  instructions?: string;
  title?: string;
}

export interface ScoreResponse {
  score: number;
  max_score: number;
  severity: string;
  interpretation?: string;
}

export const assessmentsApi = {
  getQuestions: async (type: 'phq9' | 'bdi' | 'hdrs'): Promise<AssessmentResponse> => {
    const response = await apiClient.get(`/assessments/${type}`);
    return response.data;
  },

  submitScore: async (type: 'phq9' | 'bdi' | 'hdrs', answers: { question_id: string; selected_option_score: number }[]): Promise<ScoreResponse> => {
    const response = await apiClient.post(`/assessments/score/${type}`, {
      answers
    });
    return response.data;
  }
};
