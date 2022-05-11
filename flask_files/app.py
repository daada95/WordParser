from pymongo import MongoClient
from flask import Flask, render_template, request, redirect


app = Flask(__name__)


CONNECTION_STRING = "mongodb+srv://Root:root1@Parser.wvfrb.mongodb.net/parser?retryWrites=true&w=majority"

cluster = MongoClient(CONNECTION_STRING, tls=True, tlsAllowInvalidCertificates=True)
db = cluster["parser"]
collection = db["flashcards"]



@app.route('/hello')
def hello():
    return "<h1>Hello in Word Parser app</h1>"

@app.route('/about')
def about():
    return render_template("/about.html")

@app.route('/upload-document', methods=["GET", "POST"])
def upload_document():

    if request.method == "POST":
        email = request.form["email"]
        print(f"I got your email adress! Is it {email}?")
        if request.files:
            document = request.files["document"]
            print(document)
            return f"File {document} uploaded by {email}."
    else:
        return render_template("upload_document.html")

@app.route('/mongodb-connection')
def connect_flask_to_mongodb():
    try:
        db.flashcards.insert_one({"Connected": "True", "name": "Wojtek"})
    except:
        return "Had an issue with inserting this to db"
    return "Connected to MongoDB - great job!"



if __name__ == '__main__':
    app.run(debug=True)
