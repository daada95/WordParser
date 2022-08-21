from django.db import models

# Create your models here.


class FlashcardCategory(models.Model):
    category = models.CharField(max_length=30, unique=True, help_text="Category of flashcards.")

    def __str__(self):
        return self.category


class Flashcard(models.Model):
    id = models.IntegerField(primary_key=True)
    category = models.ForeignKey(FlashcardCategory, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, help_text="Title of flashcard.")
    content = models.TextField(unique=True, help_text="Content (reverse) of flashcard.")

    def __str__(self):
        return self.title
