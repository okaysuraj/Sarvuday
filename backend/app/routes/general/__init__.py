# app/routes/general/__init__.py

from fastapi import APIRouter
from . import disorders, counsellors

general_router = APIRouter()

general_router.include_router(
    disorders.router,
    prefix="/disorders",
)

general_router.include_router(
    counsellors.router,
    prefix="/counsellors",
)