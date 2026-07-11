import { apiClient as api } from './client';

export const paymentsApi = {
  getPaymentHistory: async (limit = 10, offset = 0) => {
    const response = await api.get(`/user/payments`, { params: { limit, offset } });
    return response.data;
  },

  getPaymentDetails: async (paymentId: string) => {
    const response = await api.get(`/user/payments/${paymentId}`);
    return response.data;
  },

  initiatePayment: async (data: { appointment_id: string, amount: number, payment_method: string, currency?: string }) => {
    const response = await api.post(`/user/payments/initiate`, data);
    return response.data;
  },

  verifyPayment: async (data: any) => {
    const response = await api.post(`/user/payments/verify`, data);
    return response.data;
  }
};
