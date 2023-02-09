from pathlib import Path
from typing import IO, Generator
from uuid import uuid4

import aiofiles
from fastapi import BackgroundTasks, HTTPException, Request, UploadFile
from fastapi.params import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db

from .models import User, Video
from .schemas import UploadVideo


async def save_video(
    user: User,
    file: UploadFile,
    title: str,
    description: str,
    db: AsyncSession
):
    file_name = f"media/{user.id}_{uuid4()}.mp4"
    if file.content_type == 'video/mp4':
        await write_video(file_name, file)
    else:
        raise HTTPException(status_code=418, detail='Неправильный формат видео')
    info = UploadVideo(title=title, description=description)
    new_video = Video(file=file_name, user_id=user.id, **info.dict())
    db.add(new_video)
    await db.commit()
    await db.refresh(new_video)
    return new_video


async def write_video(file_name: str, file: UploadFile):
    async with aiofiles.open(file_name, "wb") as buffer:
        data = await file.read()
        await buffer.write(data)


def get_data_from_video(file_path: str) -> Generator:
    with open(file=file_path, mode="rb") as file_like:
        yield from file_like



# def ranged(
#         file: IO[bytes],
#         start: int = 0,
#         end: int = None,
#         block_size: int = 8192,
# ):
#     consumed = 0

#     file.seek(start)
#     while True:
#         data_length = min(block_size, end - start - consumed) if end else block_size
#         if data_length <= 0:
#             break
#         data = file.read(data_length)
#         if not data:
#             break
#         consumed += data_length
#         yield data

#     if hasattr(file, 'close'):
#         file.close()


# async def open_file(request: Request, video_pk: int, db: AsyncSession):
#     query = select(Video).filter(Video.id==video_pk)
#     result = await db.execute(query)
#     file = result.scalars().one()
#     path = Path(file.file)
#     file = path.open('rb')
#     file_size = path.stat().st_size

#     content_length = file_size
#     status_code = 200
#     headers = {}
#     content_range = request.headers.get('range')

#     if content_range is not None:
#         content_range = content_range.strip().lower()
#         content_ranges = content_range.split('=')[-1]
#         range_start, range_end, *_ = map(str.strip, (content_ranges + '-').split('-'))
#         range_start = max(0, int(range_start)) if range_start else 0
#         range_end = min(file_size - 1, int(range_end)) if range_end else file_size - 1
#         content_length = (range_end - range_start) + 1
#         file = ranged(file, start=range_start, end=range_end + 1)
#         status_code = 206
#         headers['Content-Range'] = f'bytes {range_start}-{range_end}/{file_size}'

#     return file, status_code, content_length, headers
