from fastapi import FastAPI


def setup_routing(app: FastAPI) -> None:
    from apps.api import router as main_router
    from apps.wordparser.parser_api import router as wordparser_router

    app.include_router(main_router)
    app.include_router(wordparser_router)


def create_app() -> FastAPI:
    app = FastAPI()
    setup_routing(app)
    return app


app = create_app()
