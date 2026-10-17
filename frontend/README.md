# Web application

React and Vite build the browser client. The API and Firebase handle authentication; protected pages also check the current account role.

## Setup

Create `.env` with `VITE_API_BASE_URL` and the public Firebase web configuration:

```dotenv
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

```bash
npm ci
npm run dev
```

The development server listens on port 5180. Configure the backend to allow that origin.

## Source layout

- `src/routes.js`: Lazy page imports, URLs and page-specific role requirements.
- `src/layouts/`: Public and authenticated page shells.
- `src/pages/`: Route-level page composition.
- `src/components/`: Reusable feature views and UI components.
- `src/hooks/useApiData.js`: Cancelable data loading and retry behavior.
- `src/utils/axiosInstance.js`: API address, bearer headers and session handling; its named `api` export uses the shared typed request adapter.
- `src/components/common/FormField.jsx`: Accessible field labels, help and validation messages.
- `src/components/common/DataState.jsx`: Shared loading, retry and configurable empty states.
- `src/utils/session.js`: Token decoding for navigation, role-based destinations and session clearing.
- `src/utils/onboarding.js`: Tab-scoped intake drafts and safe recovery from malformed saved JSON.
- `src/utils/healthMetrics.js`: Calculations using recorded wellbeing measurements.

## Check and build

```bash
npm run lint
npm run build
npm run preview
```

Vite writes the production app to `dist/`. Netlify uses the root `netlify.toml` for build settings and browser-route fallbacks. Configure production environment variables before building; Vite embeds public values in the bundle.

`netlify.toml` sets the production API to `https://sarvuday-backend.onrender.com`. Local development continues to use the address in `.env`.

The backend verifies token signatures and authorizes data access. Browser role checks only control navigation. Logging out clears the API session and intake draft even when Firebase sign-out fails.

The root `npm run check` command also checks API contract freshness and mobile types. Regenerate `shared/api-types.d.ts` with `npm run api:generate` after changing FastAPI schemas.
