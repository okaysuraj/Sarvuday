# app/config.py



from pydantic_settings import BaseSettings, SettingsConfigDict

from typing import Optional





class Settings(BaseSettings):

    postgres_db_hostname: str

    postgres_db_port: int

    postgres_db_name: str

    postgres_db_username: str

    postgres_db_password: str



    mongo_uri: str

    mongo_db_name: str

    mongo_db_username: str

    mongo_db_password: Optional[str] = None




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

    max_total_tokens: int

    chatbot_system_prompt: str

    



    secret_key: str

    algorithm: str

    access_token_expire_minutes: int

    reset_token_expire_minutes: int

    email_resend_rate_limit_minutes: int





    # Email SMTP Settings
    smtp_server: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    use_tls: bool = False
    start_tls: bool = True

    

    # Video Counselling

    daily_base_url: str

    daily_api_key: str



    # Stripe Payments

    stripe_secret_key: Optional[str] = None

    stripe_publishable_key: Optional[str] = None

    stripe_webhook_secret: Optional[str] = None







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

            "postgres_db_password",

            "mongo_db_password",

            "private_key_id",

            "firebase_private_key",

            "firebase_client_email",

            "firebase_project_id",

            "client_id",

            "token_uri",
            "auth_uri",
            "secret_key",
            "daily_api_key",
            "smtp_password"
        }



        data = self.model_dump()

        for key in sensitive_keys:

            if key in data and data[key] is not None:

                data[key] = "******"

        return data

    



# Usage

settings = Settings()



# print(settings.safe_dict())

