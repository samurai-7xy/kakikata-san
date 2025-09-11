from app.core.ocr_client import get_ocr_reader


class OCRService:
    @staticmethod
    def extract_text(image_bytes: bytes) -> str:
        reader = get_ocr_reader()  # 必要になった時点で初期化
        results = reader.readtext(image_bytes)
        return "\n".join([res[1] for res in results])
