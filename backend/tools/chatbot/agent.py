from core.llm_factory import get_llm
from .memory import add_message, get_history

from langchain_core.messages import (
    SystemMessage,
    HumanMessage,
    AIMessage,
)


SYSTEM_PROMPT = "You are a helpful AI assistant. Maintain context from previous messages."


def generate_chat_reply(request):

    history = get_history(request.session_id)

    llm = get_llm(
        provider=request.provider,
        api_key=request.apiKey,
        model=request.model,
    )

    messages = [SystemMessage(content=SYSTEM_PROMPT)]

    # rebuild history into LangChain message objects
    for msg in history:

        if msg["role"] == "user":
            messages.append(HumanMessage(content=msg["content"]))

        elif msg["role"] == "assistant":
            messages.append(AIMessage(content=msg["content"]))

    # add current user message
    messages.append(HumanMessage(content=request.message))

    # invoke model
    response = llm.invoke(messages)

    reply = response.content

    # store conversation
    add_message(request.session_id, "user", request.message)
    add_message(request.session_id, "assistant", reply)

    return reply
