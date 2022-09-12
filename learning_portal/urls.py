from rest_framework import routers
from django.urls import path, include
from .views import FlashcardViewSet, FlashcardCategoryViewSet

router = routers.DefaultRouter()
router.register(r'flashcard', FlashcardViewSet)
router.register(r'flashcard-category', FlashcardCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
