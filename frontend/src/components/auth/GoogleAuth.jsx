import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../config/firebase';
import axiosInstance from '../../utils/axiosInstance';

export default function GoogleAuth() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const login = async () => {
    setBusy(true); setError('');
    try {
      const idToken = await signInWithGoogle();
      if (!idToken) throw new Error('Google sign-in was not completed.');
      const { data } = await axiosInstance.post('/auth/firebase-login', { id_token: idToken });
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('userType', data.user_type);
      navigate(data.user_type === 'admin' ? '/admin-dashboard' : data.user_type === 'counsellor' ? '/counsellor-dashboard' : '/normal-user-dashboard', { replace: true });
    } catch { setError('Google sign-in could not complete. Confirm that your account is registered and try again.'); }
    finally { setBusy(false); }
  };
  return <div><button onClick={login} disabled={busy} className="btn-primary">{busy ? 'Signing in…' : 'Sign in with Google'}</button>{error && <p role="alert" className="mt-3">{error}</p>}</div>;
}
