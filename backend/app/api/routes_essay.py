from fastapi import APIRouter
from app.schema.essay import EssayCreate
from app.models.essay import Essay
from app.db.session import async_session

router = APIRouter()


@router.post("/essays")
async def create_essay(essay_in: EssayCreate):
    async with async_session() as session:
        essay = Essay(
            title=essay_in.title, content=essay_in.content, user_id=essay_in.user_id
        )
        session.add(essay)
        await session.commit()
        await session.refresh(essay)
        return {"id": essay.id, "title": essay.title, "content": essay.content}
