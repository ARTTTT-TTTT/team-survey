from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId


class RoleModel(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    role_name: str

    class Config:
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "role_name": "manager",
            }
        }
