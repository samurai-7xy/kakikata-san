from pydantic import BaseModel, EmailStr
from typing import Optional


# ユーザー作成用
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    grade: str
    age: int


# ログイン用
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# プロフィール返却用
class UserProfile(BaseModel):
    id: int
    username: str
    email: EmailStr
    grade: str
    age: int

    class Config:
        orm_mode = True
        from_attributes = True
