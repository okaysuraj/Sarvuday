# app/config.py



from pydantic_settings import BaseSettings, SettingsConfigDict

from typing import Optional





class Settings(BaseSettings):

    database_url: str



    mongo_uri: str

    mongo_db_name: str = "sarvuday"




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

    



    secret_key: str = "d70e7203b79ff1d7428213a9f39f62a9211db0d4ab5cb5f1fb387af0dfb9ca53"

    algorithm: str = "HS256"

    access_token_expire_minutes: int = 1440







    

    # Video Counselling

    daily_base_url: str = "https://api.daily.co/v1"

    daily_api_key: str = ""



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

            "database_url",

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

