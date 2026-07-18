import { apiClient as api } from './client';

export const walletApi = {
  getPaymentHistory: async (limit: number = 10, offset: number = 0) => {
    const response = await api.get(`/user/payments?limit=${limit}&offset=${offset}`);
    return response.data;
  },

  getPaymentDetails: async (paymentId: string) => {
    const response = await api.get(`/user/payments/${paymentId}`);
    return response.data;
  },

  initiatePayment: async (data: any) => {
    const response = await api.post('/user/payments/initiate', data);
    return response.data;
  },

  verifyPayment: async (data: any) => {
    const response = await api.post('/user/payments/verify', data);
    return response.data;
  }
};
