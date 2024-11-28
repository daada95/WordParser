from typing import Any

from apps.celery.celery_app import celery_app
from apps.models import UnvalidatedWord
from apps.utils import (clean_response_from_AI, get_new_words_from_AI,
                        get_random_category, get_random_english_level,
                        save_into_mongodb)


@celery_app.shared_task()
def get_words_parse_and_store_in_database(*args, **kwargs):
    category: str = get_random_category()
    level: str = get_random_english_level()
    words_before_cleaning: dict[str, Any] = get_new_words_from_AI(category=category, level=level)
    cleaned_words = clean_response_from_AI(words_before_cleaning)
    for word in cleaned_words:
        document = UnvalidatedWord(level=level, category=category, word=word).model_dump()
        save_into_mongodb(collection="unvalidated_words", document=document)
