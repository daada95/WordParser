#!/bin/bash

# Sprawdź argumenty przekazane do skryptu
case "$1" in
    run-uvicorn)
        uvicorn main:app --host 0.0.0.0 --port 8000
        ;;
    run-celery)
        celery -A your_celery_app_name worker --loglevel=info  # TODO
        ;;
    fastapi-dev)
        fastapi dev main.py
        ;;
    *)
        echo "Użycie: $0 {run-uvicorn|run-celery}"
        exit 1
esac

exit 0
