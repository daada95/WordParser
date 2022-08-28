# Generated by Django 4.1 on 2022-08-18 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parser_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flashcard',
            name='category',
            field=models.CharField(help_text='Category of flashcards.', max_length=30),
        ),
        migrations.AlterField(
            model_name='flashcard',
            name='title',
            field=models.CharField(help_text='Title of flashcard.', max_length=50),
        ),
    ]