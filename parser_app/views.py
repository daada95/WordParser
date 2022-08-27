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


# CRUD on categories:


class CategoryCreate(CreateView):
    """
    Making CRUD -> C -> Create.
    View where user can manually create a flashcard.
    When user will submit a flashcard, he/she is going to be moved to FlashcardNavigation view.
    """
    model = FlashcardCategory
    fields = ["category"]
    template_name = "categories/category_create.html"
    success_url = reverse_lazy("category")


class CategoryListView(ListView):
    """
    Making CRUD -> R -> Read.
    View where user can see all his/hers categories listed on website.
    Then user can go further to chosen category to see all flashcards made in that category.
    """
    template_name = 'categories/category_list.html'
    model = FlashcardCategory


class CategoryListDetailView(ListView):
    """
    Making CRUD -> R -> Read.
    View where user can see all flashcards made in chosen category.
    """
    model = Flashcard
    template_name = "categories/category_list_of_flashcards.html"

    def get_queryset(self):
        id = self.kwargs.get("pk")
        return Flashcard.objects.filter(category__id=id)    # type: ignore


class CategoryUpdate(UpdateView):
    """
    Making CRUD -> U -> Update.
    View where user can update information about chosen category.
    """
    template_name = "categories/category_update.html"
    model = FlashcardCategory
    fields = ["category"]
    success_url = reverse_lazy('home_page')

    def get_object(self, **kwargs):
        return get_object_or_404(FlashcardCategory, id=self.kwargs.get("pk"))


class CategoryDelete(DeleteView):
    """
    Making CRUD -> D -> Delete.
    View where user can delete chosen category.
    User will be asked if he/she is sure if he/she wants to delete a category.
    """
    template_name = "categories/category_delete.html"
    model = FlashcardCategory
    success_url = reverse_lazy("home_page")

    def get_object(self, **kwargs):
        return get_object_or_404(FlashcardCategory, id=self.kwargs.get("pk"))


# CRUD on Flashcards:


class FlashcardsDetailView(DetailView):
    model = Flashcard
    template_name = "categories/category_details.html"

    def get_object(self, **kwargs):
        return get_object_or_404(Flashcard, id=self.kwargs.get("pk"))


class FlashcardCreate(CreateView):
    template_name = "flashcards/create_flashcard.html"
    model = Flashcard
    fields = ["category", "title", "content"]
    success_url = reverse_lazy("home_page")


class FlashcardUpdate(UpdateView):
    template_name = "flashcards/update_flashcard.html"
    model = Flashcard
    fields = ["category", "title", "content"]
    success_url = reverse_lazy("category")

    def get_object(self, **kwargs):
        return get_object_or_404(Flashcard, id=self.kwargs.get("pk"))


class FlashcardDelete(DeleteView):
    template_name = "flashcards/delete_flashcard.html"
    model = Flashcard
    success_url = reverse_lazy("home_page")
