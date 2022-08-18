from django.test import TestCase, RequestFactory, Client
from parser_app.models import Flashcard
from parser_app.views import index


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
        self.factory = RequestFactory()

    def test_index_view(self):
        request = self.factory.get('')
        response = index(request)
        self.assertEquals(response.status_code, 200)


class TestAboutView(TestCase):
    def setUp(self):
        self.client = Client()

    def test_about_view(self):
        response = self.client.get('/parser-app/about')
        self.assertEquals(response.status_code, 200)
