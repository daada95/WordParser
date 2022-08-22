from django.views.generic import TemplateView, ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Flashcard, FlashcardCategory
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy

# Create your views here.


class HomePageView(TemplateView):
    template_name = 'home.html'


class AboutView(TemplateView):
    template_name = 'about.html'


class FlashcardNavigation(TemplateView):
    template_name = 'flashcard_navigation.html'


class FlashcardsCategoryView(ListView):
    template_name = 'categories/category_list.html'
    model = Flashcard


class CategoryCreate(CreateView):
    model = FlashcardCategory
    template_name = "categories/category_create.html"
    fields = ["category"]
    success_url = reverse_lazy("home_page")


class CategoryUpdate(UpdateView):
    template_name = "categories/category_update.html"
    model = FlashcardCategory
    fields = ["category"]
    success_url = reverse_lazy('home_page')


class FlashcardsCategoryDetailView(DetailView):
    model = Flashcard
    template_name = "categories/category_details.html"

    def get_object(self, **kwargs):
        return get_object_or_404(Flashcard, id=self.kwargs.get("pk"))


class FlashcardCreate(CreateView):
    template_name = "flashcards/create_flashcard.html"
    model = Flashcard
    fields = ["category", "title", "content"]
    success_url = reverse_lazy("home_page")


class FlashcardUpdate(UpdateView):  # I have some bug here.. Can't update test category.
    template_name = "flashcards/update_flashcard.html"
    model = Flashcard
    fields = ["category", "title", "content"]
    success_url = reverse_lazy("category")


class FlashcardDelete(DeleteView):
    template_name = "flashcards/delete_flashcard.html"
    model = Flashcard
    success_url = reverse_lazy("home_page")
