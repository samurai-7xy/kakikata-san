from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User
from app.schema.user import UserCreate
from app.core.security import get_password_hash


async def create_user(session: AsyncSession, user_in: UserCreate) -> User:
    # メール重複チェック
    result = await session.execute(select(User).where(User.email == user_in.email))
    existing_user = result.scalars().first()
    if existing_user:
        return None

    hashed_pw = get_password_hash(user_in.password)
    user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=hashed_pw,
        grade=user_in.grade,
        age=user_in.age,
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user
