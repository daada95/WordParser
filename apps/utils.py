import random
from typing import Any

import openai

from apps.db import get_mongo_db
from apps.models import CategoriesEnum, EnglishLevelEnum
from settings import settings


def get_random_category() -> str:
    return random.choice(list(CategoriesEnum)).value


def get_random_english_level() -> str:
    return random.choice(list(EnglishLevelEnum)).value


def get_new_words_from_AI(category: str, level: str) -> str:
    client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": (
                    f"Give me 10 of most common English words about {category} on {level} level."
                ),
            }
        ],
    )
    return response.choices[0].message.content


def clean_response_from_AI(words: str) -> list[str]:
    return [
        word for word in words.split() if not any(char.isdigit() for char in word.replace(".", ""))
    ]


def save_into_mongodb(collection: str, document: dict[str, Any]) -> None:
    return get_mongo_db()[collection].insert_one(document)
