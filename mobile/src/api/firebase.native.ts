// Native authentication persists Firebase sessions in AsyncStorage.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, initializeAuth } from 'firebase/auth';
// Firebase selects this export on React Native; its default browser types omit it.
// @ts-expect-error React Native conditional export.
import { getReactNativePersistence } from 'firebase/auth';
import { app } from './firebase-app';

function initializeNativeAuth() {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    // Fast Refresh can revisit an app whose authentication is already initialized.
    if ((error as { code?: string }).code === 'auth/already-initialized') return getAuth(app);
    throw error;
  }
}

export const auth = initializeNativeAuth();
export default app;
