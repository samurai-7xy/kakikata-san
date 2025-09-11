import easyocr

_ocr_reader = None  # キャッシュ用変数


def get_ocr_reader():
    """
    easyocr.Reader を初回呼び出し時にのみ作成してキャッシュ。
    2回目以降は同じインスタンスを再利用する。
    """
    global _ocr_reader
    if _ocr_reader is None:
        print("🔄 OCRモデルを初期化中...")
        _ocr_reader = easyocr.Reader(["ja", "en"])
        print("✅ OCRモデル準備完了")
    return _ocr_reader
