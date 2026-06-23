# app/schemas/common_schemas.py

from pydantic import BaseModel

# Email Verification/Resend Response
# Password Reset/update Response
# Phone Verification Response
class StatusResponse(BaseModel):
    status: str
    message: str
    
