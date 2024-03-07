import random
from typing import Any

import openai
from celery import Celery

from apps.db import get_mongo_db
from apps.models import CategoriesEnum, EnglishLevelEnum, UnvalidatedWord
from settings import settings

celery_worker: Celery = Celery("open_ai_downloader", broker=settings.REDIS_BROKER_URL)


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
    raw_words: str = response.choices[0].message.content
    return {"category": category, "level": level, "raw_words": raw_words}


def clean_response_from_AI(words: str) -> list[str]:
    return [
        word for word in words.split() if not any(char.isdigit() for char in word.replace(".", ""))
    ]
