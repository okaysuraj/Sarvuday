# app/utils/helper.py

from passlib.context import CryptContext
from app.utils.constants import AdminRoleEnum, CommissionTypeEnum, COMMISSION_PERCENTAGE, UserTypeEnum
import secrets
import string

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# Generate a random password for new admin
def generate_secure_password(length: int = 10) -> str:

    if length < 8:
        raise ValueError("Password length must be at least 8 characters")
    
    # Define character sets
    lowercase = string.ascii_lowercase
    uppercase = string.ascii_uppercase
    digits = string.digits
    symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    # Ensure at least one character from each set
    required_chars = [
        secrets.choice(lowercase),
        secrets.choice(uppercase),
        secrets.choice(digits),
        secrets.choice(symbols)
    ]
    
    # Fill remaining length with random choices from all sets
    remaining_chars = [
        secrets.choice(lowercase + uppercase + digits + symbols)
        for _ in range(length - 4)
    ]
    
    # Combine and shuffle
    all_chars = required_chars + remaining_chars
    secrets.SystemRandom().shuffle(all_chars)
    plain_password = ''.join(all_chars)
    
    return plain_password



# Helper function for checking if the user type requires approval (counsellor/admin)
def is_approval_required(user_type: UserTypeEnum) -> bool:
    return user_type in {UserTypeEnum.counsellor, UserTypeEnum.admin}


# Get commission percentage
def get_commission_percentage(commission_type: str) -> float:
    return COMMISSION_PERCENTAGE.get(commission_type, 0)

# Calculate platform fee based on commission type
def calculate_platform_fee(amount: float, commission_type: str) -> float:
    percentage = get_commission_percentage(commission_type)
    return round(amount * (percentage / 100), 2)

# Calculate final amount after deducting platform fee
def calculate_final_amount(amount: float, commission_type: str) -> float:
    return round(amount - calculate_platform_fee(amount, commission_type), 2)
    
