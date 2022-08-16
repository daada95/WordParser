from . import app
from flask import render_template
from flask import request


@app.route('/hello-world')
def hello_world_page():
    return "Hello, World!"


@app.route('/')
@app.route('/home')
def home_page():
    return render_template('home.html')


@app.route('/flashcards', methods=["GET", "POST"])
def flashcards():
    flashcards_example = [
        {
            "id": 1,
            "title": "test1",
            "content": "testcontent1",
        },
        {
            "id": 2,
            "title": "test2",
            "content": "testcontent2",
        },
        {
            "id": 3,
            "title": "test3",
            "content": "testcontent3",
        }
    ]

    # if request.form['submit_button'] == 'Do Something':
    if request.method == "POST":
        return "Do something"

    return render_template('flashcards.html', flashcards_example=flashcards_example)
