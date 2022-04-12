# Fonts used in doc: Title / Heading 1 / Heading 2 / Normal

from docx import Document


docs = Document("/Users/wojciechziarnik/Desktop/Test_files/plik_testowy.docx")
flashcards = {}

headings = []
texts = []
for paragraph in docs.paragraphs:
    if paragraph.style.name == "Heading 2":
        headings.append(paragraph.text)
    elif paragraph.style.name == "Normal":
        texts.append(paragraph.text)

print(headings)
print(texts)