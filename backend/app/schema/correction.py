# app/schemas/correction.py
from pydantic import BaseModel, Field
from typing import List, Optional
from typing import Optional, Dict, Any


class EssayRequest(BaseModel):
    """
    作文添削リクエスト
    """

    content: str = Field(..., title="作文本文", max_length=2000)
    grade: Optional[int] = Field(None, title="学年（任意）")
    age: Optional[int] = None  # ← 追加
    options: Optional[dict] = Field(
        default=None,
        title="オプション設定",
        description="添削のスタイルや詳細設定を指定可能",
    )


class EssayResponse(BaseModel):
    """
    作文添削レスポンス
    """

    corrected_content: str = Field(..., title="添削後の作文")
    comments: List[str] = Field(..., title="改善アドバイスリスト")
    score: Optional[float] = Field(None, title="文章スコア（任意）")
