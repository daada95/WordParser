from django.views.generic import TemplateView, ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Flashcard
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy

# Create your views here.


class HomePageView(TemplateView):
    template_name = 'home.html'


class AboutView(TemplateView):
    template_name = 'about.html'


class FlashcardsCategoryView(ListView):
    template_name = 'category_list.html'
    model = Flashcard


class FlashcardsCategoryDetailView(DetailView):
    model = Flashcard
    template_name = "category_details.html"

    def get_object(self, **kwargs):
        return get_object_or_404(Flashcard, id=self.kwargs.get("pk"))


class FlashcardCreate(CreateView):
    template_name = "create_flashcard.html"
    model = Flashcard
    fields = ["category", "title", "content"]
    success_url = reverse_lazy("home_page")


class FlashcardUpdate(UpdateView):
    template_name = "update_flashcard.html"
    model = Flashcard
    fields = ["category", "title", "content"]
    success_url = reverse_lazy("category")


class FlashcardDelete(DeleteView):
    template_name = "delete_flashcard.html"
    model = Flashcard
    success_url = reverse_lazy("home_page")
