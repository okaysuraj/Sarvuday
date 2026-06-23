import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter, useSegments } from 'expo-router';
import apiClient from '../api/client';

type AuthContextType = {
  userToken: string | null;
  userType: string | null;
  isLoading: boolean;
  login: (token: string, type: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const setStorageItemAsync = async (key: string, value: string) => {
  if (Platform.OS === 'web') {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

const getStorageItemAsync = async (key: string) => {
  if (Platform.OS === 'web') {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Local storage is unavailable:', e);
      return null;
    }
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

const deleteStorageItemAsync = async (key: string) => {
  if (Platform.OS === 'web') {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Load token on startup
    const loadToken = async () => {
      try {
        const token = await getStorageItemAsync('accessToken');
        const type = await getStorageItemAsync('userType');
        if (token) {
          setUserToken(token);
          setUserType(type);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('Error loading token', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = (segments[0] as string) === '(auth)';

    if (userToken && inAuthGroup) {
      // Redirect to tabs if authenticated and trying to access auth screens
      router.replace('/(tabs)' as any);
    }
  }, [userToken, segments, isLoading]);

  const login = async (token: string, type: string) => {
    await setStorageItemAsync('accessToken', token);
    await setStorageItemAsync('userType', type);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUserToken(token);
    setUserType(type);
  };

  const logout = async () => {
    await deleteStorageItemAsync('accessToken');
    await deleteStorageItemAsync('userType');
    delete apiClient.defaults.headers.common['Authorization'];
    setUserToken(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, userType, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
