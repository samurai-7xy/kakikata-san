from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import declarative_base
from .api.routes_users import router as users_router
from .api import routes_ocr, routes_correction
from .db.session import engine
from sqlalchemy.ext.asyncio import AsyncSession

Base = declarative_base()

app = FastAPI(title="かきかたさん", version="0.1.0")

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://kakikata-san-1.onrender.com",
        "https://kakikata-san.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 起動時にDB作成
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.on_event("startup")
async def on_startup():
    await init_db()


# ルーター登録
app.include_router(users_router, prefix="/api/users")
app.include_router(routes_ocr.router, prefix="/api/ocr")
app.include_router(routes_correction.router, prefix="/api/correction")
