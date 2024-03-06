import uuid
from enum import Enum

from pydantic import BaseModel, Field


class CategoriesEnum(Enum):
    IDIOMS: str = "idioms"
    TRANSPORT: str = "transport"
    SCHOOL: str = "school"
    PROFESSIONS: str = "professions"


class EnglishLevelEnum(Enum):
    A1: str = "A1"
    A2: str = "A2"
    B1: str = "B1"
    B2: str = "B2"
    C1: str = "C1"


class UnvalidatedWord(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    word: str
    category: str
    level: str

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "word": "Break the ice",
                "category": "idioms",
                "level": "A1",
            }
        }
