"""Export the public API contract without opening databases or reading local secrets."""

import json
import os

# Imports construct the app but never enter its startup lifespan. Explicit test
# settings ensure schema generation cannot connect to a configured hosted store.
os.environ.update(
    DATABASE_URL="postgresql://schema:unused@127.0.0.1:9/schema",
    ENVIRONMENT="test",
    FIREBASE_PROJECT_ID="schema-export",
    FIREBASE_CLIENT_EMAIL="schema@example.com",
    FIREBASE_PRIVATE_KEY="unused",
    SECRET_KEY="schema-export-only" * 4,
)


def main():
    from app.main import app

    print(json.dumps(app.openapi(), sort_keys=True))


if __name__ == "__main__":
    main()
