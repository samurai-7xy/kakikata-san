# app/api/routes_correction.py
from fastapi import APIRouter, HTTPException
from typing import List, Optional
from app.schema.correction import EssayRequest, EssayResponse
from app.core.openai_client import correct_essay
from app.db.session import async_session
from app.models.essay import Essay
from app.utils.validators import contains_forbidden_words
from app.utils.tone_selector import choose_tone  # ← 追加

router = APIRouter()


@router.post("/correction/", response_model=EssayResponse)
async def correction_endpoint(
    request: EssayRequest, current_user: Optional[str] = None  # ログインなしでもOK
):
    """
    作文添削API
    """
    # 禁止ワードチェック
    forbidden_words = contains_forbidden_words(request.content)
    if forbidden_words:
        raise HTTPException(
            status_code=400,
            detail=f"禁止ワードが含まれています: {', '.join(forbidden_words)}",
        )

    try:
        # --- ここで口調を決定 ---
        # request.grade や request.age が送られてくる想定
        tone = choose_tone(
            # grade=request.grade if hasattr(request, "grade") else None,
            age=request.age if hasattr(request, "age") else None,
        )

        # optionsを組み立てる（既存optionsがあればマージ）
        options = request.options if isinstance(request.options, dict) else {}
        options["tone"] = choose_tone(
            # grade=getattr(request, "grade", None),
            age=getattr(request, "age", None)
        )

        # 添削処理
        result = await correct_essay(
            essay_text=request.content,
            # grade=request.grade,
            options=options,
        )

        corrected_content = result.get("corrected_content", "")
        comments = result.get("comments", [])  # 将来コメント返す場合に対応

        # DB保存（ユーザが存在する場合のみ）
        if current_user:
            async with async_session() as session:
                essay = Essay(
                    user_id=current_user,
                    content=request.content,
                    corrected_content=corrected_content,
                )
                session.add(essay)
                await session.commit()

        return EssayResponse(corrected_content=corrected_content, comments=comments)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
