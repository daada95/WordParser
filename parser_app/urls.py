from django.urls import path
from .views import HomePageView, AboutView, FlashcardsCategoryView, FlashcardsCategoryDetailView, \
    FlashcardCreate, FlashcardUpdate, FlashcardDelete, FlashcardNavigation, CategoryCreate, CategoryUpdate

urlpatterns = [
    path('', HomePageView.as_view(), name="home_page"),
    path('about', AboutView.as_view(), name="about"),
    path('flashcards-nav/', FlashcardNavigation.as_view(), name="flashcards_navigation"),
    path('flashcards/', FlashcardsCategoryView.as_view(), name="category"),
    path('category/add/', CategoryCreate.as_view(), name="category_create"),
    path('category/<int:pk>/update', CategoryUpdate.as_view(), name="category_update"),
    path('flashcards/<int:pk>', FlashcardsCategoryDetailView.as_view(), name="category_detail"),
    path('flashcards/add', FlashcardCreate.as_view(), name="flashcard_create"),
    path('flashcards/<int:pk>/update', FlashcardUpdate.as_view(), name="flashcard_update"),
    path('flashcards/<int:pk>/delete', FlashcardDelete.as_view(), name="flashcard_delete"),
]
