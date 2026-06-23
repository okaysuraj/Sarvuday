import re

with open(r'c:\Users\Suraj\Code\Sarvuday_Web\backend\generated_models.py', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    r'class Admins\(': r'class Admin(',
    r"'Admins'": r"'Admin'",
    
    r'class NormalUsers\(': r'class NormalUser(',
    r"'NormalUsers'": r"'NormalUser'",
    
    r'class Counsellors\(': r'class Counsellor(',
    r"'Counsellors'": r"'Counsellor'",
    
    r'class ChatSessions\(': r'class ChatSession(',
    r"'ChatSessions'": r"'ChatSession'",
    
    r'class ChatHistories\(': r'class ChatHistory(',
    r"'ChatHistories'": r"'ChatHistory'",
    
    r'class CounsellingSessions\(': r'class CounsellingSession(',
    r"'CounsellingSessions'": r"'CounsellingSession'",
    
    r'class DirectMessages\(': r'class DirectMessage(',
    r"'DirectMessages'": r"'DirectMessage'",
    
    r'class Notifications\(': r'class Notification(',
    r"'Notifications'": r"'Notification'",
    
    r'class OtpRecords\(': r'class OTPRecord(',
    r"'OtpRecords'": r"'OTPRecord'",
    
    r'class UserPayments\(': r'class UserPayment(',
    r"'UserPayments'": r"'UserPayment'",
    
    r'class CounsellorPayments\(': r'class CounsellorPayment(',
    r"'CounsellorPayments'": r"'CounsellorPayment'",
    
    r'class UserRefunds\(': r'class UserRefund(',
    r"'UserRefunds'": r"'UserRefund'",
    
    r'class Appointments\(': r'class Appointment(',
    r"'Appointments'": r"'Appointment'",
    
    r'class Prescriptions\(': r'class Prescription(',
    r"'Prescriptions'": r"'Prescription'",
    
    # Also update any relationships that point back using plural names
    r"back_populates='admins'": r"back_populates='admin'",
    r"back_populates='counsellors'": r"back_populates='counsellor'",
    r"back_populates='normal_users'": r"back_populates='user'", # usually normal_users was user
}

for k, v in replacements.items():
    content = re.sub(k, v, content)

with open(r'c:\Users\Suraj\Code\Sarvuday_Web\backend\app\models\postgres_models.py', 'w', encoding='utf-8') as f:
    f.write(content)

init_content = """# app/models/__init__.py
from .base import BaseMixin
from .postgres_models import (
    Admin, NormalUser, Counsellor, ChatSession, ChatHistory, 
    CounsellingSession, DirectMessage, Notification, OTPRecord, 
    UserPayment, CounsellorPayment, UserRefund, Appointment, Prescription,
    CounsellorAvailability, Base
)

__all__ = [
    'BaseMixin', 'Admin', 'NormalUser', 'Counsellor', 'ChatSession', 'ChatHistory', 
    'CounsellingSession', 'DirectMessage', 'Notification', 'OTPRecord', 
    'UserPayment', 'CounsellorPayment', 'UserRefund', 'Appointment', 'Prescription',
    'CounsellorAvailability', 'Base'
]
"""
with open(r'c:\Users\Suraj\Code\Sarvuday_Web\backend\app\models\__init__.py', 'w', encoding='utf-8') as f:
    f.write(init_content)
