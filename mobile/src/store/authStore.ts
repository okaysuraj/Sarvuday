import { create } from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: any, token: string) => void;
  setUser: (user: any, token?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  setUser: (user, token) => set((state) => ({ 
    user, 
    token: token !== undefined ? token : state.token,
    isAuthenticated: !!user 
  })),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));

export default useAuthStore;
