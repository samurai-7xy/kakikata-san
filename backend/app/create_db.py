# create_db.py
import asyncio
from models.user import Base as UserBase
from models.essay import Base as EssayBase
from .db.session import engine


async def create_tables():
    async with engine.begin() as conn:
        # ユーザーテーブル作成
        await conn.run_sync(UserBase.metadata.create_all)
        # エッセイテーブル作成
        await conn.run_sync(EssayBase.metadata.create_all)
    print("Tables created!")


if __name__ == "__main__":
    asyncio.run(create_tables())
