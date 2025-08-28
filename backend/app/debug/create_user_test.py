# backend/app/debug/create_user_test.py
import asyncio
from app.db.session import async_session
from app.models.user import User
from app.services.user_service import create_user
from app.schema.user import UserCreate


async def main():
    async with async_session() as session:
        user_in = UserCreate(
            username="testuser",
            email="test@example.com",
            password="password123",
            grade="3",  # grade カラムが必須なら設定
            age=9,
        )
        user = await create_user(session, user_in)
        if user:
            print("ユーザー作成成功:", user.id, user.username)
        else:
            print("ユーザー作成失敗")


if __name__ == "__main__":
    asyncio.run(main())
