"""Consistent database failures without exposing queries, documents or credentials."""

import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

logger = logging.getLogger(__name__)


async def database_error(request: Request, exc: Exception) -> JSONResponse:
    # Driver exception strings can contain SQL parameters or rejected documents.
    logger.error(
        "%s during %s %s", type(exc).__name__, request.method, request.url.path
    )
    if isinstance(exc, IntegrityError):
        return JSONResponse(
            status_code=409,
            content={"detail": "This change conflicts with existing records."},
        )
    return JSONResponse(
        status_code=503,
        content={"detail": "The data service is temporarily unavailable."},
    )


def configure_exception_handlers(app: FastAPI) -> None:
    app.add_exception_handler(SQLAlchemyError, database_error)
