from parser_app.models import Flashcard, FlashcardCategory
from rest_framework import serializers


class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ["category", "title", "content", "known"]


class FlashcardCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FlashcardCategory
        fields = ["name"]
