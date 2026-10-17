"""Create the API, attach request middleware and register its routes."""

from fastapi import FastAPI, Response

from app.config import settings
from app.core.errors import configure_exception_handlers
from app.core.lifespan import lifespan
from app.core.middleware import configure_middlewares
from app.routes import api_router
from app.routes.health import router as health_router

show_docs = settings.environment != "production" or settings.enable_api_docs
app = FastAPI(
    title="SurvUday API",
    version="1.0",
    docs_url="/docs" if show_docs else None,
    redoc_url="/redoc" if show_docs else None,
    openapi_url="/openapi.json" if show_docs else None,
    lifespan=lifespan,
)
configure_middlewares(app)
configure_exception_handlers(app)
app.include_router(api_router)
app.include_router(health_router)


@app.get("/")
def root():
    return {"message": "Welcome to SurvUday App API"}


@app.head("/", include_in_schema=False)
def head_root():
    # Render probes the root with HEAD while detecting an HTTP service.
    return Response(status_code=200)
