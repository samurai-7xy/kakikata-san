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
    作文添削 + 内容の深掘り提案を行う
    """
    if not OPENAI_API_KEY:
        raise ValueError("OpenAI APIキーが設定されていません")

    # 学年や口調を考慮
    system_prompt = "あなたは小学生向けの作文添削アシスタントです。"
    if grade:
        system_prompt += f" 学年は {grade} 年生です。"

    if options:
        tone = options.get("tone")
        if tone:
            system_prompt += f" 口調は {tone} で添削してください。"

    # ユーザーへの指示を追加（文法＋深掘り）
    user_prompt = f"""
以下の文章を校正してください。
- 誤字脱字や日本語表現を直す
- 不自然な言い回しを修正する
- さらに内容を深めるための提案をする（例：感想や理由を詳しくする、行動や気持ちを書き足す）

出力は必ずJSON形式にしてください。

{{
  "修正点": [
    {{ "元": "xxx", "修正後": "yyy" }},
    {{ "元": "xxx", "修正後": "yyy" }}
  ],
  "提案": [
    "より自然な表現は xxx です。",
    "xxx を使うとわかりやすいです。"
  ],
  "深掘り提案": [
    "この行動で自分がどんなことをしたいか付け加えてみましょう。",
    "主人公の気持ちに自分を重ねて考えてみましょう。"
  ]
}}

文章: {essay_text}
"""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    payload = {
        "model": "gpt-4.1-mini",  # gpt-4.1-mini より賢いモデルに変更推奨
        "messages": messages,
        "temperature": 0.6,  # 少し自由度を上げると提案が柔軟になる
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

        if "application/json" not in response.headers.get("content-type", ""):
            raise RuntimeError(f"OpenAI APIからJSON以外のレスポンス: {response.text}")

        data = response.json()
        print("=== OpenAI API Response ===", data)

        if "choices" not in data or not data["choices"]:
            raise RuntimeError(f"choicesが空: {data}")

        message = data["choices"][0].get("message")
        if not message or "content" not in message:
            raise RuntimeError(f"message.contentが存在しません: {data}")

        corrected_text = message["content"]

        return {"corrected_content": corrected_text, "raw_response": data}

    except httpx.HTTPStatusError as e:
        raise RuntimeError(f"OpenAI APIがHTTPエラーを返しました: {e.response.text}")
    except Exception as e:
        raise RuntimeError(f"OpenAI API呼び出しエラー: {str(e)}")
