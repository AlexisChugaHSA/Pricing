from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
import os

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "pricing_db")

client = AsyncIOMotorClient(MONGO_URL)
db = client[MONGO_DB_NAME]

# Utilidad para convertir ObjectId a str
def obj_id(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    return obj
