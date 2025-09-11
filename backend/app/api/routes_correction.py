from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.schema.correction import EssayRequest, EssayResponse
from app.core.openai_client import correct_essay
from app.db.session import get_db
from app.models.essay import Essay
from app.utils.validators import contains_forbidden_words
from app.utils.tone_selector import choose_tone

router = APIRouter()


@router.post("/", response_model=EssayResponse)
async def correction_endpoint(
    request: EssayRequest,
    current_user: Optional[str] = None,  # ログインなしでもOK
    db: AsyncSession = Depends(get_db),  # ← ここで DB セッションを依存注入
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
        # --- 口調を決定 ---
        options = request.options if isinstance(request.options, dict) else {}
        options["tone"] = choose_tone(age=getattr(request, "age", None))

        # 添削処理
        result = await correct_essay(
            essay_text=request.content,
            options=options,
        )

        corrected_content = result.get("corrected_content", "")
        comments = result.get("comments", [])

        # DB保存（ユーザが存在する場合のみ）
        if current_user:
            essay = Essay(
                user_id=current_user,
                content=request.content,
                corrected_content=corrected_content,
            )
            db.add(essay)
            await db.commit()
            await db.refresh(essay)

        return EssayResponse(corrected_content=corrected_content, comments=comments)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
