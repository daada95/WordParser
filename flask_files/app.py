from flask import Flask

app = Flask(__name__)

@app.route('/')
def get():
    return "Hello in Word Parser app"

if __name__ == '__main__':
    app.run(debug=True)
