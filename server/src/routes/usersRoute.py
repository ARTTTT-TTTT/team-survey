from fastapi import APIRouter, Depends

from ..models.userModel import ReadUserModel
from .authRoute import get_current_user
from ..database import users_collection

router = APIRouter()

@router.get("/me", response_model=ReadUserModel)
async def read_user(current_user: ReadUserModel = Depends(get_current_user)):
    return current_user