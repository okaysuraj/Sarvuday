import { apiClient } from './client';

export interface AssessmentQuestion {
  id: number;
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
  final_score: number;
  max_score: number;
  result: string;
}

export const assessmentsApi = {
  submitScore: async (
    type: 'phq9' | 'bdi' | 'hdrs',
    answers: { question_id: number; selected_option_score: number }[],
  ): Promise<ScoreResponse> => {
    const response = await apiClient.post(`/assessments/score/${type}`, {
      responses: answers,
    });
    return response.data;
  },
};
