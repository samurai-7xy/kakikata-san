# core/ocr_client.py
import easyocr

ocr_reader = None


def get_ocr_reader():
    global ocr_reader
    if ocr_reader is None:
        ocr_reader = easyocr.Reader(["ja", "en"])
    return ocr_reader
