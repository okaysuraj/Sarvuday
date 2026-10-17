# Sarvuday

The web and mobile clients share one FastAPI backend for authentication, appointments, counselling, messaging and wellbeing records.

| Directory   | Purpose                                            | Setup                              |
| ----------- | -------------------------------------------------- | ---------------------------------- |
| `backend/`  | API, database models and deployment commands       | [Backend guide](backend/README.md) |
| `frontend/` | React web application, built with Vite             | [Web guide](frontend/README.md)    |
| `mobile/`   | Expo application for Android and iOS               | [Mobile guide](mobile/README.md)   |
| `shared/`   | Generated API types and the shared request adapter | Generated from FastAPI             |
| `scripts/`  | Contract generation and repository checks          | `npm run check`                    |

## Root files and folders

The three applications have separate dependencies. The shared API code sits beside them because both clients import it.

| Item | Purpose | Used when |
| --- | --- | --- |
| `shared/api.ts` | One request formatter and error-message helper for both clients | Web and mobile builds/runtime |
| `shared/api-types.d.ts` | Generated request and response types; regenerate instead of editing | Mobile type checking and API maintenance |
| `scripts/` | Generate the contract and run the combined build checks | Development/release checks |
| Root `package.json`, `package-lock.json` | Commands and reproducible dependencies for those tools | Development/release checks |
| Root `node_modules/` | Installed tooling dependencies; recreated with `npm ci` | Running the root commands |
| `.gitignore` | Excludes secrets, dependencies, logs and generated files | Version control |
| `.prettierrc.json` | Shared editor formatting preferences | Optional editor tooling |
| `README.md` | Setup and maintenance instructions | Maintenance |
| `netlify.toml` | Web deployment settings | Netlify deployment |

`.git/` holds repository history. `.agents/` holds local coding-assistant skills. Neither is application runtime code. Installed dependencies (`node_modules/`, `backend/venv/`) are local and untracked; production environments install their own dependencies.

The root tooling is not required on Render or on a user's phone. Client builds use the committed shared contract, so they do not need Python or root tooling dependencies. Keep `shared/` in its current location unless both clients' imports and bundler settings are updated together.

## Run locally

Start the backend first, then either client. Each application reads its own `.env` file. Client environment values are public build configuration; backend credentials belong only on the server.

Run each block below in a separate terminal, starting from the repository root.

```powershell
cd backend
.\venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

```powershell
cd frontend
npm ci
npm run dev
```

```powershell
cd mobile
npm ci
npm start
```

Prepare the database schemas using the backend guide before the first API startup. The web development server uses port 5180. Configure the mobile API URL with an address reachable from the device.

## Where changes belong

- Backend endpoints belong in `app/routes/`; business rules belong in `app/services/`; persisted SQL records belong in `app/models/`; request and response shapes belong in `app/schemas/`.
- Web navigation and access requirements live in `frontend/src/routes.js`. Page files compose feature components; `utils/axiosInstance.js` owns authentication headers and API errors.
- Mobile route files live in `mobile/src/app/`. Shared screens, forms, booking and calls live in `mobile/src/components/`. `api/client.ts` owns authenticated requests.
- Database changes belong in `backend/migrations/`. Run preparation before starting API workers.

Use descriptive names, format code consistently, and comment decisions that are not evident from the code. Reuse existing request clients and screen components before adding another abstraction. Keep generated builds, reports, logs and dependencies out of Git.

## Deployment

The web client uses [netlify.toml](netlify.toml). Render runs the backend with `backend` as its root directory; its build and start commands are documented in the backend guide. Mobile release settings live in `mobile/app.json` and `mobile/eas.json`.

AI replies use the OpenAI API through the backend. Configure `OPENAI_API_KEY` on the server; model binaries and a separate inference server are unnecessary.

PostgreSQL is the only application database. The [backend guide](backend/README.md#database-architecture) explains table ownership, transactional updates, backups and hosted security requirements.

JavaScript and TypeScript formatting follows the shared `.prettierrc.json`. Keep comments focused on ownership rules, compatibility requirements and decisions that would otherwise be unclear.

## API contracts and repository checks

Install root tooling once with `npm ci`. The clients keep their own dependencies and lockfiles; there is no dependency hoisting between React web and Expo.

FastAPI request/response schemas are the source of truth. `shared/api-types.d.ts` is generated and committed so client builds do not require backend credentials. `shared/api.ts` formats typed requests while each app keeps its own Axios authentication, persistence and expired-session handling. Use canonical `/user` endpoints; `/normal_user` remains available for older builds but is excluded from the published contract.

After changing an API request or response model:

```bash
npm run api:generate
npm run check
```

The check command verifies API contract freshness, web lint/build and mobile types. It does not require Docker, use database credentials or run a test suite. Python comes from `backend/venv` when present, or the `PYTHON` environment variable.

Run `npm run check:full` before releasing a mobile change; it additionally exports Android, iOS and Expo web. Keep production bundles and test output out of Git.
