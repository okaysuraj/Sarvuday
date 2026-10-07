import { apiClient as api } from './client';

export const paymentsApi = {
  getPaymentHistory: async (limit = 10, offset = 0) => {
    const response = await api.get(`/payments/history`);
    return response.data;
  },

  getPaymentDetails: async (paymentId: string) => {
    const response = await api.get(`/user/payments/${paymentId}`);
    return response.data;
  },

  initiatePayment: async (data: { appointment_id?: string, amount: number, payment_method?: string, currency?: string }) => {
    const response = await api.post(`/payments/create-intent`, {
      amount: data.amount,
      currency: data.currency || 'inr',
      appointment_id: data.appointment_id
    });
    return response.data;
  },

  topupWallet: async (amount: number) => {
    const response = await api.post(`/payments/wallet/topup`, { amount });
    return response.data;
  },

  getWallet: async () => {
    const response = await api.get(`/payments/wallet`);
    return response.data;
  }
};
