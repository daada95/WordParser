from django.views.generic import TemplateView, ListView, CreateView, UpdateView, DeleteView
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render, redirect
from django.urls import reverse_lazy
from .models import Flashcard, FlashcardCategory
from .forms import WordDocumentForm
from docx import Document

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
    fields = ["name"]
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
        return Flashcard.objects.filter(category__id=self.kwargs.get("pk"))    # type: ignore


class CategoryUpdate(UpdateView):
    """
    Making CRUD -> U -> Update.
    View where user can update information about chosen category.
    """
    template_name = "categories/category_update.html"
    model = FlashcardCategory
    fields = ["name"]
    success_url = reverse_lazy('category')

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


class FlashcardCreate(CreateView):
    template_name = "flashcards/create_flashcard.html"
    model = Flashcard
    fields = ["category", "title", "content", "known"]
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


# Uploading documents View:


def upload_documents_and_parse(request):
    """
    Function based view where user can upload his/hers document (only .docx).
    The documents requiremets are on 'about' page.
    Then app is going to try to parse the document and create flashcards.
    If something goes wrong, user will get 404.
    """
    if request.method == "POST":
        form = WordDocumentForm(request.POST, request.FILES)
        if form.is_valid():
            """
            Here app is checking if form is valid (if the user is uploading correct files).
            Than document is parsed by paragraphs and paragraphs becomes variables used in creating flashcards.
            """
            uploaded_document = request.FILES['document']
            document_to_parse = Document(uploaded_document)
            category = str()
            title = str()
            flashcards_dict = dict()
            for paragraph in document_to_parse.paragraphs:
                if paragraph.style.name == 'Title':
                    category = paragraph.text
                    flashcard_category_instance = FlashcardCategory(name=category)
                    flashcard_category_instance.save()
                elif paragraph.style.name == "Heading 1":
                    title = paragraph.text
                elif paragraph.style.name == "normal":
                    content = paragraph.text
                    flashcards_dict[title] = content

            for key in flashcards_dict.keys():
                flashcard_instance = Flashcard(category=FlashcardCategory.objects.get(name=category),   # type: ignore
                                               title=key,
                                               content=flashcards_dict[key])
                flashcard_instance.save()

            return redirect("category")
        else:
            HttpResponse("Something went wrong. Try again.")
    else:
        form = WordDocumentForm()
    return render(request, "upload_and_parse.html", {"form": form})
