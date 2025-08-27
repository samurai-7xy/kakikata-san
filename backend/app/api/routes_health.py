from fastapi import APIRouter
from app.core.openai_client import correct_essay

router = APIRouter()


@router.get("/test_openai")
async def test_openai():
    """
    OpenAI APIが使えるか確認する簡単なテスト
    """
    try:
        response = await correct_essay("これはテスト作文です。", grade=3)
        return {"status": "ok", "corrected_content": response["corrected_content"]}
    except Exception as e:
        return {"status": "error", "detail": str(e)}
