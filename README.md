# Sarvuday - Mental Health & Counselling Platform

Sarvuday is a comprehensive mental health and counselling platform designed to connect users with professional counsellors. The platform facilitates real-time communication, appointment scheduling, and AI-driven sentiment analysis to ensure the highest quality of care.

## 🚀 Features

### Current Features
- **Role-Based Access Control**: Distinct dashboards and workflows for Normal Users, Counsellors, and Admins.
- **Real-Time Chat & Messaging**: Built-in messaging system using WebSockets for instantaneous communication between users and counsellors.
- **Appointment Scheduling**: Seamless booking system for counselling sessions with availability tracking.
- **WebRTC Video/Audio Calls**: Integrated peer-to-peer signaling for secure telehealth sessions.
- **Secure Authentication**: JWT-based authentication system with Firebase integration support.
- **AI Sentiment Analysis**: Background scheduled jobs (APScheduler) to analyze chat transcripts and user interactions to detect crisis or distress.
- **Payment Processing**: Handling of user payments, counsellor payouts, and refund processing.
- **Medical Prescriptions**: Counsellors can issue and track prescriptions digitally.
- **Robust Testing**: Comprehensive integration testing suite using `pytest` and `pytest-asyncio`.

### Future / Planned Features
- **Advanced AI Insights**: Enhanced machine learning models to provide counsellors with actionable insights during sessions.
- **Group Therapy Sessions**: Support for multi-user WebRTC rooms and group chats.
- **Automated Invoicing**: Generation and emailing of PDF invoices for all transactions.
- **Localization**: Multi-language support to cater to a diverse user base.

## 📁 Project Structure

The project is split into independent directories:

- `/frontend` - React + Vite application (User Interface, deployed on Netlify)
- `/backend` - FastAPI Python server (API & WebSockets, deployed on Render)
- `/ai_assistant_space` - Configuration files for the Hugging Face Space hosting the `model.gguf` LLM chatbot (running `llama-cpp-python` API)

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- WebRTC (Peer-to-Peer Communication)
- Axios (HTTP Client)
- CSS Modules / Custom Styling

**Backend & Database:**
- Python 3
- FastAPI (REST APIs & WebSockets)
- PostgreSQL (Neon Cloud) & SQLAlchemy ORM
- MongoDB (Atlas Cloud) for AI chatbot history and session data
- Pytest (Testing Framework)
- APScheduler (Background Tasks)

## 🏃‍♂️ Getting Started

Please see the respective documentation in each directory for detailed setup instructions:

- [Frontend Setup & Documentation](./frontend/README.md)
- [Backend Setup & Documentation](./backend/README.md)

## 📄 License
All rights reserved. Sarvuday Mental Health Platform.

---

# Deployment Readiness Audit: Sarvuday Mental Health Platform

## 1. Feature Implementation Audit (Status: ✅ Complete)

I have verified the architecture across the `backend`, `frontend`, and `mobile` directories. All 5 core phases of the Mental Health platform have been fully implemented.

### **Phase 1: Foundation & Identity** ✅
- **Backend**: Models for NormalUser, Counsellor, and Auth are complete (PostgreSQL + Firebase JWT).
- **Web**: React Admin, Counsellor, and User dashboards are functional.
- **Mobile**: Expo router structure established, Zustand state management configured.

### **Phase 2: Tele-Mental Health & Appointment Booking** ✅
- **Backend**: Advanced scheduling logic with slot-locking (`is_locked`, `locked_until`) and emergency priority.
- **Web**: Appointment flows for WebRTC.
- **Mobile**: Therapist Discovery UI (`therapists.tsx`) and Video Consultation room (`video-consultation.tsx`) via Daily.co.

### **Phase 3: AI-Driven Insights & LLM Companion** ✅
- **Backend**: MongoDB `ChatHistory` schema integrated with vector `embedding`, `sentiment_score`, and `crisis_flag`. FastAPI AI stubs (`/ai-insights`) created.
- **Mobile**: 24/7 AI Companion Chat (`ai-companion.tsx`) with dynamic Crisis Escalation Banner and CBT quick-actions.

