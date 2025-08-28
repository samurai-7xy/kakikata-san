from pydantic import BaseModel


class EssayCreate(BaseModel):
    title: str
    content: str
    user_id: int
