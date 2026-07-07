import { create } from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  setUser: (user: any, token?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => set((state) => ({ 
    user, 
    token: token !== undefined ? token : state.token 
  })),
  logout: () => set({ user: null, token: null }),
}));
