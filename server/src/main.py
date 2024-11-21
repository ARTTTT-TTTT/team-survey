from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from dotenv import load_dotenv
import os

from .routers import users, login, auth ,fileUpload

load_dotenv()

secret_key = os.getenv("SECRET_KEY")
app = FastAPI()

origins = [
    "http://localhost",
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

app.include_router(auth.router, prefix="/auth", tags=["Authorization"])
app.include_router(login.router, prefix="/login", tags=["Login"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(fileUpload.router, prefix="/files", tags=["File Upload"])