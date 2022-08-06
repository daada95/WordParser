from . import app


@app.route('/')
def homepage():
    return "Hello, World!"
