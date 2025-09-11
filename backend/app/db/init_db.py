from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from app.models.user import Base  # User モデルを import

DATABASE_URL = "sqlite+aiosqlite:///mydatabase.db"  # Render 上でも同じパス

engine = create_async_engine(DATABASE_URL, echo=True, future=True)


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Tables created successfully.")


import asyncio

asyncio.run(init_db())