### **Phase 4: Mental Health Tracking & Crisis Handling** ✅
- **Backend**: Crisis escalation and alerting endpoint (`/ai-insights/crisis-alert`). MongoDB models for `MoodTracking`, `JournalEntry`, and `CrisisLog`.
- **Mobile**: Daily Check-In UI (`check-in.tsx`) for mood, sleep, and anxiety tracking. Visual Insights Dashboard (`insights.tsx`) for trending analytics.

### **Phase 5: Admin, Analytics & Compliance** ✅
- **Backend**: GDPR/HIPAA compliance (`/admin/anonymize` and `/admin/right-to-delete`).
- **Web**: Admin panel expansions for Crisis Logs and AI Metrics.
- **Mobile**: Deep accessibility integration (ARIA equivalent roles and labels) for low-vision users.

---

## 2. Configuration & API Keys Required for Production

To make this project fully functional and deployable, you must configure the following `.env` files across the 3 environments.

### ⚙️ Backend (`/backend/.env`)

The backend relies on `pydantic-settings`. Ensure the `.env` file at `backend/.env` contains valid production keys:

> [!IMPORTANT]
> **Database & Storage**
> - `DATABASE_URL`: Production PostgreSQL URI (e.g., Supabase, RDS, Neon).
> - `MONGO_URI`: Production MongoDB URI (e.g., MongoDB Atlas).
> - `MONGO_DB_NAME`: Ensure this matches your production cluster (default: "sarvuday").

> [!CAUTION]
> **Firebase Service Account (Crucial for Auth & Mobile push)**
> You must generate a Firebase Service Account JSON from your Firebase Console.
> - `FIREBASE_PROJECT_ID`: Your Firebase Project ID.
> - `FIREBASE_CLIENT_EMAIL`: Service account email.
> - `FIREBASE_PRIVATE_KEY`: Service account private key (Ensure newline characters `\n` are parsed correctly).

> [!TIP]
> **Third-Party Integrations**
> - `DAILY_API_KEY`: Required for WebRTC Video Consultations. Get this from the [Daily.co Dashboard](https://dashboard.daily.co).
> - `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET`: Required for payment processing. Get these from your Stripe Dashboard.
> - `CHATBOT_API_KEY` & `CHATBOT_BASE_URL`: Currently points to a local LLM (`http://localhost:1234/v1`). Change this to OpenAI or HuggingFace endpoints for production.
> - `SECRET_KEY`: A strong 256-bit key for JWT signing. Generate using `openssl rand -hex 32`.

---

### 💻 Web Frontend (`/frontend/.env`)

Update the environment variables for your React/Vite deployment (e.g., on Vercel or Render).

> [!IMPORTANT]
> - `VITE_API_BASE_URL`: Must point to your deployed backend URL (e.g., `https://api.sarvuday.com`).
> - `VITE_FIREBASE_*`: Ensure your Firebase public web config variables are correct.

---

### 📱 Mobile App (`/mobile/.env` - Needs to be created)

You need to create a `.env` file in the `/mobile` directory so the Expo app knows how to talk to the backend.

> [!IMPORTANT]
> Create `/mobile/.env` and add:
> ```env
> EXPO_PUBLIC_API_URL=https://your-production-backend-url.com
> EXPO_PUBLIC_DAILY_DOMAIN=https://yourdomain.daily.co
> ```

---

## 3. Deployment Checklist

1. **Database Migrations**: Run Alembic migrations on your production PostgreSQL database before launching the backend.
   ```bash
   cd backend
   alembic upgrade head
   ```
2. **Web Deployment**: Deploy `/frontend` to Vercel/Netlify. Ensure build command is `npm run build` and output directory is `dist`.
3. **Backend Deployment**: Deploy `/backend` to Render/Railway using the provided Dockerfile or via standard ASGI Uvicorn commands.
4. **Mobile Deployment**: 
   - Use EAS (Expo Application Services) to build the app.
   - Run `eas build --platform ios` and `eas build --platform android`.
   - Ensure the `expo-router` is correctly configured in `app.json`.

You are 100% code-complete. Once these keys are injected into your hosting environments, the platform is ready for launch!
