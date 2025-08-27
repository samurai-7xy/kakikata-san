from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    jwt_secret_key: str
    access_token_expire_minutes: int
    refresh_token_expire_days: int
    openai_api_key: str

    model_config = {
        "env_file": ".env",
        "extra": "ignore",  # .env の余計なキーを無視
    }


settings = Settings()
