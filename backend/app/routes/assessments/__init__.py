"""init   endpoints and access checks."""

from fastapi import APIRouter

from . import assessments

assessment_router = APIRouter()

assessment_router.include_router(assessments.router)
