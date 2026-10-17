"""init   endpoints and access checks."""

from fastapi import APIRouter

from . import counsellors, disorders

general_router = APIRouter()

general_router.include_router(
    disorders.router,
    prefix="/disorders",
)

general_router.include_router(
    counsellors.router,
    prefix="/counsellors",
)
