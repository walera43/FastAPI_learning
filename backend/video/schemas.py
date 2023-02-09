from typing import Dict, List, Tuple, Union

from pydantic import BaseModel


class UploadVideo(BaseModel):
    title: str
    description: str



class GetVideo(BaseModel):
    id: int
    title: str
    description: str
    file: str

    class Config:
        orm_mode = True


