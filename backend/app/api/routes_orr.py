from fastapi import APIRouter, UploadFile, File
from app.services.ocr_service import OCRService

router = APIRouter(prefix="/ocr", tags=["ocr"])


@router.post("/")
async def ocr(file: UploadFile = File(...)):
    image_bytes = await file.read()
    text = OCRService.extract_text(image_bytes)
    return {"text": text}
