# app/api/routes_auth.py
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from datetime import datetime, timedelta
from typing import Optional
from app.core.config import settings
from app.models.user import User
from app.db.session import async_session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/users/login")

SECRET_KEY = "CHANGE_ME_TO_RANDOM_SECRET"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    credentials_exception = HTTPException(
        status_code=401,
        detail="認証情報が正しくありません",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    async with async_session() as session:
        result = await session.execute(select(User).where(User.id == int(user_id)))
        user = result.scalars().first()
        if user is None:
            raise credentials_exception
        return user
