from typing import Optional, List
from backend.video.schemas import GetVideo
from fastapi_users import schemas
from pydantic import EmailStr, BaseModel


class GetUser(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True


class UserRead(schemas.BaseUser[int]):
    id: int
    username: str
    email: EmailStr
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False

    class Config:
        orm_mode = True



class UserCreate(schemas.BaseUserCreate):
    username: str
    email: EmailStr
    password: str
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False



class GetUserVideo(GetUser):
    videos: List[GetVideo]

    class Config:
        orm_mode = True