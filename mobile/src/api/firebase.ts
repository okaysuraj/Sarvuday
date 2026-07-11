import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
// @ts-expect-error: getReactNativePersistence is not exposed in the default types but exists at runtime in React Native
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase using Expo environment variables
// The user will add these to the mobile/.env file
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'MISSING_API_KEY',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'sarvuday-aca5b.firebaseapp.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'sarvuday-aca5b',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'sarvuday-aca5b.appspot.com',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'MISSING_SENDER_ID',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || 'MISSING_APP_ID'
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Auth with AsyncStorage for persistence in React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export default app;
