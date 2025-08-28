# backend/create_db.py
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from app.db.base import Base  # Base は全モデルの親
from app.models.user import User

DATABASE_URL = "sqlite+aiosqlite:///./test.db"
engine = create_async_engine(DATABASE_URL, echo=True)


async def init_db():
    async with engine.begin() as conn:
        # 既存テーブルがあれば削除
        await conn.run_sync(Base.metadata.drop_all)
        # 新しいテーブルを作成
        await conn.run_sync(Base.metadata.create_all)
    print("DBとテーブルを作成しました")


if __name__ == "__main__":
    asyncio.run(init_db())
