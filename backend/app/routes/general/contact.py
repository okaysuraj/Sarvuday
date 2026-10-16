# app/routes/general/contact.py

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from pymongo.errors import PyMongoError
from app.database import get_mongo_db
from datetime import datetime, timezone


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
async def submit_contact_form(payload: ContactFormRequest, mongo_db=Depends(get_mongo_db)):
    """Save contact form submission to MongoDB."""
    try:
        await mongo_db.contact_submissions.insert_one({
            "name": payload.name,
            "email": payload.email,
            "subject": payload.subject,
            "message": payload.message,
            "submitted_at": datetime.now(timezone.utc),
            "is_resolved": False,
        })
        return ContactFormResponse(
            status="success",
            message="Thank you for contacting us. We will get back to you soon.",
        )
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Contact service is unavailable") from exc
