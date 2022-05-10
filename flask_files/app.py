from flask import Flask, render_template, request, redirect


app = Flask(__name__)


@app.route('/hello')
def hello():
    return "<h1>Hello in Word Parser app</h1>"

@app.route('/about')
def about():
    return render_template("/about.html")

@app.route('/upload-document', methods=["GET", "POST"])
def upload_document():

    if request.method == "POST":
        if request.files:
            document = request.files["document"]
            print("Nice one! You got this!")
            print(document)
            return redirect(request.url)

    return render_template("upload_document.html")


if __name__ == '__main__':
    app.run(debug=True)
