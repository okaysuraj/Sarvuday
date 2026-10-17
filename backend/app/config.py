"""Validated environment settings; configuration errors hide credential values."""

from typing import Literal, Optional

from pydantic import Field, SecretStr, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    environment: Literal["development", "test", "production"] = "development"
    cors_allowed_origins: str = ""
    allowed_hosts: str = "localhost,127.0.0.1,testserver"
    render_external_hostname: str = Field(
        default="", pattern=r"^$|^[a-zA-Z0-9-]+\.onrender\.com$"
    )
    enable_api_docs: bool = False

    # Per API worker: size worker count to the database's connection budget.
    database_pool_size: int = Field(default=5, ge=1, le=100)
    database_max_overflow: int = Field(default=5, ge=0, le=100)
    database_pool_timeout: int = Field(default=15, ge=1)
    database_statement_timeout_ms: int = Field(default=15000, ge=100)

    frontend_base_url: str = ""
    private_key_id: str = ""
    firebase_client_email: str
    firebase_project_id: str
    client_id: str = ""
    token_uri: str = "https://oauth2.googleapis.com/token"
    auth_uri: str = "https://accounts.google.com/o/oauth2/auth"
    firebase_private_key: str

    openai_api_key: SecretStr = SecretStr("")
    openai_model: str = Field(default="gpt-6-luna", min_length=1)
    openai_max_output_tokens: int = Field(default=2048, ge=64, le=16384)
    max_total_tokens: int = Field(default=2048, ge=128)
    chatbot_system_prompt: str = "You are a supportive and empathetic assistant."
    secret_key: str
    algorithm: Literal["HS256", "HS384", "HS512"] = "HS256"
    access_token_expire_minutes: int = Field(default=1440, ge=1)
    daily_base_url: str = "https://api.daily.co/v1"
    daily_api_key: str = ""
    stripe_secret_key: Optional[str] = None
    stripe_publishable_key: Optional[str] = None
    stripe_webhook_secret: Optional[str] = None

    model_config = SettingsConfigDict(
        env_file=".env", case_sensitive=False, extra="ignore", hide_input_in_errors=True
    )

    @model_validator(mode="after")
    def validate_signing_key(self):
        minimum = {"HS256": 32, "HS384": 48, "HS512": 64}[self.algorithm]
        if self.environment == "production" and len(self.secret_key.encode()) < minimum:
            raise ValueError(
                f"SECRET_KEY must contain at least {minimum} bytes in production."
            )
        return self


settings = Settings()
