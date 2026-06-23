# app/config.py

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    mysql_db_hostname: str
    mysql_db_port: int
    mysql_db_name: str
    mysql_db_username: str
    mysql_db_password: str

    mongo_uri: str
    mongo_db_name: str
    mongo_db_username: str
    mongo_db_password: Optional[str] = None
    
    redis_password: str
    redis_host: str
    redis_port: int
    redis_otp_expiry_seconds: int

    backend_base_url: str
    frontend_base_url: str

    private_key_id: str
    firebase_client_email: str
    firebase_project_id: str
    client_id: str
    token_uri: str
    auth_uri: str
    firebase_private_key: str
    
    chatbot_base_url: str
    chatbot_api_key: str
    chatbot_model: str
    chatbot_temperature: float
    tokenizer_model: str
    bert_tokenizer_path: str
    max_total_tokens: int
    chatbot_system_prompt: str
    
    # Sentiment Model
    sentiment_model_base_url: str

    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    reset_token_expire_minutes: int
    email_resend_rate_limit_minutes: int

    smtp_username: str
    smtp_password: str
    smtp_server: str
    smtp_port: int
    use_tls: bool
    start_tls: bool
    
    # Job scheduling time
    sentiment_job_hour: int
    sentiment_job_minute: int
    
    # Video Counselling
    daily_base_url: str
    daily_api_key: str

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="allow"
    )

    def safe_dict(self) -> dict:
        """
        Returns a copy of settings with sensitive values masked.
        """
        sensitive_keys = {
            "mysql_db_password",
            "mongo_db_password",
            "redis_password",
            "smtp_password",
            "private_key_id",
            "firebase_private_key",
            "firebase_client_email",
            "firebase_project_id",
            "client_id",
            "token_uri",
            "auth_uri",
            "secret_key",
            "daily_api_key"
        }

        data = self.model_dump()
        for key in sensitive_keys:
            if key in data and data[key] is not None:
                data[key] = "******"
        return data
    

# Usage
settings = Settings()

# print(settings.safe_dict())
