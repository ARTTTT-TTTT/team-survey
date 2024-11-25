from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from dotenv import load_dotenv
import urllib.parse
import os

load_dotenv()

#------------------ Settings MongoDB database ---------------------------------
MONGODB_USERNAME = os.getenv("MONGODB_USERNAME")
MONGODB_PASSWORD = os.getenv("MONGODB_PASSWORD")
MONGODB_URI = os.getenv("MONGODB_URI")

# ทำการ encode ค่า username และ password
quoted_username = urllib.parse.quote_plus(MONGODB_USERNAME)
quoted_password = urllib.parse.quote_plus(MONGODB_PASSWORD)

uri = f"mongodb+srv://{quoted_username}:{quoted_password}{MONGODB_URI}"

#------------------------Development---------------------------
DB_URL = os.environ.get("DB_URL", uri)
#DB_URL = os.environ.get("DB_URL", "mongodb://localhost:27017")
#--------------------------------------------------------------

client = AsyncIOMotorClient(DB_URL)
db = client["Team-Survey"]
users_collection = db['users']
images_collection = db['images.files']

image_fs = AsyncIOMotorGridFSBucket(db, bucket_name='images')
#------------------------------------------------------------------------------