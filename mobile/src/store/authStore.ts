import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Persist the bearer only in the OS-protected store. Web sessions stay in memory.
const authStorage = {
  getItem: async (name: string) => {
    await AsyncStorage.removeItem('sarvuday-auth-storage');
    return Platform.OS === 'web' ? null : SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string) => {
    if (Platform.OS !== 'web') await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    if (Platform.OS !== 'web') await SecureStore.deleteItemAsync(name);
    await AsyncStorage.removeItem('sarvuday-auth-storage');
  },
};

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  login: (user: any, token: string) => void;
  setUser: (user: any, token?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      setUser: (user, token) =>
        set((state) => ({
          user,
          token: token !== undefined ? token : state.token,
          isAuthenticated: !!user && !!(token !== undefined ? token : state.token),
        })),
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        authStorage.removeItem('sarvuday-secure-auth').catch(() => {});
      },
    }),
    {
      name: 'sarvuday-secure-auth',
      storage: createJSONStorage(() => authStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (state) state.setHasHydrated(true);
        else if (error) queueMicrotask(() => useAuthStore.setState({ hasHydrated: true }));
      },
    },
  ),
);

export default useAuthStore;
