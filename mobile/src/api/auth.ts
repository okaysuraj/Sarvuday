import {
  createUserWithEmailAndPassword,
  getIdToken,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { api } from './client';
import { auth } from './firebase';

export const authApi = {
  login: async (email: string, password: string) => {
    // 1. Authenticate with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await getIdToken(userCredential.user);

    // 2. Send ID token to FastAPI backend
    const backendData = await api.post('/auth/firebase-login', { body: { id_token: idToken } });

    return {
      firebaseUser: userCredential.user,
      backendData,
    };
  },

  signUp: async (data: { email: string; password: string; name: string; user_type?: string }) => {
    // 1. Create account with Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const idToken = await getIdToken(userCredential.user);

    // 2. Register user in FastAPI backend
    const backendData = await api.post('/auth/firebase-register', {
      body: {
        id_token: idToken,
        user_type: data.user_type === 'therapist' ? 'counsellor' : 'normal_user',
        name: data.name,
        terms_accepted: true,
        privacy_policy_accepted: true,
      },
    });

    return {
      firebaseUser: userCredential.user,
      backendData,
    };
  },

  forgotPassword: async (email: string) => {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  },
};
