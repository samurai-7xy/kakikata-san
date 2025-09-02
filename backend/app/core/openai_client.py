import os
import json
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
    """
    if not OPENAI_API_KEY:
        raise ValueError("OpenAI APIキーが設定されていません")

    system_prompt = "あなたは小学生向けの作文添削アシスタントです。"
    if grade:
        system_prompt += f" 学年は {grade} 年生です。"

    if options:
        tone = options.get("tone")
        if tone:
            system_prompt += f" 口調は {tone} で添削してください。"

    user_prompt = f"""
以下の文章を校正してください。
出力は必ずJSON形式にしてください。

{{
  "修正点": [
    {{ "元": "xxx", "修正後": "yyy" }},
    {{ "元": "xxx", "修正後": "yyy" }}
  ],
  "提案": [
    "より自然な表現は xxx です。",
    "xxx を使うとわかりやすいです。"
  ]
}}

文章: {essay_text}
"""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
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

        corrected_text = data["choices"][0]["message"]["content"]
        # dict かもしれないので文字列化して返す
        corrected_text_str = str(corrected_text)

        return {"corrected_content": corrected_text_str, "raw_response": data}

    except Exception as e:
        raise RuntimeError(f"OpenAI API呼び出しエラー: {str(e)}")
