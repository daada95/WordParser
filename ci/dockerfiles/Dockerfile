FROM python:3.12.2-slim-bullseye

LABEL maintainer="woj.ziarnik@gmail.com"

# Set the environment variable to unbuffered mode to see output logs in real-time
ENV PYTHONUNBUFFERED 1

WORKDIR /srv

COPY ./requirements.lock.txt /srv/requirements.lock.txt

RUN pip install --upgrade pip && pip install -r /srv/requirements.lock.txt

COPY . /srv/
