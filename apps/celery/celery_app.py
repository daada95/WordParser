from celery import Celery
from celery.schedules import crontab

from settings import settings

celery_app: Celery = Celery(
    "open_ai_downloader", broker=settings.REDIS_BROKER_URL, backend=settings.REDIS_BROKER_URL
)

celery_app.conf.beat_schedule = {
    "get-new-words-each-five-minutes": {
        "task": "apps.celery.worker.get_words_parse_and_store_in_database",
        "schedule": crontab(minute="*/5"),
    },
}
