from django.forms import ModelForm
from .models import Flashcard, FlashcardCategory

# Create your forms here.


class FlashcardForm(ModelForm):
    class Meta:
        model = Flashcard
        exclude = ("id",)


class CategoryForm(ModelForm):
    class Meta:
        model = FlashcardCategory
        exclude = ("id",)
