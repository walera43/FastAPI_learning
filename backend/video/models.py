import datetime
from typing import List, Optional

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

from backend.auth.models import User
from db import Base


class BaseModel(Base):
    __abstract__ = True
    
    id: int = Column(Integer, nullable=False, unique=True, primary_key=True, autoincrement=True)
    create_at: datetime.datetime = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

class Video(BaseModel):
    __tablename__ = 'videos'

    title: str = Column(String(80))
    description: str = Column(String(500))
    file: str = Column(String(1000))
    user_id: Optional[User] = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'))
    user = relationship("User", back_populates='videos')
