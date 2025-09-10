from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_users import router as users_router
from app.api import routes_ocr
from app.api import routes_correction

app = FastAPI(title="かきかたさん", version="0.1.0")

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://my-nextjs-app.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーター登録
# ユーザ登録
app.include_router(users_router)

# 手書き認識のやつのルータ
app.include_router(routes_ocr.router)

# API登録
app.include_router(routes_correction.router, prefix="/api")

# ログイン
app.include_router(users_router, prefix="/api/users")
