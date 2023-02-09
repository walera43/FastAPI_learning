from typing import List

from fastapi import APIRouter, File, Form, Request, UploadFile
from fastapi.params import Depends
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload

from db import async_session, get_db
from backend.auth.api import current_user
from .models import User, Video
from .schemas import GetVideo, UploadVideo
from backend.auth.schemas import GetUserVideo
from .services import save_video, get_data_from_video

video_router = APIRouter()

@video_router.post("/api/create_video")
async def create_video(
    file: UploadFile,
    title: str = Form(...),
    description: str = Form(...),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(current_user)
):
    return await save_video(
        user=user,
        file=file,
        title=title,
        description=description,
        db=db)


@video_router.get("/video/{video_pk}", response_model=GetVideo)
async def get_video(video_pk: int, db: AsyncSession = Depends(get_db)):
    query = select(Video).filter(Video.id == video_pk)
    result = await db.execute(query)
    file = result.scalars().one()
    response = StreamingResponse(get_data_from_video(file_path=file.file), status_code=200, media_type="video/mp4")
    return response


@video_router.get('/videos', response_model=List[GetVideo])
async def get_videos(db: AsyncSession = Depends(get_db)):
    query = select(Video)
    result = await db.execute(query)
    return result.scalars().all()


# @video_router.get("/video/{video_pk}")
# async def get_streaming_video(request: Request, video_pk: int, db: AsyncSession = Depends(get_db)) -> StreamingResponse:
#     file, status_code, content_length, headers = await open_file(request, video_pk, db)
#     response = StreamingResponse(
#         file,
#         media_type='video/mp4',
#         status_code=status_code,
#     )

#     response.headers.update({
#         'Accept-Ranges': 'bytes',
#         'Content-Length': str(content_length),
#         **headers,
#     })
#     return 

