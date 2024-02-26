from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from settings import settings


def get_mongo_db() -> AsyncIOMotorDatabase:
    user: str = settings.MONGO_INITDB_ROOT_USERNAME
    password: str = settings.MONGO_INITDB_ROOT_PASSWORD
    db_name: str = settings.MONGO_INITDB_DATABASE
    client: AsyncIOMotorClient = AsyncIOMotorClient(
        f"mongodb://{user}:{password}@mongodb:27017?authSource=admin"
    )
    return client[db_name]
