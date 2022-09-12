from django.shortcuts import render
from parser_app.models import Flashcard, FlashcardCategory
from .serializers import FlashcardSerializer, FlashcardCategorySerializer
from rest_framework import viewsets

# Create your views here.


class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer


class FlashcardCategoryViewSet(viewsets.ModelViewSet):
    queryset = FlashcardCategory.objects.all()
    serializer_class = FlashcardCategorySerializer
