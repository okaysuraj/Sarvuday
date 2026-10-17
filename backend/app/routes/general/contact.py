"""Contact endpoints and access checks."""

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, status
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models.safety import ContactSubmission

router = APIRouter()


class ContactFormRequest(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    subject: str = Field(min_length=1, max_length=300)
    message: str = Field(min_length=1, max_length=10000)


class ContactFormResponse(BaseModel):
    status: str
    message: str


@router.post(
    "",
    response_model=ContactFormResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact form",
)
async def submit_contact_form(
    payload: ContactFormRequest, db: AsyncSession = Depends(get_db)
):
    """Persist the request before acknowledging receipt."""
    db.add(
        ContactSubmission(
            **payload.model_dump(), submitted_at=datetime.now(timezone.utc)
        )
    )
    await db.commit()
    return ContactFormResponse(
        status="success",
        message="Thank you for contacting us. We will get back to you soon.",
    )
