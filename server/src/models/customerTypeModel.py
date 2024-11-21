from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId

class CustomerTypeModel(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    type: str

    class Config:
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "type": "VIP",
            }
        }
