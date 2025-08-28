from sqlalchemy import Column, Integer, String
from app.db.base import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    grade = Column(String, nullable=False)
    age = Column(Integer, nullable=False)

    essays = relationship("Essay", back_populates="user", cascade="all, delete-orphan")
