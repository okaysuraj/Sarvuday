# app/routes/assessments/__init__.py

from fastapi import APIRouter
from . import assessments

assessment_router = APIRouter()

assessment_router.include_router(assessments.router)
