#!/bin/bash

# Sprawdź argumenty przekazane do skryptu
case "$1" in
    run-uvicorn)
        uvicorn main:app --host 0.0.0.0 --port 8000
        ;;
    run-celery)
        celery -A apps.celery.celery_app.celery_app worker --loglevel=info -E  # TODO
        ;;
    *)
        echo "Użycie: $0 {run-uvicorn|run-celery}"
        exit 1
esac

exit 0
