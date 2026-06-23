# app/routes/general/disorders.py

from fastapi import APIRouter
from app.services.general import DisordersService
from app.schemas import DisordersListResponse

router = APIRouter()

@router.get("", response_model=DisordersListResponse, summary="List disorders")
async def list_disorders():
    return DisordersService.fetch_disorders_data()