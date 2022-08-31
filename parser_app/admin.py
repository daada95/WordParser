from django.contrib import admin
from .models import Flashcard, FlashcardCategory

# Register your models here.

admin.site.register(Flashcard)
admin.site.register(FlashcardCategory)
