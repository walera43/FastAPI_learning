import datetime

from fastapi import FastAPI
from fastapi_users import FastAPIUsers

from backend.auth.api import user_router
from backend.auth.auth import auth_backend
from backend.auth.manager import get_user_manager
from backend.auth.models import User
from backend.auth.schemas import UserCreate, UserRead
from db import Base, create_db_and_tables, engine
from backend.video.api import video_router

app = FastAPI()


@app.on_event("startup")
async def startup() -> None:
    await create_db_and_tables()


fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(user_router)
app.include_router(video_router)

