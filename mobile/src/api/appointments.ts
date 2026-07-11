import { apiClient as api } from './client';

export const appointmentsApi = {
  getAppointments: async (role: string = 'patient') => {
    const endpoint = role === 'therapist' ? '/counsellor/appointments' : '/user/appointments';
    const response = await api.get(endpoint);
    return response.data;
  },
  
  searchTherapists: async (query?: string) => {
    // Backend returns all approved and active counsellors
    const response = await api.get(`/content/counsellors`);
    let therapists = response.data.counsellors || response.data || [];
    
    // Client-side filter if query provided
    if (query && therapists.length > 0) {
      const lowerQuery = query.toLowerCase();
      therapists = therapists.filter((t: any) => 
        t.name?.toLowerCase().includes(lowerQuery) || 
        t.specializations?.some((s: string) => s.toLowerCase().includes(lowerQuery))
      );
    }
    return therapists;
  },
  
  getTherapistProfile: async (id: string) => {
    const response = await api.get(`/content/counsellors`);
    const therapists = response.data.counsellors || response.data || [];
    const profile = therapists.find((t: any) => t.counsellor_id === id || t.id === id);
    if (!profile) throw new Error('Therapist not found');
    return profile;
  },

  getTherapistAvailability: async (counsellor_id: string, date: string) => {
    // Endpoint: /user/appointments/slots
    const response = await api.get(`/user/appointments/slots`, { params: { counsellor_id, date } });
    return response.data;
  },
  
  bookAppointment: async (data: { counsellor_id: string, availability_slot_id: string, reason?: string }) => {
    // POST /user/appointments
    const response = await api.post(`/user/appointments`, data);
    return response.data;
  }
};
