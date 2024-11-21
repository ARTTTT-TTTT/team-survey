from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId

class CustomerModel(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    worker_id: Optional[str] = None  # Links to UserModel (as ObjectId string)
    username: Optional[str] = None  # Username of the customer
    address: str
    region: Optional[str] = None  # Administrative region
    province: Optional[str] = None  # Province name
    district: Optional[str] = None  # District name
    canton: Optional[str] = None  # Canton name
    citizen_id: int  # Citizen identification number
    picture: Optional[str] = None  # URL or base64 encoded string for picture
    customer_type: str  # Links to CustomerTypeModel (as ObjectId string)
    telephone:str

    class Config:
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "id": "64b2d1f13b9a3c5ebfde1234",
                "worker_id": "64b2d1f13b9a3c5ebfde5678",
                "username": "jdoe",
                "address": "123 Main St",
                "region": "region A",
                "province": "Bangkok",
                "district": "District 1",
                "canton": "Canton 2",
                "citizen_id": 123456789,
                "picture": "https://example.com/profile.jpg",
                "customer_type": "64b2d1f13b9a3c5ebfde5679",
            }
        }
