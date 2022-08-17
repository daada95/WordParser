from django.test import TestCase, RequestFactory
from .views import index

# Create your tests here.


class TestViews(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_index_view(self):
        request = self.factory.get('')
        response = index(request)
        self.assertEquals(response.status_code, 200)
