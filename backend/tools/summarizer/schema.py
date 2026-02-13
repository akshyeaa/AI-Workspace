from pydantic import BaseModel
from typing import Optional


class SummarizeRequest(BaseModel):
    provider: str
    apiKey: str
    model: str
    url: Optional[str] = None
