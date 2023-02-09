import datetime

from fastapi import Depends
from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from pydantic import EmailStr
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import relationship

from db import Base, get_db


class BaseModel(Base):
    __abstract__ = True
    
    id: int = Column(Integer, nullable=False, unique=True, primary_key=True, autoincrement=True)
    create_at: datetime.datetime = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

class User(SQLAlchemyBaseUserTable[int], BaseModel):
    __tablename__ = 'users'

    username: str = Column(String(80))
    videos = relationship("Video", back_populates='user')
    email: EmailStr
    hashed_password: str
    is_active: bool
    is_superuser: bool
    is_verified: bool


async def get_user_db(session: AsyncSession = Depends(get_db)):
    yield SQLAlchemyUserDatabase(session, User)