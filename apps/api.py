from http import HTTPStatus

from fastapi import APIRouter

from .errors import Error

router = APIRouter()


@router.get(
    path="/",
    responses={
        HTTPStatus.BAD_REQUEST: {"model": Error},
    },
)
async def welcome() -> dict[str, str]:
    return {"response": "Welcome in word parser app!"}
