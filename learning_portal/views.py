import json

from parser_app.models import Flashcard
from .serializers import FlashcardSerializer
from .forms import LearningForm

from django.shortcuts import render, redirect
from django.http import JsonResponse

# Create your views here.


def start_view(request):
    """
    View where user is choosing the category he/she wants to learn flashcards from and number of flashcards.
    After submit the form view will upload chosen number of flashcards from chosen category.
    """
    if request.method == "POST":
        form = LearningForm(request.POST)
        if form.is_valid():
            category_to_learn = form.cleaned_data["category"]
            number_of_flashcards_to_learn = form.cleaned_data["number_of_flashcards"]
            request.session['category_to_learn'] = str(category_to_learn)
            request.session['number_of_flashcards_to_learn'] = number_of_flashcards_to_learn
            return redirect('learning_portal')
    else:
        form = LearningForm()
    return render(request, "start_page.html", {"form": form})


def learning_portal(request):
    """
    View where user can start learning chosen flashcards.
    """
    category = request.session.get('category_to_learn')
    limit = request.session.get('number_of_flashcards_to_learn')
    queryset = Flashcard.objects.filter(category__name=category)[:limit]    # type: ignore
    serializer = FlashcardSerializer(queryset, many=True)
    # 1:
    data = json.dumps(serializer.data, indent=4)
    return render(request, "flashcard_challenge.html", {"data": data})
    # 2:
    # return JsonResponse(serializer.data, safe=False)
