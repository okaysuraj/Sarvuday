from typing import Optional, Literal
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    mongo_uri: str
    mongo_db_name: str = "sarvuday"
    environment: Literal["development", "test", "production"] = "development"
    cors_allowed_origins: str = ""
    allowed_hosts: str = "localhost,127.0.0.1,testserver"
    enable_api_docs: bool = False

    # Per API worker: size worker count to the database's connection budget.
    database_pool_size: int = Field(default=5, ge=1, le=100)
    database_max_overflow: int = Field(default=5, ge=0, le=100)
    database_pool_timeout: int = Field(default=15, ge=1)
    database_statement_timeout_ms: int = Field(default=15000, ge=100)
    mongo_max_pool_size: int = Field(default=20, ge=1, le=200)
    mongo_timeout_ms: int = Field(default=5000, ge=100)

    backend_base_url: str = ""
    frontend_base_url: str = ""
    private_key_id: str = ""
    firebase_client_email: str
    firebase_project_id: str
    client_id: str = ""
    token_uri: str = "https://oauth2.googleapis.com/token"
    auth_uri: str = "https://accounts.google.com/o/oauth2/auth"
    firebase_private_key: str

    chatbot_base_url: str = "http://localhost:1234/v1"
    chatbot_api_key: str = "lm-studio"
    chatbot_model: str = "/models/survuday_v2"
    chatbot_temperature: float = 0.8
    max_total_tokens: int = 2048
    chatbot_system_prompt: str = "You are a supportive and empathetic assistant."
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440
    daily_base_url: str = "https://api.daily.co/v1"
    daily_api_key: str = ""
    stripe_secret_key: Optional[str] = None
    stripe_publishable_key: Optional[str] = None
    stripe_webhook_secret: Optional[str] = None

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False, extra="allow")

    def safe_dict(self) -> dict:
        sensitive_keys = {
            "database_url", "mongo_uri", "private_key_id", "firebase_private_key",
            "firebase_client_email", "firebase_project_id", "client_id", "token_uri",
            "auth_uri", "secret_key", "daily_api_key", "stripe_secret_key",
            "stripe_webhook_secret", "chatbot_api_key",
        }
        return {
            key: "******" if key in sensitive_keys and value is not None else value
            for key, value in self.model_dump().items()
        }


settings = Settings()
