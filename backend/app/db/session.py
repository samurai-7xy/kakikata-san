from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite+aiosqlite:///./db.sqlite"  # Renderなら絶対パスも検討

# エンジン作成
engine = create_async_engine(DATABASE_URL, echo=True)

# セッション作成
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


# 依存関数
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
