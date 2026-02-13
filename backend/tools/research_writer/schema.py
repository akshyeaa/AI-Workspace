from pydantic import BaseModel
from typing import List, Optional


class Author(BaseModel):
    name: str
    designation: str
    organization: str
    location: str
    email: str


class ResearchRequest(BaseModel):
    provider: str
    apiKey: str
    model: str
    topic: str
    authors: Optional[List[Author]] = None
