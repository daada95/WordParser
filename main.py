from fastapi import FastAPI


def setup_routing(app: FastAPI) -> None:
    return


def create_app() -> FastAPI:
    app = FastAPI()
    setup_routing(app)
    return app


app = create_app()
