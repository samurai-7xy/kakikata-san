from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String, select
from passlib.context import CryptContext
import asyncio
from app.api import users

# ------------------------
# データベース設定
# ------------------------
DATABASE_URL = "sqlite+aiosqlite:///./db.sqlite"  # Render 環境なら絶対パスも検討
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

# ------------------------
# パスワードハッシュ
# ------------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str):
    return pwd_context.hash(password)


# ------------------------
# モデル定義
# ------------------------
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    grade = Column(String, nullable=False)
    age = Column(Integer, nullable=False)


# ------------------------
# FastAPI初期化
# ------------------------
app = FastAPI(title="かきかたさん", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # ローカル開発用
        "https://kakikata-san-1.onrender.com",  # 本番フロント用
        "https://kakikata-san.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------------
# DB初期化（テーブル作成）
# ------------------------
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# 起動時にテーブル作成
@app.on_event("startup")
async def on_startup():
    await init_db()


# ------------------------
# DBセッション依存
# ------------------------
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


# ------------------------
# ユーザー登録ルート
# ------------------------
from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    grade: str
    age: int


@app.post("/api/users/register")
async def register_user(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    # すでにメール存在確認
    result = await db.execute(select(User).where(User.email == user_in.email))
    existing_user = result.scalars().first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        grade=user_in.grade,
        age=user_in.age,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return {"id": user.id, "username": user.username, "email": user.email}


app.include_router(users.router, prefix="/api/users")
