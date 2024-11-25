from fastapi import APIRouter,HTTPException, UploadFile, File, status
from motor.motor_asyncio import AsyncIOMotorGridFSBucket
from fastapi.responses import StreamingResponse
from typing import AsyncGenerator, List
from urllib.parse import quote
from bson import ObjectId

from ..database import image_fs
router = APIRouter()

async def get_file_stream(file_id: ObjectId) -> AsyncGenerator[bytes, None]:
    grid_out = await image_fs.open_download_stream(file_id)
    while True:
        chunk = await grid_out.readchunk()
        if not chunk:
            break
        yield chunk

async def upload_files(files: List[UploadFile], allowed_content_types: List[str], fs_bucket: AsyncIOMotorGridFSBucket) -> List[str]:
    file_ids = []
    for file in files:
        if file.content_type not in allowed_content_types:
            raise HTTPException(status_code=400, detail=f"Invalid file type for file {file.filename}. Allowed file types are {', '.join(allowed_content_types)}.")
        
        file_id = await fs_bucket.upload_from_stream(file.filename, file.file)
        file_ids.append(str(file_id))
    return file_ids

@router.post("/images/")
async def upload_images(image_files: List[UploadFile] = File(...)):
        file_ids = []
        for image_file in image_files:
            file_content = await image_file.read()
            
            file_id = await image_fs.upload_from_stream(image_file.filename, file_content)
            file_ids.append(str(file_id))
        
        return {"image_file_ids": file_ids}

@router.get("/download-image/{file_id}")
async def download_image(file_id: str):
    try:
        object_id = ObjectId(file_id)
        grid_out = await image_fs.open_download_stream(object_id)
        
        if grid_out is None:
            raise HTTPException(status_code=404, detail="File not found")
        
        filename = quote(grid_out.filename)
        content_disposition = f'attachment; filename*=UTF-8\'\'{filename}'
        
        return StreamingResponse(
            get_file_stream(object_id), 
            media_type="application/octet-stream",
            headers={"Content-Disposition": content_disposition}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )