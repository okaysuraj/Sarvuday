const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, '') || '';

export const API_CONFIGURATION_ERROR = !configuredUrl
  ? 'The server address is missing. Configure EXPO_PUBLIC_API_URL for this build.'
  : !/^https?:\/\//i.test(configuredUrl)
    ? 'The server address must be an HTTP or HTTPS URL.'
    : !__DEV__ && !configuredUrl.startsWith('https://')
      ? 'A secure HTTPS server address is required for this release.'
      : null;

export const BASE_URL = configuredUrl;
