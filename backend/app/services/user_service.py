# backend/app/services/user_service.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User
from app.schema.user import UserCreate
from app.core.security import get_password_hash, verify_password


async def create_user(session: AsyncSession, user_in: UserCreate) -> User:
    """
    ユーザー作成処理（メールアドレス重複チェック付き）
    """
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


# async def authenticate_user(
#     session: AsyncSession, email: str, password: str
# ) -> User | None:
#     """
#     メールアドレスとパスワードでユーザーを認証する
#     認証成功時はUserオブジェクトを返し、失敗時はNone
#     """
#     result = await session.execute(select(User).where(User.email == email))
#     user = result.scalars().first()
#     if not user:
#         return None
#     if not verify_password(password, user.hashed_password):
#         return None
#     return user


async def authenticate_user(db: AsyncSession, email: str, password: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalars().first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user
