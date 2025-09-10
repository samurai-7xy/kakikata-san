# backend/create_db.py

from sqlalchemy import create_engine
from app.db.base import Base
from app.models.user import User
from app.models.essay import Essay  # Essayモデルもある場合

DATABASE_URL = "sqlite:///./mydatabase.db"  # mydatabase.dbはbackend配下に作成されます

engine = create_engine(DATABASE_URL, echo=True)

# テーブル作成
Base.metadata.create_all(bind=engine)
print("✅ データベースとテーブルを作成しました")
