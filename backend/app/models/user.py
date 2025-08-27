# backend/models/user.py
from sqlalchemy import Column, Integer, String
from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    grade = Column(String, nullable=False)  # 学年
    age = Column(Integer, nullable=False)  # 対象年齢
