# app/services/user_service.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User
from app.schema.user import UserCreate
from app.core.security import get_password_hash, verify_password


async def create_user(session: AsyncSession, user_in: UserCreate) -> User:
    # メール重複チェック
    result = await session.execute(select(User).where(User.email == user_in.email))
    existing_user = result.scalars().first()
    if existing_user:
        return None

    hashed_pw = get_password_hash(user_in.password)
    user = User(
        name=user_in.name, email=user_in.email, hashed_pw=hashed_pw, age=user_in.age
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user


async def authenticate_user(session: AsyncSession, email: str, password: str) -> User:
    result = await session.execute(select(User).where(User.email == email))
    user = result.scalars().first()
    if not user:
        return None
    if not verify_password(password, user.hashed_pw):
        return None
    return user
