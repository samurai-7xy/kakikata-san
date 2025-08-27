# app/schemas/user.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional


# ユーザー作成用
class UserCreate(BaseModel):
    name: str = Field(..., max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    age: Optional[int] = None


# ログイン用
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# プロフィール返却用
class UserProfile(BaseModel):
    id: int
    name: str
    email: EmailStr
    age: Optional[int] = None
    created_at: Optional[str] = None

    class Config:
        orm_mode = True
