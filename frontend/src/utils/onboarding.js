const STORAGE_KEY = 'onboardingData';

// Intake drafts belong to the current tab and are cleared after saving or logout.
export function readOnboarding() {
  const stored = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEY);
  try {
    const draft = JSON.parse(stored || '{}');
    if (!draft || typeof draft !== 'object' || Array.isArray(draft)) return {};
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    return draft;
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return {};
  }
}

export function saveOnboarding(fields) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readOnboarding(), ...fields }));
}

export function clearOnboarding() {
  sessionStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEY);
}
