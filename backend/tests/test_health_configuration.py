from fastapi.testclient import TestClient
from app.main import app


def test_liveness_does_not_imply_database_readiness():
    # No lifespan or database connection: readiness must fail closed before startup.
    client = TestClient(app)
    assert client.get("/health/live").status_code == 200
    assert client.get("/health/ready").status_code == 503


def test_sensitive_data_endpoints_require_authentication():
    client = TestClient(app)
    for path in ("/admin/moderation/crisis-logs", "/ai-insights/summary", "/community/feed"):
        assert client.get(path).status_code == 401
