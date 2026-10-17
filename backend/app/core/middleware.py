"""Explicit origins/hosts and bounded, process-local abuse protection."""

import time
from collections import OrderedDict, deque
from urllib.parse import urlsplit

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from starlette.responses import JSONResponse

from app.config import settings


class SecurityMiddleware:
    def __init__(self, app):
        self.app = app
        self.requests = OrderedDict()

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            return await self.app(scope, receive, send)
        headers = dict(scope.get("headers", []))
        length = headers.get(b"content-length", b"0")
        try:
            parsed_length = int(length)
            if parsed_length < 0:
                return await JSONResponse(
                    {"detail": "Invalid content length"}, status_code=400
                )(scope, receive, send)
            if parsed_length > 5 * 1024 * 1024:
                return await JSONResponse(
                    {"detail": "Request body is too large"}, status_code=413
                )(scope, receive, send)
        except ValueError:
            return await JSONResponse(
                {"detail": "Invalid content length"}, status_code=400
            )(scope, receive, send)
        path = scope.get("path", "")
        if (
            path not in ("/health/live", "/health/ready", "/payments/webhook")
            and scope.get("method") != "OPTIONS"
        ):
            bucket = (
                "auth"
                if path.startswith("/auth/")
                else "contact"
                if path == "/contact"
                else "api"
            )
            limit = {"auth": 20, "contact": 5, "api": 240}[bucket]
            key = ((scope.get("client") or ("unknown",))[0], bucket)
            now = time.monotonic()
            queue = self.requests.pop(key, deque())
            while queue and queue[0] <= now - 60:
                queue.popleft()
            self.requests[key] = queue
            while len(self.requests) > 10000:
                self.requests.popitem(last=False)
            if len(queue) >= limit:
                return await JSONResponse(
                    {"detail": "Too many requests. Please try again shortly."},
                    status_code=429,
                    headers={"Retry-After": "60"},
                )(scope, receive, send)
            queue.append(now)

        async def secured_send(message):
            if message["type"] == "http.response.start":
                message["headers"] = list(message.get("headers", [])) + [
                    (b"x-content-type-options", b"nosniff"),
                    (b"referrer-policy", b"no-referrer"),
                    (b"x-frame-options", b"DENY"),
                    (b"cache-control", b"no-store"),
                ]
            await send(message)

        received = 0

        async def bounded_receive():
            nonlocal received
            message = await receive()
            if message["type"] == "http.request":
                received += len(message.get("body", b""))
                if received > 5 * 1024 * 1024:
                    raise HTTPException(
                        status_code=413, detail="Request body is too large"
                    )
            return message

        await self.app(scope, bounded_receive, secured_send)


def configure_middlewares(app: FastAPI):
    production = settings.environment.lower() == "production"
    origins = [
        value.strip().rstrip("/")
        for value in settings.cors_allowed_origins.split(",")
        if value.strip()
    ]
    if settings.frontend_base_url:
        origins.append(settings.frontend_base_url.rstrip("/"))
    if not production:
        origins.extend(
            [
                "http://localhost:5173",
                "http://localhost:5180",
                "http://localhost:8081",
                "http://127.0.0.1:5173",
                "http://127.0.0.1:5180",
                "http://127.0.0.1:8081",
            ]
        )
    hosts = [
        value.strip() for value in settings.allowed_hosts.split(",") if value.strip()
    ]

    def valid_origin(origin):
        parsed = urlsplit(origin)
        return (
            parsed.scheme == "https"
            and bool(parsed.hostname)
            and not parsed.username
            and not parsed.password
            and parsed.path in ("", "/")
            and not parsed.query
            and not parsed.fragment
            and "*" not in origin
        )

    if production and (
        not origins
        or not hosts
        or any("*" in host for host in hosts)
        or not all(valid_origin(origin) for origin in origins)
    ):
        raise RuntimeError(
            "Production requires explicit HTTPS CORS origins and allowed hosts"
        )
    app.add_middleware(SecurityMiddleware)
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=hosts or ["localhost", "127.0.0.1", "testserver"],
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=sorted(set(origins)),
        allow_credentials=False,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type", "X-Request-ID"],
    )
