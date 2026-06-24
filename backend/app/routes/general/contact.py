# app/routes/general/contact.py

from fastapi import APIRouter, status
from pydantic import BaseModel, EmailStr
from datetime import datetime, timezone


router = APIRouter()


class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


class ContactFormResponse(BaseModel):
    status: str
    message: str


@router.post(
    "",
    response_model=ContactFormResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact form",
)
async def submit_contact_form(payload: ContactFormRequest):
    """Save contact form submission to MongoDB."""
    try:
        from app.database.mongo import mongo_db as mdb
        contact_collection = mdb["contact_submissions"]
        contact_collection.insert_one({
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
    except Exception as e:
        return ContactFormResponse(
            status="error",
            message=f"Failed to submit contact form: {str(e)}",
        )
