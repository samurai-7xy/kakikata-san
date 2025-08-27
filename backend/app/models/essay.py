from sqlalchemy import Column, String, Text, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base


class Essay(Base):
    __tablename__ = "essays"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)  # ← ここで String を使用
    content = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    user = relationship("User", back_populates="essays")
