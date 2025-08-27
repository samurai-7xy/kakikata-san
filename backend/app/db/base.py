# backend/db/base.py

from sqlalchemy.orm import declarative_base

# 全てのモデルで継承する Base
Base = declarative_base()
