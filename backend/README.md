# Sarvuday Backend - API & WebSockets

This is the core server application powering the Sarvuday platform. It handles authentication, database interactions, real-time communications, scheduling, and AI integrations.

## 🚀 Core Features

- **FastAPI Core**: High-performance asynchronous REST API architecture built with modern Python.
- **WebSocket Engine (`ConnectionManager`)**: Dedicated endpoints for real-time chat, typing indicators, and read receipts. It also relays WebRTC signaling (SDP offers/answers, ICE candidates) for P2P video/audio integration.
- **Relational Data Mapping**: Comprehensive SQLAlchemy ORM models managing Users (Normal, Counsellor, Admin), Appointments, Prescriptions, and Payments.
- **AI Sentiment Analysis**: Integrated background processing (using APScheduler) to periodically analyze message threads for distress/crisis detection using NLP models.
- **Security & Auth**: Custom OAuth2 + JWT token verification middleware (`AuthService`), with structured Enum-based Role-Based Access Control (RBAC).
- **Test Suite**: Extensive integration and unit tests using `pytest` and `pytest-asyncio` with dedicated test fixtures for Database isolation and event loop management.

## 🛠️ Technology Stack

- **Framework**: FastAPI (Uvicorn / Starlette)
- **Database**: PostgreSQL (AsyncPG driver)
- **ORM**: SQLAlchemy 2.0 (Async mode)
- **Data Validation**: Pydantic v2
- **Testing**: Pytest, Pytest-Asyncio, HTTPX
- **Task Scheduling**: APScheduler

## 🏃‍♂️ Running Locally

1. Create a Python Virtual Environment:
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On Windows
   ```
2. Install Dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Ensure PostgreSQL is running locally and update your DB connection string in `.env` or `database/postgres.py`.
4. Run the development server:
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

## 🧪 Running Tests

To run the full suite of integration tests and verify database stability:
```bash
pytest -v
```

## 🏗️ Project Structure

- `/app/models` - SQLAlchemy database schemas.
- `/app/routes` - API controllers (Auth, Chat, Dashboard, Users).
- `/app/services` - Core business logic and background tasks.
- `/app/schemas` - Pydantic models for request/response validation.
- `/app/core` - Application lifespan, scheduling, and core configurations.
- `/tests` - Integration test suite.

## 🔮 Future Enhancements

- **GraphQL Integration**: Adding a GraphQL endpoint via Strawberry for more flexible frontend queries.

- **Advanced Payment Webhooks**: Real-time integration with payment gateways (Stripe/Razorpay) via robust webhook listeners.
- **Data Analytics Pipeline**: Exporting sanitized assessment and interaction data to a data warehouse for advanced demographic and outcome research.
