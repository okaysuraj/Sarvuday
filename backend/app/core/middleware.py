# app/core/middleware.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from app.config import settings

def configure_middlewares(app: FastAPI):
    # Retrieve allowed origins from settings, defaulting to local dev ports if not specified
    allowed_origins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8081",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8081",
        "http://10.0.2.2:8000",
        "http://10.0.2.2:8081",
    ]
    
    if settings.frontend_base_url:
        allowed_origins.append(settings.frontend_base_url.rstrip('/'))
    if settings.backend_base_url:
        allowed_origins.append(settings.backend_base_url.rstrip('/'))

    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1|10\.0\.2\.2|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )
    
    # In production, you should restrict allowed_hosts to your actual domain names.
    # We will use '*' for now to ensure mobile emulators work without HOST headers,
    # but ideally, this should be configured strictly.
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])
