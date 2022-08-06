from . import app


@app.route('/hello-world')
def hello_world_page():
    return "Hello, World!"
