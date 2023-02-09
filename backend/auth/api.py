from fastapi import APIRouter, Depends
from fastapi_users import FastAPIUsers
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from db import get_db
from typing import List
from backend.auth.schemas import GetUserVideo, GetUser
from backend.auth.auth import auth_backend
from backend.auth.manager import get_user_manager

from .models import User

user_router = APIRouter()

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)
current_user = fastapi_users.current_user()


@user_router.get("/protected-route")
def protected_route(user: User = Depends(current_user)):
    return f"Hello, {user.email}"




@user_router.get("/api/user/{user_name}", response_model=List[GetUserVideo])
async def get_list_video(user_name: str, db: AsyncSession = Depends(get_db)):
    query = select(User).where(User.username == user_name).options(selectinload(User.videos))
    result = await db.execute(query)
    return result.scalars().all()


@user_router.get("/api/users", response_model=List[GetUser])
async def get_list_users(db: AsyncSession = Depends(get_db)):
    query = select(User)
    result = await db.execute(query)
    return result.scalars().all()