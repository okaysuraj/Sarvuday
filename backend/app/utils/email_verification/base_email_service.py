# app/services/email/base_email_service.py
import os
from email.message import EmailMessage
from jinja2 import Environment, FileSystemLoader
import aiosmtplib
from app.config import settings
from typing import Optional
from datetime import datetime, timezone
from fastapi import HTTPException

class BaseEmailService:
    def __init__(self):
        self.smtp_server = settings.smtp_server
        self.smtp_port = settings.smtp_port
        self.smtp_username = settings.smtp_username
        self.smtp_password = settings.smtp_password
        self.use_tls = settings.use_tls
        self.start_tls = settings.start_tls
        self.templates_dir = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), 
            "..", "..", "templates"
        )
        self.env = Environment(loader=FileSystemLoader(self.templates_dir))

    async def send_html_email(self, subject: str, to_email: str, html_body: str):
        """Send HTML email with fallback text content"""
        msg = EmailMessage()
        msg["From"] = self.smtp_username
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.set_content("Your email client does not support HTML.")
        msg.add_alternative(html_body, subtype="html")

        await aiosmtplib.send(
            msg,
            hostname=self.smtp_server,
            port=self.smtp_port,
            username=self.smtp_username,
            password=self.smtp_password,
            use_tls=self.use_tls,
            start_tls=self.start_tls,
        )

    async def render_template(self, template_name: str, context: dict) -> str:
        """Render Jinja2 template with given context"""
        template = self.env.get_template(template_name)
        return template.render(context)

    async def check_rate_limit(self, last_sent_at: Optional[datetime], limit_seconds: int) -> datetime:
        """Check if email can be resent based on rate limit"""
        now = datetime.now(timezone.utc)
        if last_sent_at and (now - last_sent_at).total_seconds() < limit_seconds:
            raise HTTPException(
                status_code=429, 
                detail="Email already sent recently. Please wait."
            )
        return now