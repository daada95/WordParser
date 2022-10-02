from django import forms
from parser_app.models import FlashcardCategory


class LearningForm(forms.Form):
    category = forms.ModelChoiceField(queryset=FlashcardCategory.objects.filter())  # type: ignore
    number_of_flashcards = forms.IntegerField(help_text="How many flashcards you want to learn today?")
