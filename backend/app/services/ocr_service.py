from app.core.ocr_client import ocr_reader


class OCRService:
    @staticmethod
    def extract_text(image_bytes: bytes) -> str:
        results = ocr_reader.readtext(image_bytes)
        text = "\n".join([res[1] for res in results])
        return text
