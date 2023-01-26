from pydantic import BaseModel, EmailStr, UUID4


class User(BaseModel):
    username: str
    email: EmailStr


class UserCreate(User):
    username: str
    email: EmailStr


class UserUpdate(User):
    pass


class UserOut(BaseModel):
    id: UUID4
    username: str