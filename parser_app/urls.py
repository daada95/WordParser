from django.urls import path
from .views import index, AboutView, CategoryView, CategoryDetailView

urlpatterns = [
    path('', index, name="index"),
    path('about', AboutView.as_view(), name="about"),
    path('category', CategoryView.as_view(), name="category"),
    path('category/<int:pk>', CategoryDetailView.as_view(), name="category_detail"),
]
