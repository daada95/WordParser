from django.db import models

# Create your models here.


class FlashcardCategory(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30, unique=True, help_text="Category of flashcards.")

    def __str__(self):
        return self.name


class Flashcard(models.Model):
    id = models.IntegerField(primary_key=True)
    category = models.ForeignKey(FlashcardCategory, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, help_text="Title of flashcard.")
    content = models.TextField(help_text="Content (reverse) of flashcard.")
    known = models.BooleanField(default=False, help_text="Status of flashcard.")

    def __str__(self):
        return f"{self.title} - {self.content}"
