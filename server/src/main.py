from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from dotenv import load_dotenv
import os

from .routes import authRoute, fileUploadRoute, usersRoute

load_dotenv()

secret_key = os.getenv("SECRET_KEY")
app = FastAPI()

origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://192.168.1.77",  
    "exp://",              
    "*"                    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.add_middleware(
    SessionMiddleware,
    secret_key=secret_key
)

app.include_router(authRoute.router, prefix="/auth", tags=["Authorization"])
app.include_router(usersRoute.router, prefix="/users", tags=["Users"])
app.include_router(fileUploadRoute.router, prefix="/files", tags=["File Upload"])