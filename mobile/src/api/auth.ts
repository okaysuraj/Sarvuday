import { apiClient } from './client';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getIdToken, sendPasswordResetEmail } from 'firebase/auth';

export const authApi = {
  login: async (email: string, password: string, user_type: string = 'patient') => {
    // 1. Authenticate with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await getIdToken(userCredential.user);

    // 2. Send ID token to FastAPI backend
    const response = await apiClient.post('/auth/firebase-login', {
      id_token: idToken,
      user_type: user_type
    });
    
    return {
      firebaseUser: userCredential.user,
      backendData: response.data
    };
  },
  
  signUp: async (data: { email: string; password: string; name: string; user_type?: string }) => {
    // 1. Create account with Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const idToken = await getIdToken(userCredential.user);

    // 2. Register user in FastAPI backend
    const response = await apiClient.post('/auth/firebase-register', {
      id_token: idToken,
      user_type: data.user_type || 'patient',
      name: data.name,
      terms_accepted: true,
      privacy_policy_accepted: true
    });
    
    return {
      firebaseUser: userCredential.user,
      backendData: response.data
    };
  },

  forgotPassword: async (email: string) => {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  }
};

