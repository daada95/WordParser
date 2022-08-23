from django.urls import path
from .views import HomePageView, AboutView, CategoryListView, FlashcardsDetailView, \
    FlashcardCreate, FlashcardUpdate, FlashcardDelete, FlashcardNavigation, CategoryCreate, CategoryUpdate, \
    CategoryDelete

urlpatterns = [
    path('', HomePageView.as_view(), name="home_page"),
    path('about', AboutView.as_view(), name="about"),
    path('flashcards-nav/', FlashcardNavigation.as_view(), name="flashcards_navigation"),
    path('category/', CategoryListView.as_view(), name="category"),
    path('category/add/', CategoryCreate.as_view(), name="category_create"),
    path('category/<int:pk>/update', CategoryUpdate.as_view(), name="category_update"),
    path('category/<int:pk>/delete', CategoryDelete.as_view(), name="category_delete"),
    path('flashcards/add', FlashcardCreate.as_view(), name="flashcard_create"),
    path('flashcards/<int:pk>', FlashcardsDetailView.as_view(), name="category_detail"),
    path('flashcards/<int:pk>/update', FlashcardUpdate.as_view(), name="flashcard_update"),
    path('flashcards/<int:pk>/delete', FlashcardDelete.as_view(), name="flashcard_delete"),
]
