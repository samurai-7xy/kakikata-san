# service/correction_service.py
from typing import Dict
from app.core.openai_client import correct_essay


class CorrectionService:
    """
    作文添削を行うサービスクラス
    """

    @staticmethod
    async def correct_essay(user_text: str, grade: int) -> Dict[str, str]:
        """
        作文を添削して改善案を返す

        Args:
            user_text (str): ユーザーが入力した作文
            grade (int): 学年（小学生向けなど）

        Returns:
            dict: 添削結果
        """
        client = correct_essay()

        # 学年に応じてフィードバックのレベルを調整
        prompt = f"""
        あなたは子供向け作文指導の先生です。
        学年: {grade}年生
        以下の作文を優しく添削してください。

        作文: {user_text}

        出力フォーマット:
        - 良いところ
        - 改善点
        - 修正版の例
        """

        try:
            response = await client.chat.completions.create(
                model="gpt-4o-mini",  # 軽量モデル
                messages=[
                    {"role": "system", "content": "あなたは国語の先生です。"},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=500,
            )

            feedback = response.choices[0].message["content"].strip()

            return {"original": user_text, "feedback": feedback, "grade": grade}

        except Exception as e:
            # エラー発生時の処理
            return {
                "original": user_text,
                "feedback": f"添削に失敗しました: {str(e)}",
                "grade": grade,
            }
