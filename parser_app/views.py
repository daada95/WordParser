from django.views.generic import TemplateView, ListView, DetailView
from .models import Flashcard
from django.shortcuts import get_object_or_404

# Create your views here.


class HomePageView(TemplateView):
    template_name = 'home.html'


class AboutView(TemplateView):
    template_name = 'about.html'


class CategoryView(ListView):
    template_name = 'category_list.html'
    model = Flashcard


class CategoryDetailView(DetailView):
    model = Flashcard
    template_name = "category_details.html"

    def get_object(self, **kwargs):
        return get_object_or_404(Flashcard, id=self.kwargs.get("pk"))
