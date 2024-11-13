from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from bson import ObjectId

class UserCreateModel(BaseModel):
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    password: str

    class Config:
        #arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "email": "john.doe@example.com",
                "username": "johndoe",
                "first_name": "John",
                "last_name": "Doe",
                "password": "hashed_password",
            }
        }

class ReadUserProfileModel(BaseModel):
    username: str
    age: Optional[str] = None
    gender: Optional[str] = None

    class Config:
        #arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "username": "johndoe",
                "age": "1990-01-01",
                "gender": "male",
            }
        }

class UserModel(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    password: str
    role: str = "user"
    age: Optional[str] = None
    gender: Optional[str] = None

    class Config:
        #arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "email": "john.doe@example.com",
                "username": "johndoe",
                "first_name": "John",
                "last_name": "Doe",
                "password": "hashed_password",
                "role": "user",
                "age": "1990-01-01",
                "gender": "male",
            }
        }