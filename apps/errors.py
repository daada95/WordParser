from typing import Union

from pydantic import BaseModel


class Error(BaseModel):
    error: str
    details: Union[str, dict, list]
