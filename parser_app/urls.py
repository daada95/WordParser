from django.urls import path
from .views import HomePageView, AboutView, CategoryView, CategoryDetailView

urlpatterns = [
    path('', HomePageView.as_view(), name="home_page"),
    path('about', AboutView.as_view(), name="about"),
    path('category', CategoryView.as_view(), name="category"),
    path('category/<int:pk>', CategoryDetailView.as_view(), name="category_detail"),
]
