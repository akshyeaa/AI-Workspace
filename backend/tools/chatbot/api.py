from fastapi import APIRouter
from .schema import ChatMessageRequest
from .memory import create_session, get_history
from .agent import generate_chat_reply

router = APIRouter(prefix="/chat")


@router.post("/session")
def new_session():
    return {"session_id": create_session()}


@router.post("/message")
def chat_message(request: ChatMessageRequest):

    reply = generate_chat_reply(request)

    return {"reply": reply}


@router.get("/history/{session_id}")
def history(session_id: str):
    return {"messages": get_history(session_id)}
