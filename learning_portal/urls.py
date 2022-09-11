from rest_framework import routers
from django.urls import path, include
from .views import FlashcardViewSet

router = routers.DefaultRouter()
router.register(r'flashcards', FlashcardViewSet)

urlpatterns = [
    path('', include(router.urls))
]
