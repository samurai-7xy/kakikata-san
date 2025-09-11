from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite+aiosqlite:///./db.sqlite"  # Render 環境なら絶対パスに変更も可

engine = create_async_engine(DATABASE_URL, echo=True)

# 非同期セッション
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


# FastAPI依存関数
async def get_db():
    async with async_session() as session:
        yield session
