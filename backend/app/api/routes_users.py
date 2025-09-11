# backend/app/api/routes_users.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.services.user_service import create_user, authenticate_user
from app.db.session import async_session
from app.core.security import create_access_token
from ..schema.user import UserCreate, UserProfile, UserLogin, UserLoginResponse

router = APIRouter()


@router.post("/register", response_model=UserProfile)
async def register_user(user_in: UserCreate):
    async with async_session() as session:
        user = await create_user(session, user_in)
        if not user:
            raise HTTPException(status_code=400, detail="ユーザー作成に失敗しました")
        return UserProfile.from_orm(user)


@router.post("/login", response_model=UserLoginResponse)
async def login_user(user_in: UserLogin):
    async with async_session() as session:
        user = await authenticate_user(
            session, email=user_in.email, password=user_in.password
        )
        if not user:
            raise HTTPException(
                status_code=401,
                detail="メールアドレスまたはパスワードが正しくありません",
            )

        token = create_access_token({"sub": str(user.id)})
        return UserLoginResponse(
            access_token=token,
            token_type="bearer",
            id=user.id,
            username=user.username,
            email=user.email,
            grade=user.grade,
            age=user.age,
        )
