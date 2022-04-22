import os.path
import time
from os import listdir
from os.path import isfile, join

from Parser.parser import create_flashcards, flashcard_to_json


def listening():
    path = '/Users/wojciechziarnik/Desktop/listening_function/'
    while True:
        files = [x for x in listdir(path) if isfile(join(path,x))]
        print(files)
        for i in os.listdir(path):
            full_path = os.path.join(path, i)
            if os.path.isfile(full_path):
                print(full_path)
                if full_path.endswith('.docx'):
                    create_flashcards(full_path)
                    flashcard_to_json()
                os.remove(full_path)
        time.sleep(10)


if __name__ == '__main__':
    listening()