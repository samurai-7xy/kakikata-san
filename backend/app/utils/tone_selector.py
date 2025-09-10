def choose_tone(grade: int = None, age: int = None) -> str:
    """
    学年または年齢に応じて口調を決定
    """
    if grade is not None:
        if 1 <= grade <= 3:
            return "やさしい口調"
        elif 4 <= grade <= 6:
            return "少し大人っぽい口調"
    if age is not None:
        if 6 <= age <= 8:
            return "やさしい口調"
        elif 9 <= age <= 12:
            return "少し大人っぽい口調"
    return "標準的な口調"
