from http import HTTPStatus
from typing import Any

from fastapi import APIRouter, UploadFile
from fastapi.responses import JSONResponse

from ..errors import Error

router = APIRouter(prefix="/flashcards")


@router.get("/", responses={HTTPStatus.BAD_REQUEST: {"model": Error}})
async def flashcards_page() -> dict[str, Any]:
    return JSONResponse(
        status_code=HTTPStatus.OK, content={"message": "Sign in our login to get access to parser."}
    )


@router.post("/upload", responses={HTTPStatus.BAD_REQUEST: {"model": Error}})
async def upload_document(file: UploadFile) -> dict[str, Any]:
    return JSONResponse(status_code=HTTPStatus.CREATED, content={"filename": file.filename})
