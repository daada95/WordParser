from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv(".env")


class Settings(BaseSettings):
    APP_NAME: str = "Flashcards app"
    OPENAI_API_KEY: str
    MONGO_INITDB_ROOT_USERNAME: str
    MONGO_INITDB_ROOT_PASSWORD: str
    MONGO_INITDB_DATABASE: str
    REDIS_BROKER_URL: str


settings = Settings()
