# Sarvuday

The web and mobile clients share one FastAPI backend for authentication, appointments, counselling, messaging and wellbeing records.

| Directory | Purpose | Setup |
| --- | --- | --- |
| `backend/` | API, database models and deployment commands | [Backend guide](backend/README.md) |
| `frontend/` | React web application, built with Vite | [Web guide](frontend/README.md) |
| `mobile/` | Expo application for Android and iOS | [Mobile guide](mobile/README.md) |

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

AI inference is provided by the configured external endpoint. Model binaries and third-party model source are not part of the application repository.

PostgreSQL is the only application database. The [backend guide](backend/README.md#database-architecture) explains table ownership, transactional updates, importing existing records and hosted security requirements.

JavaScript and TypeScript formatting follows the shared `.prettierrc.json`. Keep comments focused on ownership rules, compatibility requirements and decisions that would otherwise be unclear.
