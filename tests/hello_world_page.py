from flask_app import app


def test_homepage():
    response = app.test_client().get('/hello-world')

    assert response.status_code == 200
    assert response.data.decode('utf-8') == 'Hello, World!'
    assert response.data.decode('utf-8') != 'Welcome in Word Parser app!'
