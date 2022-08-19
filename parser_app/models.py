from django.db import models

# Create your models here.


class Flashcard(models.Model):
    id = models.IntegerField(primary_key=True)
    category = models.CharField(max_length=30, help_text="Category of flashcards.")
    title = models.CharField(max_length=50, help_text="Title of flashcard.")
    content = models.TextField(unique=True, help_text="Content (reverse) of flashcard.")

    def __str__(self):
        return self.title
