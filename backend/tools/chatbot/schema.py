from pydantic import BaseModel


class ChatMessageRequest(BaseModel):
    session_id: str
    provider: str
    apiKey: str
    model: str
    message: str
