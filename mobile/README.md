# Mobile application

Expo SDK 57 and React Native power the Android and iOS client. Both platforms use the shared FastAPI backend.

## Setup

Use Node.js 22.13 or later. Create `.env` with an API address reachable from the phone and the public Firebase application configuration:

```dotenv
EXPO_PUBLIC_API_URL=https://your-api-host.example
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

```bash
npm ci
npm start
```

Daily video and Stripe payments contain native code. Use a native development build for those features, for example `npx expo run:android`. Production settings belong in `app.json` and `eas.json`.

The EAS production profile sets `EXPO_PUBLIC_API_URL` to `https://sarvuday-backend.onrender.com`. Development and preview profiles use their own environment settings.

## Source layout

- `src/app/`: Canonical Expo Router URLs, layouts and access guards.
- `src/navigation/legacy-routes.ts`: Central redirects for retired URLs. `+native-intent.tsx` handles native links; `+not-found.tsx` handles unmatched navigation. Query values and session IDs are preserved. New links should use canonical routes.
- `src/components/screens/`: Shared administration, tracking, directory, payment and exercise views.
- `PatientRecords.tsx`, `SupportGroups.tsx`, `StressTriggers.tsx`: Separate counsellor records, community groups and journal summaries by feature.
- `src/components/dashboard/`: Patient, therapist and administrator dashboards.
- `src/components/booking/`, `calls/`, `chat/`: Booking, platform payments, video and messaging flows.
- `src/components/common/Screen.tsx`: Shared page, action, card and request-state UI.
- `src/api/`: Authenticated request transport and feature operations using `shared/api.ts` and generated backend types.
- `src/store/authStore.ts`: Authentication state and platform-appropriate persistence.
- `src/hooks/use-api-resource.ts`: Focus-aware data loading, cancellation and retry.

Profile requests select the API route for the current account role. Assessment submissions use the backend's `responses` request field and display its `final_score`, `max_score` and `result` fields. The API validates answers against the published catalog before saving scores.

Files ending in `.native.ts` or `.native.tsx` provide device implementations. Their plain `.ts` or `.tsx` siblings provide browser fallbacks. Keep both when changing Firebase, payments or calls.

## Check and export

From the repository root, `npm run check` verifies API contract freshness, the web build and mobile types. Use `npm run check:full` for all-platform exports. The root guide explains setup.

```bash
npm run typecheck
npm run export:android
npm run export:ios
```

Exports go into `dist/android` and `dist/ios`. Use EAS for signed store builds. The optional `npm run web` command runs the Expo browser client; the separate `frontend/` directory contains the main web application.

Refer to the [Expo SDK 57 documentation](https://docs.expo.dev/versions/v57.0.0/) when changing native configuration or framework APIs.
