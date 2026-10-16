"""All audit tests use isolated local addresses, never developer/production .env secrets."""
import os

for key, value in {
    'DATABASE_URL': 'postgresql://audit:local-audit-only@127.0.0.1:55439/sarvuday_audit',
    'MONGO_URI': 'mongodb://127.0.0.1:57029',
    'MONGO_DB_NAME': 'sarvuday_audit',
    'FIREBASE_PROJECT_ID': 'audit-only',
    'FIREBASE_CLIENT_EMAIL': 'audit@example.invalid',
    'FIREBASE_PRIVATE_KEY': 'test-only-invalid-key',
    'SECRET_KEY': 'test-only-secret-for-local-regressions',
    'STRIPE_SECRET_KEY': '',
    'STRIPE_WEBHOOK_SECRET': '',
    'STRIPE_PUBLISHABLE_KEY': '',
    'DAILY_API_KEY': '',
    'CHATBOT_API_KEY': '',
    'ENVIRONMENT': 'development',
}.items():
    os.environ[key] = value
