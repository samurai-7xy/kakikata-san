from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes_users import router as users_router
from .api import routes_ocr
from .api import routes_correction

app = FastAPI(title="かきかたさん", version="0.1.0")

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # ローカル開発用
        "https://kakikata-san-1.onrender.com",  # 本番フロント用
        "https://kakikata-san.onrender.com",
    ],
    # デバッグ用
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# # ルーター登録
# # ユーザ登録
# app.include_router(users_router)

# # 手書き認識のやつのルータ
app.include_router(routes_ocr.router)

# # API登録
# app.include_router(routes_correction.router, prefix="/api")

# # ログイン
# app.include_router(users_router, prefix="/api/users")

# ユーザ関連
app.include_router(users_router, prefix="/api/users")

# OCR
# app.include_router(routes_ocr.router, prefix="/ocr")

# 採点 API
app.include_router(routes_correction.router, prefix="/api/correction")
