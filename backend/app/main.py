# backend/app/main.py

from fastapi import FastAPI
from app.api.routes_health import router as health_router
from app.api.routes_correction import router as correction_router

app = FastAPI(
    title="かきかたさん",
    version="0.1.0",
)

# ルーター登録
app.include_router(health_router, prefix="/health", tags=["Health"])
app.include_router(correction_router, prefix="/correction", tags=["Correction"])


# ルートテスト用
@app.get("/")
async def root():
    return {"message": "Hello, Kakikata-san!"}
