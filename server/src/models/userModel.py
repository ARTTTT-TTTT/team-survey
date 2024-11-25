from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from bson import ObjectId

class CustomerCollectModel(BaseModel):
    customer_id: Optional[str] = None
    status: Optional[str] = None

    class Config:
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "customer_id": "",
                "status": "",
            }
        }

class UserRoleModel(BaseModel):
    # ถ้า role เป็น admin = admin_id กับ team_leader_id เป็น str เปล่า
    # ถ้า role เป็น team_leader = team_leader_id เป็น str เปล่า
    # ถ้า role เป็น worker = admin_id เป็น str เปล่า
    role: Optional[str] = None
    admin_id: Optional[str] = None 
    team_leader_id: Optional[str] = None 

    class Config:
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "role": "",
                "admin_id": "",
                "team_leader_id": "",
            }
        }

class UserModel(BaseModel):
    # id: Optional[str] = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    email: EmailStr
    firstname:str
    lastname:str
    password: str
    role: Optional[UserRoleModel]
    customer: Optional[List[CustomerCollectModel]] = []
    
    class Config:
        json_encoders = {ObjectId: str}
        json_schema_extra  = {
            "example": {
                "email": "john.doe@example.com",
                "first_name": "John",
                "last_name": "Doe",
                "password": "hashed_password",
                "role": {
                        "role": "",
                        "admin_id": "",
                        "team_leader_id": "",
                },
                "customer": [
                    {
                        "customer_id": "",
                        "status": "",
                    }
                ]
            }
        }

class ReadUserModel(BaseModel):
    email: EmailStr
    class Config:
        #arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "email": "john.doe@example.com",
            }
        }

