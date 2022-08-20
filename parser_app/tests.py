from django.test import TestCase, RequestFactory, Client
from parser_app.models import Flashcard


class TestFlashcardModel(TestCase):
    def test_create_flashcard(self):
        flashcard = Flashcard.objects.create(
            id=99,
            category="tests",
            title="test_flashcard",
            content="test flashcard."
        )
        self.assertIsInstance(flashcard, Flashcard)


# tests for views


class TestViews(TestCase):
    def setUp(self):
        self.client = Client()

    def test_home_view(self):
        response = self.client.get('')
        self.assertEquals(response.status_code, 200)

    def test_about_view(self):
        response = self.client.get('/about')
        self.assertEquals(response.status_code, 200)
