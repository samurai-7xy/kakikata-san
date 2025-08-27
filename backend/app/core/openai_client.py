# app/core/openai_client.py
import os
from typing import Optional
import httpx
from app.core.config import settings

OPENAI_API_KEY = settings.openai_api_key
OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"


async def correct_essay(
    essay_text: str,
    grade: Optional[int] = None,
    options: Optional[dict] = None,
) -> dict:
    """
    作文添削を行う
    - essay_text: 元の作文
    - grade: 学年（任意）
    - options: 添削オプション（口調、詳細度など）
    """
    if not OPENAI_API_KEY:
        raise ValueError("OpenAI APIキーが設定されていません")

    system_prompt = "あなたは小学生向けの作文添削アシスタントです。"
    if grade:
        system_prompt += f" 学年は {grade} 年生です。"

    # オプションによって文章を調整
    if options:
        tone = options.get("tone")
        if tone:
            system_prompt += f" 口調は {tone} で添削してください。"

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"以下の作文を添削してください:\n{essay_text}"},
    ]

    payload = {
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "temperature": 0.5,
        "max_tokens": 1000,
    }

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                OPENAI_API_URL,
                headers={
                    "Authorization": f"Bearer {OPENAI_API_KEY}",
                    "Content-Type": "application/json",
                },
                json=payload,
            )
        response.raise_for_status()
        data = response.json()
        # 返却形式を整形
        corrected_text = data["choices"][0]["message"]["content"]
        return {"corrected_content": corrected_text, "raw_response": data}
    except httpx.HTTPError as e:
        raise RuntimeError(f"OpenAI API呼び出しエラー: {str(e)}")
