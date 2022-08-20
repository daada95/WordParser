from django.forms import ModelForm
from .models import Flashcard

# Create your forms here.


class FlashcardForm(ModelForm):
    class Meta:
        model = Flashcard
        exclude = ("id",)
