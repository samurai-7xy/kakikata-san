from fastapi import APIRouter, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schema.user import UserCreate, UserProfile
from app.models.user import User
from app.services.user_service import create_user
from app.db.session import async_session

router = APIRouter()


@router.post("/register", response_model=UserProfile)
async def register_user(user_in: UserCreate):
    async with async_session() as session:
        user = await create_user(session, user_in)
        if not user:
            raise HTTPException(status_code=400, detail="ユーザー作成に失敗しました")
        return UserProfile.from_orm(user)
