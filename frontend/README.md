# Sarvuday Frontend - User Interface

This is the frontend application for the Sarvuday mental health and counselling platform. It provides tailored dashboards for normal users, professional counsellors, and administrators.

## 🚀 Features & Capabilities

- **Role-Based Routing**: Secure, isolated navigation experiences depending on the authenticated user's role (Admin, Counsellor, User).
- **Real-Time Communication**: Integrated WebSocket-based chat system (`Chat.jsx`) embedded directly into dashboards for uninterrupted care.
- **WebRTC Integration**: Built-in support for Peer-to-Peer data channels and signaling (`sdp_offer`, `ice_candidate`) for potential audio/video telehealth sessions.
- **Appointment Management**: Interactive UI components for browsing counsellor availability and booking sessions.
- **Responsive Design**: Custom CSS modules engineered for fluid layouts across desktop and mobile browsers.

## 🛠️ Technology Stack

- **Framework**: React 18+
- **Build Tool**: Vite (for rapid HMR and optimized production bundles)
- **Routing**: React Router DOM (v6)
- **HTTP Client**: Axios (configured with interceptors for JWT token injection)
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Styling**: Vanilla CSS Modules (avoiding heavy UI frameworks to maintain fine-grained control and performance)

## 🏃‍♂️ Running Locally

1. Ensure you have Node.js installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in the environment variables (VITE_API_BASE_URL pointing to the backend API, and Firebase configuration keys).
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

- `/src/assets` - Static media, SVGs, and images.
- `/src/components` - Reusable UI building blocks (Auth, Chat, Dashboards, Layouts).
- `/src/pages` - Top-level route components (Dashboards, Login, Registration).
- `/src/config` - Global configuration and API URL definitions.

## 🔮 Future Enhancements

- **Push Notifications**: Integration with Service Workers for browser-based push notifications when new messages or appointments arrive.
- **PWA Support**: Upgrading the React app to a Progressive Web App for offline capabilities and app-like mobile experience.
- **Enhanced Telehealth UI**: Dedicated screen layouts for active video calls with screen-sharing and whiteboard features.
