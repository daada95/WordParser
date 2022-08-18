from django.urls import path
from .views import index, AboutView

urlpatterns = [
    path('', index, name="index"),
    path('about', AboutView.as_view(), name="about")
]
