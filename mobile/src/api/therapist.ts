import { apiClient as api } from './client';

export const therapistApi = {
  getPatients: async () => {
    const response = await api.get(`/therapist/patients`);
    return response.data;
  },
  
  getPatientDetails: async (patientId: string) => {
    const response = await api.get(`/therapist/patients/${patientId}`);
    return response.data;
  },
  
  getEarnings: async () => {
    const response = await api.get(`/therapist/earnings`);
    return response.data;
  }
};
