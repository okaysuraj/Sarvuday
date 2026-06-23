import os
import re

files_to_update = [
    r"app\models\base.py",
    r"app\models\events.py",
    r"app\models\mongodb_models.py",
    r"app\models\sessions\chat_history.py",
    r"app\models\users\otp_record.py",
    r"app\routes\payment_routes.py",
    r"app\services\otp_service.py",
    r"app\services\admin\analytics_service.py",
    r"app\services\appointments\creators.py",
    r"app\services\appointments\dummy_payment.py",
    r"app\services\appointments\fetchers.py",
    r"app\services\appointments\utils.py",
    r"app\services\assessments\assessments_services.py",
    r"app\services\auth\auth_service.py",
    r"app\services\auth\firebase_auth_service.py",
    r"app\services\auth\google_auth_service.py",
    r"app\services\chatbot\chatbot_service.py",
    r"app\services\counselling_services\counselling_service.py",
    r"app\services\normal_user\user_management_service.py",
    r"app\services\prescriptions\prescription_service.py",
    r"app\utils\email_verification\base_email_service.py",
    r"app\utils\email_verification\email_verification_service.py",
    r"app\utils\email_verification\token_service.py"
]

for file in files_to_update:
    path = os.path.join(r"c:\Users\Suraj\Code\Sarvuday_Web\backend", file)
    if not os.path.exists(path): continue
    
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
    original = content
    
    # ensure timezone is imported if we use it
    if "datetime.now(" in content or "datetime.utcnow(" in content:
        if "from datetime import" in content and "timezone" not in content:
            content = re.sub(r'from datetime import (.*)', r'from datetime import \1, timezone', content, count=1)
        elif "import datetime" in content and "timezone" not in content:
            # We might not need to import timezone if it's imported from datetime
            pass

    content = content.replace("datetime.utcnow()", "datetime.now(timezone.utc)")
    content = content.replace("datetime.now()", "datetime.now(timezone.utc)")
    
    # We already changed default=datetime.utcnow in models using update_timestamp.py
    content = content.replace("default=datetime.now", "default=datetime.now(timezone.utc)")
    
    if content != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated datetimes in {file}")
