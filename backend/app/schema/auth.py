# schema/auth.py
from pydantic import BaseModel, EmailStr
from typing import Optional


class UserBase(BaseModel):
    """ユーザーの共通属性"""

    username: str
    email: EmailStr


class UserCreate(UserBase):
    """ユーザー登録時のリクエスト"""

    password: str


class UserLogin(BaseModel):
    """ログイン用リクエスト"""

    email: EmailStr
    password: str


class UserResponse(UserBase):
    """ユーザー情報のレスポンス（パスワードは含めない）"""

    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    """アクセストークンのレスポンス"""

    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """トークンから復元されるユーザーデータ"""

    user_id: Optional[int] = None
    username: Optional[str] = None
    email: Optional[EmailStr] = None
