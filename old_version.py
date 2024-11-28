# if form.is_valid():
#     """
#     Here app is checking if form is valid (if the user is uploading correct files).
#     Than document is parsed by paragraphs and paragraphs becomes variables used in creating flashcards.
#     """
#     uploaded_document = request.FILES['document']
#     document_to_parse = Document(uploaded_document)
#     category = str()
#     title = str()
#     flashcards_dict = dict()
#     for paragraph in document_to_parse.paragraphs:
#         if paragraph.style.name == 'Title':
#             category = paragraph.text
#             flashcard_category_instance = FlashcardCategory(name=category)
#             flashcard_category_instance.save()
#         elif paragraph.style.name == "Heading 1":
#             title = paragraph.text
#         elif paragraph.style.name == "normal":
#             content = paragraph.text
#             flashcards_dict[title] = content

#     for key in flashcards_dict.keys():
#         flashcard_instance = Flashcard(category=FlashcardCategory.objects.get(name=category),   # type: ignore
#                                        title=key,
#                                        content=flashcards_dict[key])
