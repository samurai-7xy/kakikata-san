# app/api/routes_users.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schema.user import UserCreate, UserLogin, UserProfile
from app.models.user import User
from app.services.user_service import create_user, authenticate_user
from app.services.auth_service import create_access_token, get_current_user
from app.db.session import async_session

router = APIRouter()


@router.post("/register", response_model=UserProfile)
async def register_user(user_in: UserCreate):
    async with async_session() as session:
        # ユーザー作成
        user = await create_user(session, user_in)
        if not user:
            raise HTTPException(status_code=400, detail="ユーザー作成に失敗しました")
        return UserProfile.from_orm(user)


@router.post("/login")
async def login_user(user_in: UserLogin):
    async with async_session() as session:
        user = await authenticate_user(session, user_in.email, user_in.password)
        if not user:
            raise HTTPException(
                status_code=401, detail="メールまたはパスワードが正しくありません"
            )
        access_token = create_access_token({"sub": str(user.id)})
        return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserProfile)
async def read_user_me(current_user: User = Depends(get_current_user)):
    return UserProfile.from_orm(current_user)
