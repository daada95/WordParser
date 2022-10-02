from django.urls import path
from .views import start_view, learning_portal

urlpatterns = [
    path('', start_view, name="start_page"),
    path('start-learning/', learning_portal, name="learning_portal"),
]
