from rest_framework import routers
from django.urls import path, include
from .views import FlashcardViewSet, FlashcardCategoryViewSet, StartPage

urlpatterns = [
    path('', StartPage.as_view(), name="start_page"),
]
