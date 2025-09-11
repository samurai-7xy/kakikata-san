import asyncio
from app.services.correction_service import correct_essay


async def main():
    essay_text = "今日はりんごを食べました．美味しかったです．"
    grade = "3"
    options = {"tone": "普通の口調"}

    try:
        result = await correct_essay(
            essay_text=essay_text, grade=grade, options=options
        )
        print("=== 添削結果 ===")
        print(result["corrected_content"])
        print("\n=== 生データ ===")
        print(result["raw_response"])
    except Exception as e:
        print("エラー:", e)


if __name__ == "__main__":
    asyncio.run(main())
