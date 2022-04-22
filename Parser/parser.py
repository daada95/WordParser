# Fonts used in doc: Title / Heading 1 / Heading 2 / Normal
from docx import Document
import json

flashcards = dict()

def create_flashcards(path):
    docs = Document(path)
    heading = str()
    text = str()
    title = str()
    for paragraph in docs.paragraphs:
        if paragraph.style.name == 'Title':
            title = paragraph.text
        elif paragraph.style.name == "Heading 1":
            heading = paragraph.text
        elif paragraph.style.name == "Normal":
            text = paragraph.text
            flashcards[title] = heading
            flashcards[heading] = text
    return flashcards

def flashcard_to_json():
    with open('json_file.json','w+') as json_file:
        json.dump(flashcards,json_file)

if __name__ == '__main__':
    create_flashcards('/Users/wojciechziarnik/Desktop/Test_files/mongodb_commands.docx')
    flashcard_to_json()