import { useSyncExternalStore } from 'react';
import { clearOnboarding } from './onboarding';

const SESSION_EVENT = 'sarvuday-session';
const DASHBOARDS = {
  normal_user: '/normal-user-dashboard',
  counsellor: '/counsellor-dashboard',
  admin: '/admin-dashboard',
};
const PROFILES = {
  normal_user: '/user/dashboard/profile',
  counsellor: '/counsellor/dashboard/profile',
  admin: '/admin/dashboard/profile',
};

export const getAccessToken = () => localStorage.getItem('accessToken');

function decodeSession(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
    const claims = JSON.parse(new TextDecoder().decode(bytes));
    if (
      typeof claims.sub !== 'string' ||
      !claims.sub ||
      !Number.isFinite(claims.exp) ||
      claims.exp * 1000 <= Date.now() ||
      !Object.hasOwn(DASHBOARDS, claims.user_type)
    )
      return null;
    // Claims guide navigation only. The backend verifies signatures and roles.
    return { token, userId: claims.sub, userType: claims.user_type };
  } catch {
    return null;
  }
}

export const getSession = () => decodeSession(getAccessToken());
export const dashboardPath = (role) => DASHBOARDS[role] || '/normal-user-dashboard';
export const profilePath = (role) => PROFILES[role] || '/user/dashboard/profile';

function subscribe(callback) {
  window.addEventListener('storage', callback);
  window.addEventListener(SESSION_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(SESSION_EVENT, callback);
  };
}

export function useSession() {
  return decodeSession(useSyncExternalStore(subscribe, getAccessToken, () => null));
}

export function saveSession({ access_token, user_type }) {
  clearOnboarding();
  localStorage.setItem('accessToken', access_token);
  localStorage.setItem('userType', user_type);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function clearSession() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userType');
  clearOnboarding();
  window.dispatchEvent(new Event(SESSION_EVENT));
}
