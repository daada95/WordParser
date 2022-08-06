from . import app
from flask import render_template


@app.route('/hello-world')
def hello_world_page():
    return "Hello, World!"


@app.route('/')
@app.route('/home')
def home_page():
    return render_template('home.html')
