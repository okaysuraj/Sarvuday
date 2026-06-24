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
- **Mobile Application**: Native mobile app (Android/iOS) synchronization and push notifications.
- **Group Therapy Sessions**: Support for multi-user WebRTC rooms and group chats.
- **Automated Invoicing**: Generation and emailing of PDF invoices for all transactions.
- **Localization**: Multi-language support to cater to a diverse user base.

## 📁 Project Structure

The project is split into independent frontend and backend directories:

- `/frontend` - React + Vite application (User Interface)
- `/backend` - FastAPI Python server (API & WebSockets)

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- WebRTC (Peer-to-Peer Communication)
- Axios (HTTP Client)
- CSS Modules / Custom Styling

**Backend:**
- Python 3
- FastAPI (REST APIs & WebSockets)
- PostgreSQL & SQLAlchemy (Relational Database & ORM)
- Pytest (Testing Framework)
- APScheduler (Background Tasks)

## 🏃‍♂️ Getting Started

Please see the respective documentation in each directory for detailed setup instructions:

- [Frontend Setup & Documentation](./frontend/README.md)
- [Backend Setup & Documentation](./backend/README.md)

## 📄 License
All rights reserved. Sarvuday Mental Health Platform.
