from flask_app import app


class TestViews:
    def test_hello_world_page(self):
        self.response = app.test_client().get('/hello-world')

        assert self.response.status_code == 200
        assert self.response.data.decode('utf-8') == 'Hello, World!'
        assert self.response.data.decode('utf-8') != 'Welcome in Word Parser app!'

    def test_home_page(self):
        self.response = app.test_client().get('/')
        self.second_response = app.test_client().get('/home')

        assert self.response.status_code == 200
        assert "<h3>Welcome on Word Parser app!</h3>" in self.response.data.decode('utf-8')

        assert self.second_response.status_code == 200
        assert "<h3>Welcome on Word Parser app!</h3>" in self.response.data.decode('utf-8')
