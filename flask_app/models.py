from . import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=30), unique=True, nullable=False)
    email = db.Column(db.String(length=50), unique=True, nullable=False)
    password_hash = db.Column(db.String(length=60), nullable=False)
    flashcards = db.relationship('Flashcard', backref='flashcard_author', lazy=True)


class Flashcard(db.Model):
    __tablename__ = 'flashcards'
    id = db.Column(db.Integer(), primary_key=True)
    content = db.Column(db.String(length=200), unique=True)
    author = db.Column(db.Integer(), db.ForeignKey('user.id'))
