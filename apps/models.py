from enum import Enum


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
