from django import forms


class WordDocumentForm(forms.Form):
    document = forms.Filefield()