# app/utils/validators.py
from typing import List, Optional

# 禁止ワードリスト（必要に応じて追加）
FORBIDDEN_WORDS: List[str] = [
    "悪い言葉",
    "禁止ワード",
    "不適切表現",
]

# 許容文字数（最小・最大）
MIN_CHAR_COUNT = 10
MAX_CHAR_COUNT = 1000

# 許容口調リスト
ALLOWED_TONES = ["やさしい", "丁寧", "元気", "フレンドリー"]


def contains_forbidden_words(text: str) -> bool:
    """
    禁止ワードが含まれていれば True を返す
    """
    return any(word in text for word in FORBIDDEN_WORDS)


def validate_length(
    text: str, min_len: int = MIN_CHAR_COUNT, max_len: int = MAX_CHAR_COUNT
) -> bool:
    """
    文字数が範囲内なら True
    """
    length = len(text)
    return min_len <= length <= max_len


def validate_tone(tone: Optional[str]) -> bool:
    """
    オプションの口調が許容リストに含まれていれば True
    None は許可
    """
    if tone is None:
        return True
    return tone in ALLOWED_TONES


def validate_essay(essay_text: str, tone: Optional[str] = None) -> List[str]:
    """
    作文全体のバリデーション
    - 禁止ワードチェック
    - 文字数チェック
    - オプション口調チェック
    """
    errors = []

    if not validate_length(essay_text):
        errors.append(
            f"作文は {MIN_CHAR_COUNT}～{MAX_CHAR_COUNT} 文字で入力してください。"
        )

    if contains_forbidden_words(essay_text):
        errors.append("作文に禁止ワードが含まれています。")

    if not validate_tone(tone):
        errors.append(f"口調は {ALLOWED_TONES} のいずれかで指定してください。")

    return errors
