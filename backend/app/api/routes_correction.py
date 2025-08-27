# app/api/routes_correction.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.schema.correction import EssayRequest, EssayResponse
from app.services.correction_service import correct_essay
from app.db.session import async_session
from app.models.essay import Essay
from app.api.routes_auth import get_current_user
from app.models.user import User
from app.utils.validators import contains_forbidden_words  # 禁止ワードチェック

router = APIRouter()


@router.post("/correction/", response_model=EssayResponse)
async def correction_endpoint(
    request: EssayRequest, current_user: User = Depends(get_current_user)
):
    """
    作文添削API
    - 禁止ワードチェック
    - 添削後の作文とアドバイスを返す
    - ログイン済みなら履歴を essay テーブルに保存
    """
    # 禁止ワードチェック
    forbidden_words = contains_forbidden_words(request.content)
    if forbidden_words:
        raise HTTPException(
            status_code=400,
            detail=f"禁止ワードが含まれています: {', '.join(forbidden_words)}",
        )

    try:
        # 添削処理
        corrected_content, comments = await correct_essay(
            content=request.content, grade=request.grade
        )

        # DB保存
        async with async_session() as session:  # type: AsyncSession
            essay = Essay(
                user_id=current_user.id,
                content=request.content,
                corrected_content=corrected_content,
            )
            session.add(essay)
            await session.commit()

        return EssayResponse(corrected_content=corrected_content, comments=comments)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/correction/history/", response_model=List[EssayResponse])
async def get_correction_history(current_user: User = Depends(get_current_user)):
    """
    ログインユーザの過去作文履歴を取得
    """
    try:
        async with async_session() as session:  # type: AsyncSession
            result = await session.execute(
                Essay.__table__.select().where(Essay.user_id == current_user.id)
            )
            essays = result.fetchall()

        history = [
            EssayResponse(corrected_content=e.corrected_content, comments=[])
            for e in essays
        ]
        return history

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
