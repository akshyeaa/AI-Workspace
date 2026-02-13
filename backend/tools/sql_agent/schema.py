# from pydantic import BaseModel

# class SQLRequest(BaseModel):
#     provider: str
#     apiKey: str
#     model: str
#     database_url: str
#     message: str



from pydantic import BaseModel
from typing import Optional


# =========================
# Database schema
# =========================

class DatabaseConfig(BaseModel):

    type: str  # "sqlite" or "mysql"

    # SQLite
    sqlite_path: Optional[str] = None

    # MySQL
    host: Optional[str] = None
    user: Optional[str] = None
    password: Optional[str] = None
    database: Optional[str] = None


# =========================
# SQL request schema
# =========================

class SQLChatRequest(BaseModel):

    provider: str
    apiKey: str
    model: str

    database: DatabaseConfig

    message: str

