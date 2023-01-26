from fastapi import UploadFile, File, APIRouter, Form, BackgroundTasks, Request
from fastapi.responses import StreamingResponse
from .schemas import UploadVideo, GetVideo, GetListVideo
from typing import List
from .services import save_video
from .models import Video, User

video_router = APIRouter()


@video_router.post("/")
async def create_video(
    background_tasks: BackgroundTasks,
    file: UploadFile,
    title: str = Form(...),
    description: str = Form(...)
):
    user = await User.objects.first()
    return await save_video(
        user=user,
        file=file,
        title=title,
        description=description,
        background_tasks=background_tasks)


@video_router.get("/video/{video_pk}", response_model=GetVideo)
async def get_video(video_pk: int):
    file = await Video.objects.select_related('user').get(pk=video_pk)
    file_like = open(file.dict().get('file'), mode='rb')
    return StreamingResponse(file_like, media_type="video/mp4")


@video_router.get("/user/{user_pk}", response_model=List[GetListVideo])
async def get_list_video(user_pk: int):
    video_list = await Video.objects.filter(user=user_pk).all()
    return video_list

# @video_router.get("/video/{video_pk}")
# async def get_streaming_video(request: Request, video_pk: int) -> StreamingResponse:
#     file, status_code, content_length, headers = await open_file(request, video_pk)
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

