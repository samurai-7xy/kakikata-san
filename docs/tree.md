backend/
├── app/
│   ├── main.py                # エントリーポイント
│   ├── api/                   # ルーティング（REST API定義）
│   │   ├── routes_correction.py   # 作文添削API
│   │   ├── routes_users.py        # ユーザー登録／ログイン／プロフィール
│   │   ├── routes_auth.py         # 認証関連（JWT発行・更新）
│   │   └── routes_health.py       # ヘルスチェック
│   ├── core/
│   │   ├── config.py              # 環境変数・設定管理
│   │   ├── security.py            # パスワードハッシュ化、JWT管理
│   │   └── openai_client.py       # OpenAI API呼び出しラッパー
│   ├── models/                    # DBモデル（SQLAlchemy）
│   │   ├── user.py                # ユーザー（id, name, email, hashed_pw, age, created_at）
│   │   ├── essay.py               # 作文履歴（id, user_id, content, corrected_content, created_at）
│   │   └── __init__.py
│   ├── schemas/                   # Pydanticスキーマ（入出力定義）
│   │   ├── user.py                # UserCreate, UserLogin, UserProfile
│   │   ├── auth.py                # Token, TokenData
│   │   ├── correction.py          # EssayRequest, EssayResponse
│   │   └── __init__.py
│   ├── services/                  # ビジネスロジック
│   │   ├── user_service.py        # ユーザー登録・ログイン処理
│   │   ├── auth_service.py        # JWT生成／検証
│   │   └── correction_service.py  # 作文添削処理（OpenAI API呼び出し）
│   ├── db/                        # DB関連
│   │   ├── session.py             # DBセッション（SQLAlchemy AsyncSession）
│   │   ├── base.py                # Baseモデル定義
│   │   └── __init__.py
│   └── utils/
│       ├── logger.py              # ロギング設定
│       └── validators.py          # 入力チェック（文字数制限、禁止ワードなど）
├── tests/                         # テスト
│   ├── test_users.py
│   ├── test_auth.py
│   └── test_correction.py
├── requirements.txt
├── Dockerfile
└── alembic/                       # DBマイグレーション


routes + services + models を全部つなげて Mac 上で動かす簡単な起動例

deactivate　仮想環境抜ける


.
└── project/
    ├── backend/
    │   ├── main.py
    │   └── app/
    │       ├── api/
    │       │   ├── routes_correction.py
    │       │   ├── routes_users.py
    │       │   ├── routes_auth.py
    │       │   ├── routes_health.py
    │       │   ├── routes_essay.py
    │       │   └── routes_ocr.py
    │       ├── core
    │       │   ├── config.py
    │       │   ├── security.py
    │       │   ├── openai_client.py
    │       │   └── ocr_client.py
    │       ├── models/
    │       │   ├── essay.py
    │       │   └── user.py
    │       ├── schema/
    │       │   ├── auth.py
    │       │   ├── correction.py
    │       │   ├── essay.py
    │       │   ├── user.py
    │       │   └── ocr.py
    │       ├── db/
    │       │   ├── base.py
    │       │   └── session.py
    │       ├── services/
    │       │   ├── auth_service.py
    │       │   ├── correction_service.py
    │       │   ├── user_service.py
    │       │   └── ocr_service.py
    │       └── utils/
    │           └── validators.py
    └── src/
        └── app/
            ├── page.tsx
            ├── user/
            │   ├── register/
            │   └── login/
            │       ├── page.tsx
            │       └── page.tsx
            ├── editor/
            │   └── page.tsx
            └── review/
                └── page.tsx



# project/
## backend/
### main.py
### app/
#### api/
##### routes_correction.py   
##### routes_users.py 
##### routes_auth.py
##### routes_health.py
##### routes_essay.py
##### routes_ocr.py
#### core
##### config.py
##### security.py
##### openai_client.py
##### ocr_client.py
#### models/
##### essay.py
##### user.py
#### schema/
##### auth.py
##### correction.py
##### essay.py
##### user.py
##### ocr.py
#### db/
##### base.py
##### session.py
#### services/
##### auth_service.py
##### correction_service.py
##### user_service.py
##### ocr_service.py 
#### utils/
##### validators.py
## src/
### app/
#### page.tsx
#### user/
##### register/
##### login/
###### page.tsx
###### page.tsx
#### editor/
###### page.tsx
#### review/
##### page.tsx